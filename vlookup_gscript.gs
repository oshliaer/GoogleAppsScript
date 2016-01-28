function VLU() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  
  //Таблица с данными для поиска значений
  var DataSheet = SpreadsheetApp.openById("1Xdws6Vr6YVXuj19mvpOvkpJokOfY2T7Sh1aMpous_Xw").getSheetByName("Data").getDataRange().getValues();
    
  //Дата выгрузки новых данных
  var WhatDate = SpreadsheetApp.openById("1Xdws6Vr6YVXuj19mvpOvkpJokOfY2T7Sh1aMpous_Xw").getSheetByName("Data").getRange("B2").getValue();
    
  //1. Определить диапазон по значению даты, куда нужно будет вставлять данные
  var Template = ss.getSheetByName("1. Win").getDataRange().getValues();
  for(var j=0; j<Template.length; j++){
    if(Template[j][0]==WhatDate){        
      var PlaceForData = Template[j][1]; 

      
      
    }
  }
  
  //2. Найти название вкладки в таблице с данными, скопировать значения
  for (var sheetId = 0; sheetId<sheets.length; sheetId++){
    if(sheets[sheetId].getSheetName() == "List"){continue;}
      var SheetName = sheets[sheetId].getRange("A1").getValues();
      for(var i=0; i<DataSheet.length; i++){
        if(DataSheet[i][0]==SheetName){        
        var getdata 
    
        
        
  //3. Вставить данные        
       ss.getRange(PlaceForData).setValues(getdata);
          
          
          
       }    
     }
  }
}
