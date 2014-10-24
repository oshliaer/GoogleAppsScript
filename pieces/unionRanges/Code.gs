/**
 * Joins ranges. Example =unionRanges(Sheet1!A:B, A1, 36, "44", B2:C12)
 * 
 * @param {...ranges} input ranges for joining.
 * @return The combined range.
 * @customfunction
 */
function unionRanges(e) {
	var result = [];
	var length = 0;
	try {
		for (var j = 0; j < arguments.length; j++) {
			if (!(arguments[j] instanceof Array))
				arguments[j] = [ [ arguments[j] ] ];
			length += arguments[j].length * arguments[j][0].length;
		}
		if (length > 400000)
			return '#ERROR_OVER_TOTAL_CELLS: ' + length;
		for (var i = 0; i < arguments.length; i++)
			result = result.concat(arguments[i].filter(function(el) {
				return el.join('').length > 0
			}));
		return result;
	} catch (err) {
		return err.name + ' ' + err.message;
	}
}