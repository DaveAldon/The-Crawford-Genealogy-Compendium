import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

export const getMilitaryData = async () => {
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
      range: 'Military',
    });

    const rows = response.data.values;
    if (rows && rows.length) {
      return rows.slice(1).map((row: any[]) => ({
        id: row[0],
        branch: row[1],
        rank: row[2],
        start: row[3],
        end: row[4],
        description: row[5],
        awards: row[6],
        theater: row[7],
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
};

export const getFamilyData = async (sheet: string) => {
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
      range: sheet, // sheet name
    });

    const rows = response.data.values;
    if (rows && rows.length) {
      return rows.slice(1).map(row => ({
        id: row[0],
        Firstname: row[1] || '',
        Middlename: row[2] || '',
        Lastname: row[3] || '',
        Gender: row[4] || '',
        DOB: row[5] || '',
        Birthplace: row[6] || '',
        BirthplaceCoords: row[7] || '',
        Death: row[8] || '',
        Deathplace: row[9] || '',
        DeathplaceCoords: row[10] || '',
        Mother: row[11] || '',
        Father: row[12] || '',
        Spouse: row[13] || '',
        Divorced: row[14] || '',
        Description: row[15] || '',
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
};
