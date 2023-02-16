import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();
export const getArtifactData = async (sheetName: 'Movies' | 'Artifacts' | 'Photos') => {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      '',
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: sheetName,
    });

    const rows = response.data.values;
    if (rows && rows.length) {
      return rows.slice(1).map((row: any[]) => ({
        _id: row[0],
        id: row[0],
        artifact_id: row[1],
        title: row[2],
        extension: row[3],
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
};

export const getMilitaryData = async () => {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      '',
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
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

export const getPeopleData = async () => {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      '',
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
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
        Firstname: row[1] || null,
        Middlename: row[2] || null,
        Lastname: row[3] || null,
        Gender: row[4] || null,
        DOB: row[5] || null,
        Birthplace: row[6] || null,
        BirthplaceCoords: row[7] || null,
        Death: row[8] || null,
        Deathplace: row[9] || null,
        DeathplaceCoords: row[10] || null,
        Mother: row[11] || null,
        Father: row[12] || null,
        Spouse: row[13] || null,
        Divorced: row[14] || null,
        Description: row[15] || null,
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
};
