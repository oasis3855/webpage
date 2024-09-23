
/**
 * クライアントWebブラウザで、デジタル時計を表示
 * するJavaScript
 * 
 * Copyright (C) 2024 Hirokazu INOUE
 * This program is free software.
 * You can redistribute it and/or modify it under the terms 
 * of the GNU General Public License version 3.0 or later.
 * 
 * Version 1.0 (2024/09/21)
 */

let fontSizeBase = 1.0;

function updateClock() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateString = `${year}/${month}/${day}`;

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;

    const textContainer_Date = document.getElementById('clock_date');
    textContainer_Date.textContent = dateString;
    // font-size: 10vw; ... 10% of 画面の幅
    textContainer_Date.style.fontSize = (fontSizeBase * 5).toFixed(1) + "vw";

    const textContainer_Time = document.getElementById('clock_time');
    textContainer_Time.textContent = timeString;
    textContainer_Time.style.fontSize = (fontSizeBase * 15).toFixed(1) + "vw";
}

// ボタン押下のイベント登録
document.addEventListener("DOMContentLoaded", function () {
    const buttonFontBigger = document.getElementById('font_bigger');
    const buttonFontSmaller = document.getElementById('font_smaller');
    const buttonFontSelect = document.getElementById('font_select');

    buttonFontBigger.addEventListener("click", function () {
        fontSizeBase += 0.1;
    });
    buttonFontSmaller.addEventListener("click", function () {
        fontSizeBase -= 0.1;
        if (fontSizeBase <= 0.1) { fontSizeBase = 0.1; }
    });
    buttonFontSelect.addEventListener("click", function () {
        const selectElement = document.getElementById('font_select_list');
        const selectedFontName = selectElement.options[selectElement.selectedIndex].value;
        // URLに含めるフォント名は、「スペース」を「+」に変換
        const selectedFontNameEscape = selectedFontName.replace(/ /g, '+');
        document.getElementById('font-link').href = `https://fonts.googleapis.com/css2?family=${selectedFontNameEscape}:wght@400;700&display=swap`;
        document.getElementById('clock_date').style.fontFamily = selectedFontName;
        document.getElementById('clock_time').style.fontFamily = selectedFontName;
    });

});

// onload で開始する場合（headタグ内にscript呼び出しを記述する場合）
/***
window.onload = function () {
    setInterval(updateClock, 200);

}
***/
// 時計を表示する<div>タグの後ろにscript呼び出しを記述する場合
setInterval(updateClock, 1000);
