/**
 * カラーテーマのノーマル／ダークを切り替える JavaScript
 * 
 * Copyright (C) 2024 Hirokazu INOUE
 * This program is free software.
 * You can redistribute it and/or modify it under the terms 
 * of the GNU General Public License version 3.0 or later.
 * 
 * Version 1.0 (2024/08/13)
 */

/****
 * カラーテーマ（ノーマル／ダーク）を切り替える（トグル）
 * 同時に、現在のテーマ選択をローカルストレージに保存する
 */
function onPressButtonDarkmode() {
    // カラーテーマを切り替える
    const body = document.querySelector('body');
    body.classList.toggle('dark');

    // ノーマルモード／ダークモードをローカルストレージに記憶
    var mode = localStorage.getItem('mode');
    if (mode === 'normal') {
        localStorage.setItem('mode', 'dark');
        mode = 'dark';
    } else {
        localStorage.setItem('mode', 'normal');
        mode = 'normal';
    }
}

/****
 * ローカルストレージに保存されたモード（ノーマル／ダーク）を
 * 復元する
 */
function darkmode_startup() {
    const body = document.querySelector('body');
    var mode = localStorage.getItem('mode');
    if (mode === 'dark') {
        body.classList.add('dark');
    }
}

/****
 * ページの読込完了したら、呼び出す関数
 * (スクリプト内にwindow.omloadメソッドで指定する方法)
 */
window.onload = darkmode_startup;


