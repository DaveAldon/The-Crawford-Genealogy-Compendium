import React from 'react';
import styles from './FamilyTree.module.css';
import { Tree } from './components/Tree/Tree';
//import clientPromise from '../../lib/mongodb';
import { APIFamilyTree, APIArtifact } from '../../types/geneology';
import { useFamilyTree } from './useFamilyTree/useFamilyTree';
import { getArtifactData, getSheetData } from '../../lib/googlesheets';
import { defaultAPIFamilyTree } from '../../utils/defaultData';
import { Heights } from '../../styles/constants.enum';
import { DemographicsOverlay } from '../../components/DemographicsOverlay/DemographicsOverlay';
import { Header } from '../../components/Header/Header';

const FamilyTree = ({
  data,
  movies,
  photos,
  artifacts,
}: {
  data: APIFamilyTree[];
  movies: APIArtifact[];
  photos: APIArtifact[];
  artifacts: APIArtifact[];
}) => {
  const {
    nodes,
    rootId,
    setRootId,
    onClickNode,
    panelState,
    setPanelState,
    activeNode,
    compendiumData,
  } = useFamilyTree({ data });

  return (
    <div className={styles.root}>
      <DemographicsOverlay
        isOpen={panelState}
        activeNode={
          compendiumData.find(item => item.id === activeNode) ||
          defaultAPIFamilyTree
        }
        activeMovies={movies.filter(item => item.id === activeNode)}
        activePhotos={photos.filter(item => item.id === activeNode)}
        activeArtifacts={artifacts.filter(item => item.id === activeNode)}
        setIsOpen={setPanelState}
      />
      <Header />
      <div style={{ height: Heights.CONTENT }}>
        {nodes.length > 0 && (
          <Tree
            compendiumData={compendiumData}
            nodes={nodes}
            rootId={rootId}
            setRootId={setRootId}
            onClickNode={onClickNode}
            setPanelState={setPanelState}
            activeMovies={movies}
            activeArtifacts={artifacts}
            activePhotos={photos}
          />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (_context: any) => {
  const people = await getSheetData();
  const movies = await getArtifactData('Movies');
  const artifacts = await getArtifactData('Artifacts');
  const photos = await getArtifactData('Photos');
  const moviesData: APIArtifact[] = movies;
  const photosData: APIArtifact[] = photos;
  const artifactsData: APIArtifact[] = artifacts;

  // replace undefined with empty string
  const data: APIFamilyTree[] = people.map((item: any) => {
    const newItem = { ...item };
    Object.keys(newItem).forEach(key => {
      if (newItem[key] === undefined) {
        newItem[key] = '';
      }
    });
    return newItem;
  });
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
      movies: JSON.parse(JSON.stringify(moviesData)),
      photos: JSON.parse(JSON.stringify(photosData)),
      artifacts: JSON.parse(JSON.stringify(artifactsData)),
    },
  };
  /* const client = await clientPromise;
  const db = client.db('geneology');
  const collectionData = await db.collection('family_tree').find({}).toArray();
  const data: APIFamilyTree[] = JSON.parse(JSON.stringify(collectionData));
  return {
    props: { data },
  }; */
};

export default FamilyTree;
