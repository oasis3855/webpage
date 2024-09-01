/**
 * クライアントWebブラウザで、SHA-1,MD5等のハッシュや、
 * urlencode, base64変換を行うJavaScript
 * 
 * Copyright (C) 2024 Hirokazu INOUE
 * This program is free software.
 * You can redistribute it and/or modify it under the terms 
 * of the GNU General Public License version 3.0 or later.
 * 
 * Version 1.0 (2024/08/13)
 */
async function onPressButtonConvert() {
    const txt = document.querySelector("input#text_input").value;

    /* 表示されている計算済み結果を削除する */
    clear_result_text();

    document.querySelector("td#input_string").innerHTML = htmlEscape(txt);

    document.querySelector("td#length").innerHTML = (new Blob([txt])).size;

    document.querySelector("td#hex").innerHTML = bin2hex(txt);

    // md5算出は別スクリプトの関数を用いる
    // https://github.com/blueimp/JavaScript-MD5
    if (document.querySelector("input#md5").checked)
        document.querySelector("td#md5").innerHTML = md5(txt);

    if (document.querySelector("input#sha-1").checked)
        document.querySelector("td#sha-1").innerHTML = await calculate_sha(txt, "SHA-1");

    if (document.querySelector("input#sha-256").checked)
        document.querySelector("td#sha-256").innerHTML = await calculate_sha(txt, "SHA-256");

    if (document.querySelector("input#urlencode_component").checked)
        document.querySelector("td#urlencode_component").innerHTML = encodeURIComponent(txt);

    if (document.querySelector("input#urlencode").checked)
        document.querySelector("td#urlencode").innerHTML = encodeURI(txt);

    if (document.querySelector("input#urldecode").checked)
        document.querySelector("td#urldecode").innerHTML = htmlEscape(decodeURI(txt));

    if (document.querySelector("input#base64").checked) {
        document.querySelector("td#base64").innerHTML = calculate_base64(txt);
    }

    if (document.querySelector("input#base64decode").checked) {
        document.querySelector("td#base64decode").innerHTML = calculate_base64decode(txt);
    }

}

/* SHA-1, SHA-256 等のハッシュを計算する */
/* 【非同期関数】 await を付けて呼び出すこと */
async function calculate_sha(text, algorithm) {
    const encoder = new TextEncoder();
    const uint8 = encoder.encode(text);
    const digest = await crypto.subtle.digest(algorithm, uint8);
    const hashArray = Array.from(new Uint8Array(digest));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/* ASCII 以外の Unicode 文字を扱えるよう、一旦 バイナリデータに変換してから btoa 関数で base64変換する */
/* (参考 : https://qiita.com/kerupani129/items/1d6b936974ec65ae4833
    https://qiita.com/i15fujimura1s/items/6fa5d16b1e53f04f3b06) */
function calculate_base64(text) {
    const uint8Array = new TextEncoder().encode(text);
    const utf8str = String.fromCharCode.apply(null, uint8Array);
    /*    const textEncoder = new TextEncoder();
        const uint8Array = textEncoder.encode(text);
        const binaryString = uint8Array.reduce(
            (uint8Array, uint8) => binaryString + String.fromCharCode(uint8), '',); */
    const base64 = btoa(utf8str);
    return base64;
}

function calculate_base64decode(text) {
    const utf8str = atob(text);
    const uint8Array = new Uint8Array(Array.prototype.map.call(utf8str, c => c.charCodeAt()));
    const base64decode = new TextDecoder().decode(uint8Array);
    return base64decode;
}

/* 16進数（コンマ区切り）テキストに変換する */
function bin2hex(text) {
    const uint8Array = new TextEncoder().encode(text);
    let str = "";
    uint8Array.forEach(function (elm) {
        str += (elm.toString(16) + ", ");
    });
    return str;
}

/* HTMLテキストのエスケープ処理 */
function htmlEscape(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\r\n|\n/g, "<br/>");;
}

/* 表示されている計算済み結果を削除する */
function clear_result_text() {
    if (document.querySelector("input#md5").checked) document.querySelector("td#md5").innerHTML = "計算中 ...";
    else document.querySelector("td#md5").innerHTML = "";

    if (document.querySelector("input#sha-1").checked) document.querySelector("td#sha-1").innerHTML = "計算中 ...";
    else document.querySelector("td#sha-1").innerHTML = "";

    if (document.querySelector("input#sha-256").checked) document.querySelector("td#sha-256").innerHTML = "計算中 ...";
    else document.querySelector("td#sha-256").innerHTML = "";

    if (document.querySelector("input#urlencode_component").checked) document.querySelector("td#urlencode_component").innerHTML = "計算中 ...";
    else document.querySelector("td#urlencode_component").innerHTML = "";

    if (document.querySelector("input#urlencode").checked) document.querySelector("td#urlencode").innerHTML = "計算中 ...";
    else document.querySelector("td#urlencode").innerHTML = "";

    if (document.querySelector("input#urldecode").checked) document.querySelector("td#urldecode").innerHTML = "計算中 ...";
    else document.querySelector("td#urldecode").innerHTML = "";

    if (document.querySelector("input#base64").checked) document.querySelector("td#base64").innerHTML = "計算中 ...";
    else document.querySelector("td#base64").innerHTML = "";

    if (document.querySelector("input#base64decode").checked) document.querySelector("td#base64decode").innerHTML = "計算中 ...";
    else document.querySelector("td#base64decode").innerHTML = "";
}
