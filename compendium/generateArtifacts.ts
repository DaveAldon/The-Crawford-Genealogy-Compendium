import fs from 'fs';
import { BadFiles, Paths, FileType } from './enums/files.enum';
import sizeOf from 'image-size';
import { getMetaData } from './metadata';
import { MetaData } from '../types/metadata';

export const generateArtifacts = async (): Promise<MetaData[]> => {
  const data: MetaData[] = [];
  const { moviesData, photosData, artifactsData, militaryData } =
    await getMetaData();

  const people = (
    await fs.promises.readdir(
      `./public/${Paths.resources}/${Paths.individuals}`,
    )
  ).filter(file => file !== BadFiles.dsStore);

  for (const person of people) {
    const photosDataForPerson = photosData.filter(photo => photo.id === person);
    const artifactsDataForPerson = artifactsData.filter(
      artifact => artifact.id === person,
    );
    const moviesDataForPerson = moviesData.filter(movie => movie.id === person);
    const militaryDataForPerson = militaryData.find(
      military => military.id === person,
    );

    const personPath = `./public/${Paths.resources}/${Paths.individuals}/${person}`;
    const personFiles = await fs.promises.readdir(personPath);
    const personData: MetaData = {
      guid: person,
      resources: [],
      profile: '',
      military: militaryDataForPerson,
    };
    for (const file of personFiles) {
      if (file.endsWith('.md')) {
        continue;
      }
      if (file.includes('profile')) {
        personData.profile = `/${Paths.fullUrl}/${person}/${file}`;
      }
      if (file.endsWith('.m4v') || file.endsWith('.mp4')) {
        personData.resources.push({
          url: `/${Paths.fullUrl}/${person}/${file}`,
          height: 0,
          width: 0,
          type: FileType.Video,
          description:
            moviesDataForPerson.find(
              movie => movie.artifact_id === file.split('.')[0].slice(-1),
            )?.title || '',
        });
        continue;
      }
      const dimensions = sizeOf(`${personPath}/${file}`);
      if (file.includes('artifact')) {
        personData.resources.push({
          url: `/${Paths.fullUrl}/${person}/${file}`,
          height: dimensions.height || 0,
          width: dimensions.width || 0,
          type: FileType.Artifact,
          description:
            artifactsDataForPerson.find(
              artifact => artifact.artifact_id === file.split('.')[0].slice(-1),
            )?.title || '',
        });
        continue;
      }
      personData.resources.push({
        url: `/${Paths.fullUrl}/${person}/${file}`,
        height: dimensions.height || 0,
        width: dimensions.width || 0,
        type: FileType.Photo,
        description:
          photosDataForPerson.find(
            photo => photo.artifact_id === file.split('.')[0].slice(-1),
          )?.title || '',
      });
    }
    data.push(personData);
  }

  return data;
};
