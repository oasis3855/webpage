/**
 * CSSおよび定形ヘッダー/フッターを切り替える JavaScript
 * （実行にはJQueryスクリプトが必要）
 * 
 * Copyright (C) 2024 Hirokazu INOUE
 * This program is free software.
 * You can redistribute it and/or modify it under the terms 
 * of the GNU General Public License version 3.0 or later.
 * 
 * Version 1.0 (2024/08/22)
 */

/***
 * CSS変更ボタンを押したときの処理
 * normal/simple を切り替え（トグル）、現在の選択をLocalStorageに保存
 */
function onPressButtonChangeCSS() {

    var mode = localStorage.getItem('css');
    if (mode === 'normal') {
        // normal から simple に切り替える
        localStorage.setItem('css', 'simple');
        enableCSSSimple();
        displaySimpleHeader();
    }
    else {
        // null(値がセットされていない) または simple の場合
        // simple から normal に切り替える
        localStorage.setItem('css', 'normal');
        enableCSSNormal();
        displayNormalHeader();
    }

}

/***
 * normal CSSに切り替え（HTMLの該当行、disabledスイッチをトグル）
 * (<link rel="stylesheet" href="...css" type="text/css" title="normal" [disabled|] />)
 */
function enableCSSNormal() {
    const cssNormal = document.querySelector("link[title='normal']");
    cssNormal.disabled = false;
    const cssSimple = document.querySelector("link[title='simple']");
    cssSimple.disabled = true;
}

/***
 * simple CSSに切り替え
 */
function enableCSSSimple() {
    const cssNormal = document.querySelector("link[title='normal']");
    cssNormal.disabled = true;
    const cssSimple = document.querySelector("link[title='simple']");
    cssSimple.disabled = false;
}

/***
 * HTMLヘッダーに書かれたJSON引数と、LocalStorageに保存された選択に基づき、
 * normal/simple の現在値を決定し、返り値として返す
 */
function readConfigCssSelection() {
    // HTMLファイルに記述されたnormal/simple設定を読み込む
    // (normal/simple/saved-normal/saved-simple/[undefined])
    const json = JSON.parse(document.getElementById("javascript-init-data").text);
    const paramHtml = json.css;
    // localStorageに保存されたnormal/simple設定を読み込む
    // (normal/simple/[null])
    var paramLocalstorage = localStorage.getItem('css');

    // HTML設定を優先し、次にLocalstorageの値を反映する
    if (paramHtml === "normal") return "normal";
    else if (paramHtml === "simple") return "simple";
    else if (paramHtml === "saved-normal") {
        if (paramLocalstorage === "normal") return "normal";
        else if (paramLocalstorage === "simple") return "simple";
        // Localstorageに保存値がない場合は、Html設定が適用
        return "normal";
    }
    else if (paramHtml === "saved-simple") {
        if (paramLocalstorage === "normal") return "normal";
        else if (paramLocalstorage === "simple") return "simple";
        // Localstorageに保存値がない場合は、Html設定が適用
        return "simple";
    }
    else if (paramLocalstorage === "normal") return "normal";
    else if (paramLocalstorage === "simple") return "simple";
    return "normal";
}

/***
 * normal ヘッダー、フッターをHTMLに挿入
 */
function displayNormalHeader() {
    $('#include-headermenu').load('/webpage/cgi-bin/include-headermenu-normal.html.txt');
    displayFooter('/webpage/cgi-bin/include-footermenu-normal.html.txt');
}

/***
 * simple ヘッダー、フッターをHTMLに挿入
 */
function displaySimpleHeader() {
    $('#include-headermenu').load('/webpage/cgi-bin/include-headermenu-simple.html.txt');
    displayFooter('/webpage/cgi-bin/include-footermenu-simple.html.txt');
}

/***
 * フッターをHTMLに挿入（strUrl文字列置換を同時に行う）
 */
function displayFooter(strUrl) {
    // HTML より引数データを読み込む
    const param = JSON.parse(document.getElementById("javascript-init-data").text);
    const strLastedit = param.LastEdit;
    const strBuildProg = param.BuildProg;

    $.ajax({
        url: strUrl,
        dataType: "html",
        success: function (str) {
            // [include HTML]から読み込んだstr内の置換処理
            str = str.replace("<span id=\"footermenu-date\"></span>", strLastedit);
            str = str.replace("<span id=\"footermenu-buildprog\"></span>", strBuildProg);
            // [このHTMLテキスト]に挿入
            $('#include-footermenu').html(str);
        }
    })

}

/***
 * HTMLページ（スクリプト）読み込み時に1度だけ実行する
 */
{
    // HTML より引数データを読み込む
    const param = JSON.parse(document.getElementById("javascript-init-data").text);
    const strLastedit = param.LastEdit;
    const strBuildProg = param.BuildProg;
    const strCss = readConfigCssSelection();

    $(document).ready(function () {
        $.ajaxSetup({ cache: false }); // avoid cache
        if (strCss === "normal") {
            displayNormalHeader();
            enableCSSNormal();
        }
        else {
            displaySimpleHeader();
            enableCSSSimple();
        }

        // [このHTMLテキスト]内のLast Edit年月日を置換（表示）
        $('#lastedit-date').append(strLastedit);
    });
}

