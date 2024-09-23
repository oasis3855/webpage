/**
 * クライアントWebブラウザで、デジタル時計を表示
 * するJavaScript
 * 
 * [ IMPORTANT ] HTML内で、スリープ抑止 checkbox の後に、このスクリプトを設置する
 * 
 * Copyright (C) 2024 Hirokazu INOUE
 * This program is free software.
 * You can redistribute it and/or modify it under the terms 
 * of the GNU General Public License version 3.0 or later.
 * 
 * Version 1.1 (2024/09/23) - スリープ抑止
 */
let wakeLock = null;

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake Lock is active');
    } catch (err) {
        console.error(`${err.name}, ${err.message}`);
    }
}

function releaseWakeLock() {
    if (wakeLock !== null) {
        wakeLock.release();
        wakeLock = null;
        console.log('Wake Lock is released');
    }
}

// ページがフォーカスを失ったときにWake Lockを解除
document.addEventListener('visibilitychange', () => {
    const checkbox = document.getElementById('avoid_sleep');
    if (checkbox.checked) {
        if (document.visibilityState === 'visible') {
            requestWakeLock();
        } else {
            releaseWakeLock();
        }
    }
    else {
        releaseWakeLock();
    }
});

document.getElementById("avoid_sleep").addEventListener("change", function () {
    if (this.checked) {
        requestWakeLock();
    } else {
        releaseWakeLock();
    }
});

// 初回のWake Lockリクエスト
requestWakeLock();
