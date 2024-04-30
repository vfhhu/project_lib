

AndroidManifest.xml
```xml
<uses-permission android:name="android.permission.NFC" />

....
<activity
android:name=".NFCActivity"
android:screenOrientation="portrait"
android:exported="false">
<intent-filter>
    <action android:name="android.nfc.action.NFC_DISCOVERED" />
    <action android:name="android.nfc.action.NDEF_DISCOVERED" />

    <category android:name="android.intent.category.DEFAULT" />

    <data android:mimeType="text/plain" />
</intent-filter>
</activity>
....
```


NFCActivity
```java
NfcAdapter mNfcAdapter;
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_nfcactivity);
    PackageManager pm = getPackageManager();
    if (!pm.hasSystemFeature(PackageManager.FEATURE_NFC)) {
        // 如果不支援 NFC，顯示一個錯誤訊息
        Toast.makeText(this, "此裝置不支援 NFC。", Toast.LENGTH_LONG).show();
        finish();
        return;
    }
    mNfcAdapter = NfcAdapter.getDefaultAdapter(this);
    if (mNfcAdapter == null) {
        // 如果沒有 NFC 讀取器，顯示一個錯誤訊息
        Toast.makeText(this, "此裝置沒有 NFC 讀取器。", Toast.LENGTH_LONG).show();
        finish();
        return;
    }
}


@Override
protected void onResume() {
    super.onResume();
    if (mNfcAdapter != null) {
        Bundle options = new Bundle();
        options.putInt(NfcAdapter.EXTRA_READER_PRESENCE_CHECK_DELAY, 1000);
        mNfcAdapter.enableReaderMode(this, new NfcAdapter.ReaderCallback() {
            @Override
            public void onTagDiscovered(Tag tag) {
                final String tagId = byteArrayToHexString(tag.getId());
            }
        }, NfcAdapter.FLAG_READER_NFC_A | NfcAdapter.FLAG_READER_NFC_B | NfcAdapter.FLAG_READER_NFC_F | NfcAdapter.FLAG_READER_NFC_V | NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK, options);
    }
}
@Override
protected void onStop() {
    super.onStop();
    if (mNfcAdapter != null) mNfcAdapter.disableReaderMode(this);
}
private String byteArrayToHexString(byte[] bytes) {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < bytes.length; i++) {
        int b = bytes[i] & 0xff;
        if (b < 0x10) {
            sb.append('0');
        }
        sb.append(Integer.toHexString(b));
        if (i < bytes.length - 1) {
            sb.append(':');
        }
    }
    return sb.toString();
}
```