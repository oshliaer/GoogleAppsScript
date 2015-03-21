/**
 * Returns info about sheet. p can be 'CUR', 'ALL'. f should be
 * 'getFrozenColumns', 'getFrozenRows', 'getIndex', 'getLastColumn',
 * 'getLastRow', 'getMaxColumns', 'getMaxRows', 'getName', 'getSheetId',
 * 'getSheetName', 'isSheetHidden'
 * 
 * @customfunction
 */
function shinfo(p, f) {
	if (!f)
		f = 'getName';
	try {
		switch (p) {
		case 'ALL':
			return zmap_(SpreadsheetApp.getActiveSpreadsheet().getSheets(), f);
		case 'CUR':
			return zmap_([ SpreadsheetApp.getActiveSheet() ], f);
		}
		return SpreadsheetApp.getActiveSheet().getName();
	} catch (e) {
		return e.message
	}
}
function zmap_(arr, range) {
	if (!(range instanceof Array))
		return eachOne_(arr, range);
	if (range.length == 1)
		return calcRow_(arr, range);
	if (range.length > 1)
		return calcCol_(arr, range);
	return range.length;
}
function eachOne_(arr, range) {
	var row = [];
	for (var i = 0; i < arr.length; i++) {
		row.push(arr[i][range]());
	}
	return row
}
function calcRow_(arr, range) {
	var r = [];
	for (var i = 0; i < arr.length; i++) {
		var row = [];
		for (var j = 0; j < range[0].length; j++) {
			row.push(arr[i][range[0][j]]());
		}
		r.push(row);
	}
	return r;
}
function calcCol_(arr, range) {
	var r = [];
	for (var j = 0; j < range.length; j++) {
		var row = [];
		for (var i = 0; i < arr.length; i++) {
			row.push(arr[i][range[j][0]]());
		}
		r.push(row);
	}
	return r;
}