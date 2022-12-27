import { google } from 'googleapis';

export const getArtifactData = async (
  sheetName: 'Movies' | 'Artifacts' | 'Photos',
) => {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      '',
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target,
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: sheetName,
    });

    const rows = response.data.values;
    if (rows && rows.length) {
      return rows.slice(1).map(row => ({
        _id: row[0],
        id: row[0],
        artifact_id: row[1],
        title: row[2],
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
};

export const getSheetData = async () => {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      '',
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target,
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'People', // sheet name
    });

    const rows = response.data.values;
    if (rows && rows.length) {
      return rows.slice(1).map(row => ({
        _id: row[0],
        id: row[0],
        Firstname: row[1],
        Middlename: row[2],
        Lastname: row[3],
        Gender: row[4],
        DOB: row[5],
        Birthplace: row[6],
        BirthplaceCoords: row[7],
        Death: row[8],
        Deathplace: row[9],
        DeathplaceCoords: row[10],
        Mother: row[11],
        Father: row[12],
        Spouse: row[13],
        Divorced: row[14],
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
};
