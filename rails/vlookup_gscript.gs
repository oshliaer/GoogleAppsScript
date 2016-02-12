function VLU2() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  //Таблица с данными для поиска значений  
  var DataSheet = SpreadsheetApp.openById("1Xdws6Vr6YVXuj19mvpOvkpJokOfY2T7Sh1aMpous_Xw").getSheetByName("Data").getDataRange().getValues();
  var Data_row = ss.getSheetByName("List").getRange("D2").getValue();
  for (var sheetId = 0; sheetId<sheets.length; sheetId++){
    if(sheets[sheetId].getSheetName() == "List"){continue;}
      var SheetName = sheets[sheetId].getRange("A1").getValues();
        for(var j=0, jLen=DataSheet.length; j<jLen; j++) {
            if(SheetName == DataSheet[j][0]) {
              var rowNum = j+1;
              var GetData = SpreadsheetApp.openById("1Xdws6Vr6YVXuj19mvpOvkpJokOfY2T7Sh1aMpous_Xw").getSheetByName("Data").getRange(rowNum, 2, 1, 9).getValues();           
              sheets[sheetId].getRange(Data_row,2,1,9).setValues(GetData);
            }
        }
      }                            
}
