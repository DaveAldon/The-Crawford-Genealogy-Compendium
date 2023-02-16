import { APIArtifact } from '../types/googledata';
import { Military } from '../types/metadata';
import { getArtifactData, getMilitaryData } from './lib/googlesheets';

export const getMetaData = async () => {
  const movies = await getArtifactData('Movies');
  const artifacts = await getArtifactData('Artifacts');
  const photos = await getArtifactData('Photos');
  const military = await getMilitaryData();
  const moviesData: APIArtifact[] = movies;
  const photosData: APIArtifact[] = photos;
  const artifactsData: APIArtifact[] = artifacts;
  const militaryData: Military[] = military;
  return { moviesData, photosData, artifactsData, militaryData };
};
