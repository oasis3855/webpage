//*************
//-- Generic Unit Conversion Program
// Author	 : Jonathan Weesner (jweesner@cyberstation.net)  21 Nov 95
// Copyright : You want it? Take it! 
//*************

function convertform(form){
	var firstvalue = 0.0;
	for (var i = 0; i < form.count; i++) {
		// Find first non-blank entry
		if (form[i].value != null && form[i].value.length != 0) {
			// Verify that value is a number
			for (var j = 0; j < form[i].value.length; j++) {
				var ch = form[i].value.substring(j, j + 1)
				if ((ch < "0" || "9" < ch) && ch != '.' && ch != '-') {
					alert(" field has invalid data: " + form[i].value);
					clearform(form);
					return false;
				}
			}
			firstvalue = parseFloat(form[i].value) / form[i].factor;
			break;
		}
	}
	for (var i = 0; i < form.count; i++) {
		form[i].value = firstvalue * form[i].factor;
		form[i].value = formatvalue(form[i].value, form.rsize);
	}
	return true;
}

function formatvalue(input, rsize) {
	var invalid = "**************************";
	var nines = "999999999999999999999999";
	if (input.length <= rsize) return input;
	if (strpos(input, 'e') != -1 || eval(input) > eval(nines.substring(0,rsize)+".4"))
		return invalid.substring(0, rsize);
	var rounded = "" + (eval(input) + (eval(input) - eval(input.substring(0, rsize))));
	return rounded.substring(0, rsize);
}

function strpos(str, ch) {
	for (var i = 0; i < str.length; i++)
		if (str.substring(i, i+1) == ch) return i;
	return -1;
}

function resetform(form) {
	var basetopic = 1;

	clearform(form);
	for (var i = 0; i < form.count; i++) {
		if(form[i].factor == 1) basetopic = i;
	}
	form[basetopic].value = 1;
	convertform(form);
	return true;
}

function clearform(form) {
	for (var i = 0; i < form.count; i++) form[i].value = "";
	return true;
}


// 利用するHTMLには、次のパラメータ初期化スクリプトを記述すること
// factors must convert the first item to the current item.
// Be sure to use the correct form index. The first form is
// always index "0" and remaining forms are numbered in the
// order they appear in the document.
//document.forms[0].count = 9;	// number of unit types
//document.forms[0].rsize = 10;  // Rounding size, use same as SIZE
//document.forms[0].val1.factor = 1;			// atm to atm.
//document.forms[0].val2.factor = 1.013;  // atm to bar.
//document.forms[0].val3.factor = 1.033;  // atm to kgf/cm2.
//document.forms[0].val4.factor = 14.7;  // atm to lbf/in2.
//document.forms[0].val5.factor = 760.0; // atm to mmHg.
//document.forms[0].val6.factor = 10.33; // atm to mH2O.
//document.forms[0].val7.factor = 101300; // atm to Pa.
//document.forms[0].val8.factor = 101.3; // atm to kPa.
//document.forms[0].val9.factor = 0.1013; // atm to MPa.



// 温度変換のみに使う


function convertform_temp(form){
	var firstvalue = 0.0;

	if (form[0].value != null && form[0].value.length != 0)
	{	// set deg-C
		for (var j = 0; j < form[0].value.length; j++)
		{
			var ch = form[0].value.substring(j, j + 1)
			if ((ch < "0" || "9" < ch) && ch != '.' && ch != '-')
			{
				alert(" field has invalid data: " + form[0].value);
				clearform(form);
				return false;
			}
		}
		form[1].value =  (form[0].value * 1.8) + 32.0;
		form[2].value =  (form[0].value * 1.0) + 273.15;
	}
	else if (form[1].value != null && form[1].value.length != 0)
	{	// set deg-F
		for (var j = 0; j < form[1].value.length; j++)
		{
			var ch = form[1].value.substring(j, j + 1)
			if ((ch < "0" || "9" < ch) && ch != '.' && ch != '-')
			{
				alert(" field has invalid data: " + form[1].value);
				clearform(form);
				return false;
			}
		}
		form[0].value =  (form[1].value * 1.0 - 32.0) / 1.8;
		form[2].value =  (form[1].value * 1.0 - 32.0) / 1.8 + 273.15;
	}
	else if (form[2].value != null && form[2].value.length != 0)
	{	// set K
		for (var j = 0; j < form[2].value.length; j++)
		{
			var ch = form[2].value.substring(j, j + 1)
			if ((ch < "0" || "9" < ch) && ch != '.' && ch != '-')
			{
				alert(" field has invalid data: " + form[2].value);
				clearform(form);
				return false;
			}
		}
		form[0].value =  (form[2].value * 1.0) - 273.15;
		form[1].value =  (form[2].value * 1.0 - 273.15)*1.8 + 32.0;
	}

	return true;
}

function resetform_temp(form) {
	clearform(form);
	form[0].value = 0;
	convertform_temp(form);
	return true;
}


