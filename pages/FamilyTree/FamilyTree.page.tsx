import React from 'react';
import { Tree } from './components/Tree/Tree';
import { APIFamilyTree, APIArtifact } from '../../types/geneology';
import { useFamilyTree } from './useFamilyTree/useFamilyTree';
import { getSheetData } from '../../lib/googlesheets';
import { defaultAPIFamilyTree } from '../../utils/defaultData';
import { Heights } from '../../styles/constants.enum';
import { DemographicsOverlay } from '../../components/DemographicsOverlay/DemographicsOverlay';
import { Header } from '../../components/Header/Header';
import { getCompendiumJson } from '../../lib/compendiumJson';

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
    <div className="flex flex-col h-screen justify-between bg-[#424549]">
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
      <div
        style={{
          height: Heights.CONTENT,
          position: 'absolute',
          bottom: 0,
          top: 54,
          width: '100%',
        }}>
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

  const moviesData: APIArtifact[] = [];
  const photosData: APIArtifact[] = [];
  const artifactsData: APIArtifact[] = [];
  const artifacts = await getCompendiumJson();

  artifacts.forEach(item => {
    item.resources.forEach(resource => {
      const newItem: APIArtifact = {
        _id: item.guid,
        id: item.guid,
        title: resource.description,
        extension: resource.url,
        artifact_id: '0',
        url: resource.url,
      };
      if (resource.type === 'video') {
        moviesData.push(newItem);
      } else if (resource.type === 'photo') {
        if (!resource.url.includes('profile')) {
          photosData.push(newItem);
        }
      } else {
        artifactsData.push(newItem);
      }
    });
  });

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
