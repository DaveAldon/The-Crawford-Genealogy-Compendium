import { Artifact, ArtifactType, Artifacts } from '../types/artifacts.d';
import { getDriveData, getEmbedLink } from './lib/googleDrive';

export const getArtifacts = async (): Promise<Artifacts[]> => {
  const artifactsRaw = await getDriveData();
  const artifacts: Artifacts[] = [];

  if (artifactsRaw) {
    const genealogyFolder = artifactsRaw.find(
      folder => folder.name === 'Genealogy',
    );
    const peopleFolder =
      genealogyFolder &&
      artifactsRaw.find(
        folder =>
          folder.parents &&
          folder.parents[0] === genealogyFolder.id &&
          folder.name === 'people',
      );

    const guidFolders =
      peopleFolder &&
      artifactsRaw.filter(
        folder => folder.parents && folder.parents[0] === peopleFolder.id,
      );

    // get all folders inside a person's guid folder
    guidFolders?.forEach(guidFolder => {
      const person: Artifacts = { ownerId: guidFolder.name } as Artifacts;

      const demographicFolders = artifactsRaw.filter(
        folder => folder.parents && folder.parents[0] === guidFolder.id,
      );
      // get all files inside a demographic folder
      demographicFolders?.forEach(demographicFolder => {
        if (
          Object.values(ArtifactType).includes(
            demographicFolder.name as ArtifactType,
          )
        ) {
          const artifactFiles: Artifact[] = [];
          const files = artifactsRaw.filter(
            file => file.parents && file.parents[0] === demographicFolder.id,
          );
          // organize each file into an Artifact object
          files?.forEach(file => {
            artifactFiles.push({
              mimeType: file.mimeType || '',
              thumbnailLink: file.thumbnailLink || '',
              link: getEmbedLink(file.id || ''),
              name: file.name || '',
              id: file.id || '',
              description: file.description || '',
              imageMediaMetadata: file.imageMediaMetadata || '',
            });
          });
          person[demographicFolder.name as ArtifactType] = artifactFiles;
        }
      });
      artifacts.push(person);
    });
  }
  return artifacts;
};
