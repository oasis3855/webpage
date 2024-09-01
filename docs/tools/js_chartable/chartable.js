/**
 * クライアントWebブラウザで、UTF16 文字コード表を表示
 * するJavaScript
 * 
 * Copyright (C) 2024 Hirokazu INOUE
 * This program is free software.
 * You can redistribute it and/or modify it under the terms 
 * of the GNU General Public License version 3.0 or later.
 * 
 * Version 1.0 (2024/08/15)
 */

function onPressButtonDisplay() {
    let i;

    document.querySelector("p#guide").innerHTML = "";

    const regex = /[^0-9a-fA-F]/i;
    if (regex.test(document.querySelector("input#text_input").value)) {
        document.querySelector("p#guide").innerHTML = "エラー : 開始アドレスには4桁の16進数（ 0-9, A-F ）のみが入力できます";
        return;
    }

    i = parseInt(document.querySelector("input#text_input").value, 16);
    if (isNaN(i)) { i = 0; }
    i = (Math.trunc(i) & 0xff00) >> 8;

    // 文字コード表を作成・表示（UTF16コードのスタート位置 i*0x100）
    write_chartable(i);
}

/* Prevボタンで、表示中のUTF16コードに0x0100 を引いた
    文字コード表を表示する */
function onPressButtonPrev() {
    let i;
    i = parseInt(document.querySelector("th#addr").innerText, 16);
    if (isNaN(i)) { i = 0; }
    i = (Math.trunc(i) & 0xff00) >> 8;
    if (i >= 1) {
        i--;
    }

    // 文字コード表を作成・表示（UTF16コードのスタート位置 i*0x100）
    write_chartable(i);
}

/* Nextボタンで、表示中のUTF16コードに0x0100 を足した
    文字コード表を表示する */
function onPressButtonNext() {
    let i;
    i = parseInt(document.querySelector("th#addr").innerText, 16);
    if (isNaN(i)) { i = 0; }
    i = (Math.trunc(i) & 0xff00) >> 8;
    if (i < 0xff) {
        i++;
    }

    // 文字コード表を作成・表示（UTF16コードのスタート位置 i*0x100）
    write_chartable(i);

}

/* 文字コード表のHTMLコードを作成し、画面のdiv#insertに表示
    start_addrは、UTF16コードの上位8ビットの指定(0x00〜0xff) */
function write_chartable(start_addr) {
    let i, j, k, u16 = 0, u8_txt = "";
    let txt = "";

    i = start_addr;

    txt += "<table>\n"
    txt += "<tr><td></td>"
    for (k = 0; k <= 0xf; k++) {
        txt += "<th>+" + k.toString(16).toUpperCase().padStart(2, '0') + "</th>"
    }
    txt += "</tr>"
    for (j = 0; j <= 0xf; j++) {
        txt += "<tr>"
        if (j === 0) {
            txt += '<th id="addr">';
        }
        else {
            txt += '<th>';
        }
        txt += (i * 0x100 + j * 0x10).toString(16).toUpperCase().padStart(4, '0') + "</th>";
        for (k = 0; k <= 0xf; k++) {
            u16 = i * 0x100 + j * 0x10 + k;
            u8_txt = convert_u16_to_u8txt(u16);
            txt += "<td title=\"UTF16:" + (i * 0x100 + j * 0x10 + k).toString(16).toUpperCase().padStart(4, '0') + ", UTF8:" + u8_txt + "\">";
            txt += (String.fromCharCode(i * 0x100 + j * 0x10 + k) + "</td>");
        }
        txt += "</tr>\n"
    }
    txt += "</table>\n"

    document.querySelector("div#insert").innerHTML = txt;
}

/* UTF16（2バイト数値）をUTF8（16進数表記の文字列）に変換
    参考 : https://qiita.com/weal/items/10122402adb61597f851
*/
function convert_u16_to_u8txt(u16) {
    let u8_txt = "";

    if (u16 <= 0x7f) {
        // 1バイト符号化
        u8_txt = u16.toString(16).toUpperCase().padStart(2, '0');
    }
    else if (u16 <= 0x7ff) {
        // 2バイト符号化
        u8_txt = (0xc0 | u16 >>> 6).toString(16).toUpperCase().padStart(2, '0') + " " +
            (0x80 | u16 & 0xbf).toString(16).toUpperCase().padStart(2, '0');
    }
    else if (u16 <= 0xffff) {
        // 3バイト符号化
        //arr.push(0xe0|c>>>12, 0x80|c>>>6&0xbf, 0x80|c&0xbf);
        u8_txt = (0xe0 | u16 >>> 12).toString(16).toUpperCase().padStart(2, '0') + " " +
            (0x80 | u16 >>> 6 & 0xbf).toString(16).toUpperCase().padStart(2, '0') + " " +
            (0x80 | u16 & 0xbf).toString(16).toUpperCase().padStart(2, '0');
    }
    return u8_txt;
}
