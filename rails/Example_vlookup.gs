function myFind() {
  var ss = SpreadsheetApp.getActive(), rowNum = [], collNum = [];
  var findData = ss.getSheetByName('Grave').getRange("A2").getValue();
  var searchData = ss.getSheetByName('Data_grave').getDataRange().getValues();

  var found = false;
  for(var i=1, iLen=findData.length; i<iLen && !found; i++) {  
    for(var j=0, jLen=searchData.length; j<jLen && !found; j++) {
      for(var k=0, kLen=searchData[0].length; k<kLen && !found; k++) {
        var find = findData;
        if(find == searchData[j][k]) {
          var rowNum = j+1;
          var collNum = k+2;
          found = true;
        }
      }
    }
  }
  ss.getSheetByName('Data_grave').getRange(rowNum,collNum).setValue("wow2");
}
