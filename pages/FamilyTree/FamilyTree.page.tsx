import React from 'react';
import styles from './FamilyTree.module.css';
import { Tree } from './components/Tree/Tree';
//import clientPromise from '../../lib/mongodb';
import { APIFamilyTree } from '../../types/geneology';
import { useFamilyTree } from './useFamilyTree/useFamilyTree';
import { getSheetData } from '../../lib/googlesheets';
import { SlidingPane } from './components/SlidingPane/SlidingPane';
import { defaultAPIFamilyTree } from '../../utils/defaultData';

const FamilyTree = ({ data }: { data: APIFamilyTree[] }) => {
  const {
    sources,
    source,
    nodes,
    rootId,
    setRootId,
    onSetSource,
    onClickNode,
    panelState,
    setPanelState,
    activeNode,
    compendiumData,
  } = useFamilyTree({ data });

  return (
    <div className={styles.root}>
      <SlidingPane
        isOpen={panelState}
        activeNode={
          compendiumData.find(item => item.id === activeNode) ||
          defaultAPIFamilyTree
        }
        setPanelState={setPanelState}
      />
      <header className={styles.header}>
        <h1 className={styles.title}>FamilyTree</h1>
        <div>
          <span>Source: </span>
          <select onChange={onSetSource} defaultValue={source}>
            {Object.keys(sources).map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <a href="https://github.com/SanichKotikov/react-family-tree-example">
          GitHub
        </a>
      </header>
      {nodes.length > 0 && (
        <Tree
          nodes={nodes}
          rootId={rootId}
          setRootId={setRootId}
          onClickNode={onClickNode}
          setPanelState={setPanelState}
        />
      )}
    </div>
  );
};

export const getServerSideProps = async (_context: any) => {
  const sheet = await getSheetData();
  // replace undefined with empty string
  const data: APIFamilyTree[] = sheet.map((item: any) => {
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
