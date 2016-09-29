function pantryHelper() {
  // WARNING: youremail@email.com" must be replaced with your email for this script to function.
  
  // get the spreadsheet object
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  //
  // START SHEET 01 VARIABLES
  //  
  
  // set the second sheet as active, Preservation Log
  SpreadsheetApp.setActiveSheet(spreadsheet.getSheets()[1]);

  // get the active sheet.
  var sheet = spreadsheet.getActiveSheet();
   
  // figure out what the last row is
  var lastRow = sheet.getLastRow();
 
  // the rows are indexed starting at 1, and the first row
  // is the headers, so start with row 2
  var startRow = 2;

  // get column data, date
  range = sheet.getRange(2, 1, lastRow-startRow+1, 1);
  var date_log = range.getValues();

  // get column data, batch id
  range = sheet.getRange(2, 2, lastRow-startRow+1, 1);
  var batch_id = range.getValues();

  // get column data, preservation method
  range = sheet.getRange(2, 3, lastRow-startRow+1, 1);
  var preservation_method = range.getValues();
  
  // get column data, item category
  range = sheet.getRange(2, 4, lastRow-startRow+1, 1);
  var item_category = range.getValues();
  
  // get column data, item name
  range = sheet.getRange(2, 5, lastRow-startRow+1, 1);
  var item_name = range.getValues();

  // get column data, yield
  range = sheet.getRange(2, 6, lastRow-startRow+1, 1);
  var yield = range.getValues();
  
  // get column data, stock
  range = sheet.getRange(2, 7, lastRow-startRow+1, 1);
  var stock = range.getValues();  
  
  // get column data, container volume
  range = sheet.getRange (2, 8, lastRow-startRow+1, 1);
  var volume = range.getValues();
   
  // get column data, commnets
  range = sheet.getRange(2, 9, lastRow-startRow+1, 1);
  var comments = range.getValues();

  // get column data, shelf life profile
  range = sheet.getRange(2, 10, lastRow-startRow+1, 1);
  var shelf_life_profile = range.getValues();
      
  // get column data, best by date
  range = sheet.getRange(2, 11, lastRow-startRow+1, 1);
  var best_by = range.getValues();    
  
  // get column data, preserve age
  range = sheet.getRange(2, 12, lastRow-startRow+1, 1);
  var age = range.getValues();
  
  // get column data, best by days left
  range = sheet.getRange(2,13, lastRow-startRow+1,1 );
  var days_left = range.getValues();
  // // Get a count of how many rows contain "days left" data. Used to define a cycle limit for a loop.
  var numRows = range.getNumRows();

  range = sheet.getRange(2, 14, lastRow-startRow+1, 1);
  var alert_a_days = range.getValues();
  
  range = sheet.getRange(2, 15, lastRow-startRow+1, 1);
  var alert_b_days = range.getValues();
  
  range = sheet.getRange(2, 16, lastRow-startRow+1, 1);
  var alert_a_age = range.getValues();
  
  range = sheet.getRange(2, 17, lastRow-startRow+1, 1);
  var alert_b_age = range.getValues();
  
  range = sheet.getRange(2, 18, lastRow-startRow+1, 1);
  var alert_c_age = range.getValues();
  
  range = sheet.getRange(2, 19, lastRow-startRow+1, 1);
  var alert_d_age = range.getValues();
  
  //
  // END SHEET 01 VARIABLES
  //
    
  // BEGIN MORE VARIABLES
  
  // Variable stores how many alerts have been appended to the email body.  
  var alert_count = 0;
  
  // This is the message header. 
  var msg = "The following batches of preserves have triggered alerts." +
    "You are encouraged to take note of the stock, and try to plan to consume the preserve while its qualities are optimal, before the \"best by\" date." +
    " After the \"best by\" date preserves may begin to suffer noticable losses in color, flavor, texture, and nutrition qualities; however, The food may still be safe to consume." +
    " \"Best by\" and expiration dates are estimates based on information from trusted sources like the USDA, but also on my own and other's anecdotal experiences."+
    " Even after the expiration date it may still be safe to consume certain preserves, but due to significant losses in its qualities it may not be desirable." +
    "\n\n" +
    " \"Best by\" dates and expiration dates can be customized in the shelf_life_db sheet of the spreadsheet.\n" +
    "\n" +
    "Alert Level 1 = Very early alert sent well in advance to \"best by\" date.\n" +
    "Alert Level 2 = Second alert, sent closer to the best by date.\n" +
    "Alert Level 3 = Third alert, sent to inform you that the preserve has reached its \"best by\" date.\n" +
    "Alert Level 4 = Fourth alert, sent to inform you that the preserve has reached its expiration date.\n" +
    "\n" +
    "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n";
  
  // END MORE VARIABLES
  
  // This loop cycles through batches to build an alert message for each batch that meets the criteria.
  for (var i = 0; i <= numRows - 1; i++) {

    // Each alert level has a custom message.    
    // Alert Level 1 Message
    var alert_a_msg = "\nAlert Level 1 - "+item_name[i][0]+", Batch "+batch_id[i][0]+"\n\n" +
      ""+days_left[i][0]+" days until \"best by\" date. This is an early reminder that the following item should be consumed before its \"best by\" date.\n";
    
    // Alert Level 2 Message    
    var alert_b_msg = "\nAlert Level 2 - "+item_name[i][0]+", Batch "+batch_id[i][0]+"\n\n" +
      ""+days_left[i][0]+" days until \"best by\" date. This is a reminder that the following item should be consumed before its \"best by\" date.\n"; 
    
    // Alert Level 3 Message
    var alert_c_msg = "\nAlert Level 3 - "+item_name[i][0]+", Batch "+batch_id[i][0]+"\n\n" +
      "This item has reached its \"best by\" date.\n";

    // Alert Level 4 Message
    var alert_d_msg = "\nAlert Level 4 - "+item_name[i][0]+", Batch "+batch_id[i][0]+"\n\n" +
      "This item may have expired. Its qualities may have declined to a point which consumption is undesirable.\n";
    
    // Builds an alert for a batch if it meets the conditions.
    if ((age[i][0] == alert_a_age[i][0] || 
         age[i][0] == alert_b_age[i][0] || 
         age[i][0] == alert_c_age[i][0] ||
         age[i][0] == alert_d_age[i][0]) && stock[i][0] >= 1) {
  
      // Assign the alert a message depending on the alert level.
      if(age[i][0] == alert_a_age[i][0]){
        var alert_msg = alert_a_msg;
      } else if(age[i][0] == alert_b_age[i][0]){
        var alert_msg = alert_b_msg;
      } else if(age[i][0] == alert_c_age[i][0]){
        var alert_msg = alert_c_msg;
      } else if (age[i][0] == alert_d_age[i][0]){
        var alert_msg = alert_d_msg;
      }
      
      // Append the batch alert to the msg variable. 
      msg = msg + ""+alert_msg+"\nItem: "+item_name[i][0]+"\nBatch: "+batch_id[i][0]+"\nBest By: "+best_by[i][0]+"\nDays to best by: "+days_left[i][0]+"\nStock: "+stock[i][0]+" "+volume[i][0]+"s\nPreservation Method: "+preservation_method[i][0]+"\n__________________________________________________\n";
      alert_count++;      
    }
  }

  // Sends email if "alert_count" is greater than zero.
  if(alert_count) {
    MailApp.sendEmail("yourgmail@gmail.com","Pantry - "+alert_count+" Alerts", msg);
  }  
}
