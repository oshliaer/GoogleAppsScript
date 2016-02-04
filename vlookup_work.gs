function VLU() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var CopyData = SpreadsheetApp.openById("187fNm9-oLxu8TRo0QTIQhvm9m5VhifsnF8I_5r0gRzg").getSheetByName("Data").getRange("A1:K800").getValues();
  ss.getSheetByName("Data").getRange("A1:K800").setValues(CopyData);
  
  //Таблица с данными для поиска значений  
  var DataSheet = ss.getSheetByName("Data").getDataRange().getValues();
  var Data_row = ss.getSheetByName("Data").getRange("A1").getValue();
  for (var sheetId = 0; sheetId<sheets.length; sheetId++){
    if(sheets[sheetId].getSheetName() == "List_1" && sheets[sheetId].getSheetName() == "Data"){continue;}
      var SheetName = sheets[sheetId].getRange("A1").getValues();
      for(var i=0, iLen=SheetName.length; i<iLen; i++) {  
        for(var j=0, jLen=DataSheet.length; j<jLen; j++) {
            if(SheetName == DataSheet[j][0]) {
              var rowNum = j+1;
              var GetData = ss.getSheetByName("Data").getRange(rowNum, 3, 1, 9).getValues();           
              sheets[sheetId].getRange(Data_row,2,1,9).setValues(GetData);
            }
        }
      }                            
    } 
  ss.getSheetByName("Data").clear();
}  
