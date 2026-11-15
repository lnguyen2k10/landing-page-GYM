/** Bound Google Apps Script. Only public marketing content belongs in this sheet. */
const DRAFT = 'Nội dung';
const PUBLISHED = 'Đã xuất bản';
function onOpen() {
 SpreadsheetApp.getUi().createMenu('Fit Club').addItem('Chỉnh sửa nội dung', 'showEditor').addItem('Xuất bản lên website', 'publishContent').addToUi();
}
function showEditor() {
 SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutputFromFile('Editor').setTitle('Fit Club · Nội dung website'));
}
function getEditorData() {
 const sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DRAFT);
 if(!sheet) throw new Error('Chưa có trang tính Nội dung. Hãy nhập file CSV mẫu trước.');
 return sheet.getDataRange().getDisplayValues().slice(1).filter(r=>r[0]).map(r=>({key:r[0],label:r[1]||r[0],value:r[2]||''}));
}
function saveDraft(items) {
 if(!Array.isArray(items)||items.length>100) throw new Error('Dữ liệu không hợp lệ.');
 const sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DRAFT);
 if(!sheet) throw new Error('Không tìm thấy trang tính Nội dung.');
 const existing=sheet.getDataRange().getDisplayValues();
 const byKey={};items.forEach(i=>{if(typeof i.key==='string'&&typeof i.value==='string'&&i.value.length<=6000) byKey[i.key]=i.value;});
 for(let r=1;r<existing.length;r++) if(Object.prototype.hasOwnProperty.call(byKey,existing[r][0])) {
  // Leading apostrophe makes all editor input literal text, including formula-like strings.
  sheet.getRange(r+1,3).setValue("'"+byKey[existing[r][0]]);
 }
 return 'Đã lưu bản nháp. Bấm Xuất bản khi muốn cập nhật website.';
}
function publishContent() {
 const ss=SpreadsheetApp.getActiveSpreadsheet();
 const draft=ss.getSheetByName(DRAFT);if(!draft)throw new Error('Chưa có trang tính Nội dung.');
 const rows=draft.getDataRange().getDisplayValues();
 const data={};rows.slice(1).filter(r=>r[0]).forEach(r=>data[r[0]]=r[2]||'');
 // One property write publishes the whole snapshot, so readers never see partial rows.
 PropertiesService.getScriptProperties().setProperty('PUBLIC_CONTENT',JSON.stringify(data));
 let published=ss.getSheetByName(PUBLISHED)||ss.insertSheet(PUBLISHED);
 published.clear();published.getRange(1,1,rows.length,3).setValues(rows.map(r=>r.slice(0,3).map(v=>"'"+v)));
 published.setFrozenRows(1);published.autoResizeColumns(1,2);published.setColumnWidth(3,500);
 ss.toast('Đã xuất bản. Website cập nhật sau khoảng 1 phút.','Fit Club',8);
 return 'Đã xuất bản. Website cập nhật sau khoảng 1 phút.';
}
function doGet() {
 const json=PropertiesService.getScriptProperties().getProperty('PUBLIC_CONTENT')||'{}';
 return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

// Called only by authorized spreadsheet editors in the bound sidebar.
function uploadImage(file) {
 if(!file||!['image/jpeg','image/png','image/webp'].includes(file.mime)||typeof file.base64!=='string'||file.base64.length>7000000)throw new Error('Chọn ảnh JPG, PNG hoặc WebP dưới 5 MB.');
 const bytes=Utilities.base64Decode(file.base64);
 if(bytes.length>5*1024*1024)throw new Error('Ảnh quá lớn, vui lòng chọn ảnh dưới 5 MB.');
 const props=PropertiesService.getScriptProperties();let folder;
 const id=props.getProperty('IMAGE_FOLDER_ID');
 if(id){folder=DriveApp.getFolderById(id)}else{folder=DriveApp.createFolder('Fit Club 222 - Anh website');props.setProperty('IMAGE_FOLDER_ID',folder.getId())}
 const image=folder.createFile(Utilities.newBlob(bytes,file.mime,String(file.name||'anh-fitclub').replace(/[^a-zA-Z0-9._-]/g,'_')));
 try{image.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW)}catch(e){image.setTrashed(true);throw new Error('Tài khoản Google không cho phép chia sẻ ảnh công khai. Hãy dùng đường dẫn ảnh HTTPS từ nơi lưu trữ khác.')}
 return 'https://lh3.googleusercontent.com/d/'+image.getId();
}
