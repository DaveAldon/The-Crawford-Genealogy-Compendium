import { google } from 'googleapis';
import { APIFamilyTree } from '../types/geneology';

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
        extension: row[3],
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

export const queryDataBuilder = async (query: string) => {
  const url = `https://docs.google.com/a/google.com/spreadsheets/d/${process.env.SPREADSHEET_ID}/gviz/tq?tq=${query}`;
  const response = await fetch(url);
  const data = await response.text();
  const parsed = JSON.parse((data.match(/(?<=.*\().*(?=\);)/s) || '')[0]);
  return parsed.table.rows[0] && parsed.table.rows[0].c;
};

export const getRowById = async (id: string) => {
  const query = encodeURIComponent(`select * where A = '${id}'`);
  const unparsedResult = await queryDataBuilder(query);
  const result: any[] = [];
  unparsedResult.forEach((item: any) => {
    if (item === null) {
      item = { v: '' };
    } else {
      if (item.v === null) {
        item.v = '';
      }
    }
    result.push(item);
  });
  const parsedResult: APIFamilyTree = {
    _id: result[0].v,
    id: result[0].v,
    Firstname: result[1].v,
    Middlename: result[2].v,
    Lastname: result[3].v,
    Gender: result[4].v,
    DOB: result[5].v,
    Birthplace: result[6].v,
    BirthplaceCoords: result[7].v,
    Death: result[8].v,
    Deathplace: result[9].v,
    DeathplaceCoords: result[10].v,
    Mother: result[11].v,
    Father: result[12].v,
    Spouse: result[13].v,
    Divorced: result[14].v,
  };
  return parsedResult;
};
