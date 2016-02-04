function myFind() {
  var ss = SpreadsheetApp.getActive(), rowNum = [], collNum = [];
  var findData = ss.getSheetByName('Grave').getRange("A2").getValue();
  var searchData = ss.getSheetByName('Data_grave').getDataRange().getValues();

  for(var i=1, iLen=findData.length; i<iLen; i++) {  
    for(var j=0, jLen=searchData.length; j<jLen; j++) {
      for(var k=0, kLen=searchData[0].length; k<kLen; k++) {
        var find = findData;
        if(find == searchData[j][k]) {
          rowNum.push([j+1]);
          collNum.push([k+2]);
        }
      }
    }
  }
  ss.getSheetByName('Data_grave').getRange(rowNum,collNum).setValue("Hello world");
}
