// Таблица с листами
var SPREAD_OF_SHEETS_ID = '1Tx05XxuXbGFmRPta9OnVdMZJ8et2K-ox_lIWn1Pa52w';
// Таблица-редактор
var SHEET_EDITOR_ID = '1Uqv8XHWegqYC5xy5fTmE0vEwOpNSFVaOdheTkfl3cig';

function getDataToSheet() {
    var sh = SpreadsheetApp.openById(SHEET_EDITOR_ID).getSheets()[0];
    var date = sh.getRange('A1').getValue();
    var data = Sprinkler().setSource(SPREAD_OF_SHEETS_ID).getData(date);
    sh.getRange('A2:Z').clear();
    sh.getRange(2, 1, data.length, data[0].length).setValues(data);

}

function setDataToSheets() {
    var sh = SpreadsheetApp.openById(SHEET_EDITOR_ID).getSheets()[0];
    var data = sh.getDataRange().getValues();
    var date = data.shift()[0];
    var logs = [];
    Sprinkler().setSource(SPREAD_OF_SHEETS_ID).setData(date, data, function(l) {
        logs.push(JSON.stringify(l))
    });
}

/* ======================================= Sprinkler  ====================================== */
Date.prototype.toStr = function() {
    return Utilities.formatDate(this, 'GMT+3', 'yyyyMMdd');
}

Array.prototype.pretty = function() {
    var arr = this;
    return arr.reduce(function(pV, cV) {
        pV[cV.shift()] = cV;
        return pV;
    }, {});
}

Array.prototype.extractDataByDate = function(date) {

    var same = (new Array(this[0].length - 1)).join(',').split(',');
    var i = 0;
    while (i < this.length) {
        if (Object.prototype.toString.call(this[i][0]) === '[object Date]' && this[i][0].toStr() === date.toStr()) {
            this[i].shift();
            return this[i];
        }
        i++;
    }
    return same;
}

Array.prototype.getRowByDate = function(date) {

    var i = 0;
    while (i < this.length) {
        if (Object.prototype.toString.call(this[i][0]) === '[object Date]' && this[i][0].toStr() === date.toStr()) {
            return i;
        }
        i++;
    }
    return -1;
}

function Sprinkler() {
    return new Sprinkler_()
};

function Sprinkler_() {

    var sprinkler = this;

    var S = {};

    sprinkler.setSource = function(id) {
        S.source = SpreadsheetApp.openById(id);
        return sprinkler;
    }

    sprinkler.getData = function(date) {
        return S.source.getSheets().map(function(sheet) {
            return [sheet.getName()].concat(sheet.getDataRange().getValues().extractDataByDate(date));
        });
    }
    sprinkler.setData = function(date, data, callback) {
        var prettyData = data.pretty();
        S.source.getSheets().forEach(function(sheet) {
            var res = {};
            if (!prettyData.hasOwnProperty(sheet.getName())) {
                res.err = 'no data';
                if (typeof callback === "function") callback(res);
                return;
            }
            var row = sheet.getDataRange().getValues().getRowByDate(date);
            if (row == -1) {
                sheet.appendRow(
                    [date].concat(prettyData[sheet.getName()])
                );
            } else {
                Logger.log(prettyData);
                sheet.getRange(row + 1, 2, 1, prettyData[sheet.getName()].length).setValues([prettyData[sheet.getName()]]);
            }
            if (typeof callback === "function") callback(res);
            return;
        });
    }
    return sprinkler;
}