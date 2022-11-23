import { google } from 'googleapis';

export const getSheetData = async () => {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      "",
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1', // sheet name
    });

    const rows = response.data.values;
    if (rows && rows.length) {
      return rows.slice(1).map((row) => ({
        _id: row[0],
        id: row[0],
        Firstname: row[1],
        Middlename: row[2],
        Lastname: row[3],
        Gender: row[4],
        DOB: row[5],
        Death: row[6],
        Mother: row[7],
        Father: row[8],
        Spouse: row[9],
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}