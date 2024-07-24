;	LEDを点滅するテストプログラム
;	GP0 に接続したLEDを点滅します
;
;	アセンブル オプションで、大文字小文字の区別をOFFにすること

	list			p=pic12f629	; プロセッサ名変更 PIC12F629 へ
	#include		<p12f629.inc>	; プロセッサに合わせて、INCファイル変更
	errorlevel	-302			; エラーレベル追加


	__CONFIG   _CP_OFF & _CPD_OFF & _BODEN_OFF & _MCLRE_OFF & _WDT_OFF & _PWRTE_ON & _INTRC_OSC_NOCLKOUT 

; 変数のメモリへのマッピング
	CBLOCK	0x20				; 12F629 の BANK0 メモリはアドレス 0x20～0x5f が利用可能
	CNT1
	CNT2
	CNT3
	ENDC

;***************************
; プログラム開始
;***************************
	ORG		0x000
	GOTO	PROGRAM_START
	
	ORG		0x004			; 不意の割り込みが発生した場合
	RETFIE

PROGRAM_START
	; GPIO の IN/OUT 設定 (GP0 を OUTPUT)
 	BSF		STATUS, RP0		; Select Bank 1
	MOVLW	B'00000000'		; bit0 が GP0 に対応、bit0=0とする
	MOVWF	TRISIO

	; GPIO GP0 ～ GP2 のコンパレータ設定 (OFFとする)
	BCF		STATUS, RP0		; Select Bank 0
 	MOVLW	0x07				; コンパレータを使わない
 	MOVWF	CMCON

	BCF		INTCON, PEIE		; 周辺割り込みすべてOFF

	CLRF	GPIO				; 全I/O クリア

MAIN
	BSF		GPIO, 0			; GP0=1 LED点灯
	CALL	DELAY_500MSEC		; 0.5秒待ち
	BCF		GPIO, 0			; GP0=0 LED消灯
	CALL	DELAY_500MSEC		; 0.5秒待ち
	BSF		GPIO, 0			; GP0=1 LED点灯
	CALL	DELAY_500MSEC		; 0.5秒待ち
	BCF		GPIO, 0			; GP0=0 LED消灯
	CALL	DELAY_1SEC		; 0.5秒待ち
	GOTO	MAIN

;***************************
; ここからサブルーチン部
;***************************

								; 1命令サイクル = 4クロック
								; 4MHzクロック時は、１命令は1MHz(=1usec)

DELAY_50MSEC
	MOVLW	D'50'
	MOVWF	CNT1

DELAY_50MSEC_LOOP0				; ((4*250)+5)*50サイクル = 50250サイクル
	MOVLW	D'250'
	MOVWF	CNT2

DELAY_50MSEC_LOOP1				; 4*250サイクル
	NOP							; 1
	DECFSZ	CNT2, F				; 1(no skip), 2
	GOTO 	DELAY_50MSEC_LOOP1	; 2
	DECFSZ	CNT1, F				; 1(no skip), 2
	GOTO 	DELAY_50MSEC_LOOP0	; 2
	
	RETURN

DELAY_1SEC
	MOVLW	d'20'
	MOVWF	CNT3				; 50msec * 20
DELAY_1SEC_LOOP
	CALL	DELAY_50MSEC
	DECFSZ	CNT3, F
	GOTO	DELAY_1SEC_LOOP

DELAY_500MSEC
	MOVLW	d'10'
	MOVWF	CNT3				; 50msec * 10
DELAY_500MSEC_LOOP
	CALL	DELAY_50MSEC
	DECFSZ	CNT3, F
	GOTO	DELAY_500MSEC_LOOP


	RETURN


	END
