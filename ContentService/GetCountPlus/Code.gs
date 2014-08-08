//original data http://www.tomanthony.co.uk/blog/google_plus_one_button_seo_count_api/comment-page-1/
function onInstall(){
  
}
function doGet(e){
  Logger.log(e)
  return ContentService.createTextOutput(GetCountPlus(e.parameter.id))
}
function GetCountPlus(url) {
  try{
    var payload = {
      "method": "pos.plusones.get",
      "id": "p",
      "params": {
        "nolog": true,
        "id": url,
        "source": "widget",
        "userId": "@viewer",
        "groupId": "@self"
      },
      "jsonrpc": "2.0",
      "key": "p",
      "apiVersion": "v1"
    }
    var url = 'https://clients6.google.com/rpc?key=AIzaSyCKSbrvQasunBoV16zDH9R33D88CeLr9gQ';
    var params = {
      method: 'post',
      contentType: 'Content-type: application/json',
      muteHttpExceptions: true,
      payload: JSON.stringify([payload])
    }
    var fetch = UrlFetchApp.fetch(url, params);
    return JSON.parse(fetch.getContentText())[0]['result']['metadata']['globalCounts']['count'];
  }catch(err){
    return err.name + ': ' + err.message + ' Get helped at: gdriveru.blogspot.com';
  }
}