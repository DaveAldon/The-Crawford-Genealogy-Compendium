import { google } from 'googleapis';
import { APIArtifact, APIFamilyTree } from '../types/geneology';
import { getSheetUrl, GoogleSheetIds } from './resources/resources.enum';

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

const queryDataBuilder = async (sheet: GoogleSheetIds, query: string) => {
  const url = getSheetUrl(sheet, query);
  const response = await fetch(url);
  const data = await response.text();
  const parsed = JSON.parse((data.match(/(?<=.*\().*(?=\);)/s) || '')[0]);
  return parsed.table.rows[0] && parsed.table.rows[0].c;
};

const getRowById = async (sheet: GoogleSheetIds, id: string) => {
  try {
    const query = encodeURIComponent(`select * where A = '${id}'`);
    const unparsedResult = await queryDataBuilder(sheet, query);
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
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getArtifactRowById = async (sheet: GoogleSheetIds, id: string) => {
  const result = await getRowById(sheet, id);
  if (result.length === 0) return null;
  const parsedResult: APIArtifact = {
    _id: result[0].v,
    id: result[0].v,
    artifact_id: result[1].v,
    title: result[2].v,
    extension: result[3].v,
  };
  return parsedResult;
};

export const getAllArtifactsByPersonId = async (
  sheet: GoogleSheetIds,
  id: string,
) => {
  const query = encodeURIComponent(`select * where B = '${id}'`);
  const unparsedResult = await queryDataBuilder(sheet, query);
  const result: APIArtifact[] = [];
  if (!unparsedResult) return result;
  unparsedResult.forEach((item: any) => {
    if (item === null) {
      item = { v: '' };
    } else {
      if (item.v === null) {
        item.v = '';
      }
    }
    result.push({
      _id: item[0].v,
      id: item[0].v,
      artifact_id: item[1].v,
      title: item[2].v,
      extension: item[3].v,
    });
  });
  return result;
};

export const getPeopleRowById = async (id: string) => {
  const result = await getRowById(GoogleSheetIds.People, id);
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
    Description: result[15].v,
  };
  return parsedResult;
};
