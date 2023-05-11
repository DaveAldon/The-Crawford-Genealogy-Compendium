import { google, drive_v3 } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

export const getEmbedLink = (fileId: string) => {
  if (fileId === '') return '';
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

export const getDriveData = async (): Promise<drive_v3.Schema$File[]> => {
  try {
    const target = ['https://www.googleapis.com/auth/drive'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
      '',
      (process.env.GOOGLE_DRIVE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target,
    );

    const service = google.drive({ version: 'v3', auth: jwt });
    /* const res = await service.files.list({
      pageSize: 1000,
      fields:
        'nextPageToken, files(id, name, parents, thumbnailLink, mimeType, description)',
    }); */

    const generateRequest = async (nextPageToken: string | undefined) => {
      const res = await service.files.list({
        pageToken: nextPageToken,
        pageSize: 1000,
        fields:
          'nextPageToken, files(id, name, parents, thumbnailLink, mimeType, description)',
      });
      return res;
    };

    const data = [];
    let token = undefined;

    do {
      const req = await generateRequest(token);

      data.push(req.data.files);
      token = req.data.nextPageToken;
    } while (token);

    const files = data.flat();

    return files as drive_v3.Schema$File[];
    /* if (files) {
      if (files.length === 0) {
        console.log('No files found.');
      } else {
        console.log('Files:');
        for (const file of files) {
          console.log(`${JSON.stringify(file)}`);
        }
      }
    } */
  } catch (err) {
    console.log(err);
  }
  return [];
};

// https://drive.google.com/file/d/1GEpaPzRaTIxS6bQgOwpsQ4B365B6xtEw/view?usp=share_link

// https://drive.google.com/uc?export=view&id=1GEpaPzRaTIxS6bQgOwpsQ4B365B6xtEw
