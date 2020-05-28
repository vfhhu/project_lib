//page
//https://www.thsrc.com.tw/tw/Article/ArticleContent/530e869c-479d-441a-a4b4-61a8166827e9
//http://www.thsrc.com.tw/tw/Article/ArticleContent/675f8fd9-d228-4516-b37f-84442dc4a2c8

location.href="http://www.thsrc.com.tw/tw/Article/ArticleContent/675f8fd9-d228-4516-b37f-84442dc4a2c8";

var title_txt=$("h1").innerHTML;
var style_txt=$("style").outerHTML;
$(".SB .TableName").innerHTML=title_txt;
$(".NB .TableName").innerHTML=title_txt;

// $(".SB").outerHTML;
// $(".NB").outerHTML;

var html_head_str='<!DOCTYPE html>\n' +
    '<html lang="zh-tw">\n' +
    '    <meta charset="utf-8" />\n' +
    '    <head>\n' +
    '        <title>\n' +
    '            台灣高鐵 Taiwan High Speed Rail\n' +
    '        </title>\n' +
    '    </head>\n' +
    '    <body>\n';
var html_last_str='  </body>\n' +
    '</html>';

var south_str=html_head_str+style_txt+"\n"+$(".SB").outerHTML+"\n"+html_last_str;
var north_str=html_head_str+style_txt+"\n"+$(".NB").outerHTML+"\n"+html_last_str;
var data_south = new Blob([south_str], {type: 'text/plain'});
var url_south = window.URL.createObjectURL(data_south);
var a_south = document.createElement('a');
var filename_south = 'south-young.html';
a_south.href = url_south;
a_south.download = filename_south;
a_south.click();
window.URL.revokeObjectURL(url_south);



var data_north = new Blob([north_str], {type: 'text/plain'});
var url_north = window.URL.createObjectURL(data_north);
var a_north = document.createElement('a');
var filename_north = 'north-young.html';
a_north.href = url_north;
a_north.download = filename_north;
a_north.click();
window.URL.revokeObjectURL(url_north);