//*************
//-- Generic Unit Conversion Program
// Author	 : Jonathan Weesner (jweesner@cyberstation.net)  21 Nov 95
// Copyright : You want it? Take it! 
//*************

function convertform(form){
	var firstvalue = 0;
	for (var i = 1; i <= form.count; i++) {
		// Find first non-blank entry
		if (form[i].value != null && form[i].value.length != 0) {
		// Verify that value is a number
		for (var j = 0; j < form[i].value.length; j++) {
			var ch = form[i].value.substring(j, j + 1)
			if ((ch < "0" || "9" < ch) && ch != '.') {
				alert(" field has invalid data: " + form[i].value);
				clearform(form);
				return false;
			}
		}
		if (i == 1 && form[2].value != "") return false;
			firstvalue = form[i].value / form[i].factor;
			break;
		}
	}
	if (firstvalue == 0) {
		clearform(form);
		return false;
	}
	for (var i = 1; i <= form.count; i++) {
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
	clearform(form);
	form[1].value = 1;
	convertform(form);
	return true;
}

function clearform(form) {
	for (var i = 1; i <= form.count; i++) form[i].value = "";
	return true;
}
