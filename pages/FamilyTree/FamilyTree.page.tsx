import React, { useState, useEffect, useCallback } from 'react';
import { Gender, Node, RelType } from '../../components/relatives-tree/types';
import crawfordLine from '../../data/crawford-line.json';

import styles from './FamilyTree.module.css';
import { Tree } from '../../components/Tree/Tree';
import geneology from '../api/geneology.api';
import clientPromise from '../../lib/mongodb';

const DEFAULT_SOURCE = 'crawford-line.json';

type Source = Array<Node>;

const SOURCES: { [key: string]: Source } = {
  'crawford-line.json': crawfordLine as Source,
};

const URL = 'URL (Gist, Paste.bin, ...)';

const FamilyTree = ({ data }: { data: APIFamilyTree[] }) => {
  const [source, setSource] = useState<string>(DEFAULT_SOURCE);
  const [nodes, setNodes] = useState<Source>([]);
  const [myId, setMyId] = useState<string>('');
  const [rootId, setRootId] = useState<string>('');

  const getData = () => {
    const newNodes = data.map(person => {
      const parents = [];
      if (person.Father)
        parents.push({ id: person.Father, relType: RelType.blood });
      if (person.Mother)
        parents.push({ id: person.Mother, relType: RelType.blood });
      return {
        id: person.id,
        name: `${person.Firstname} ${person.Middlename} ${person.Lastname}`,
        gender: person.Gender === 'M' ? Gender.male : Gender.female,
        parents,
        siblings: [],
        spouses: [],
        children: [],
      };
    });
    newNodes.forEach(person => {
      // spouses
      person.spouses = data
        .filter(p => p.Spouse === person.id)
        .map(p => ({ id: p.id, relType: RelType.married }));

      person.parents.forEach(parent => {
        const parentPerson = newNodes.find(p => p.id === parent.id);
        if (parentPerson) {
          // children
          parentPerson.children.push({
            id: person.id,
            relType: RelType.blood,
          });
          // siblings
          parentPerson.children.forEach(child => {
            if (child.id !== person.id) {
              person.siblings.push({
                id: child.id,
                relType: RelType.blood,
              });
            }
          });
        }
      });
    });

    return JSON.parse(JSON.stringify(newNodes));
  };

  useEffect(() => {
    (async () => {
      //let newNodes;
      console.log('loadData', source, URL);
      /* if (source === URL) {
        const response = await fetch(prompt('Paste the url to load:') || '');

        newNodes = await response.json();
      } else {
        newNodes = SOURCES[source];
      } */

      const newNodes = getData();
      console.log('newNodes', newNodes);
      if (newNodes) {
        setNodes([]); // Avoid invalid references to unknown nodes
        setRootId(newNodes[0].id);
        setMyId(newNodes[0].id);
        setNodes(newNodes);
      }
    })();
  }, [source]);

  const onResetClick = useCallback(() => setRootId(myId), [myId]);
  const onSetSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(event.target.value);
  };

  const sources = {
    ...SOURCES,
    [URL]: [],
  };

  return (
    <div className={styles.root}>
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
        <Tree nodes={nodes} rootId={rootId} setRootId={setRootId} />
      )}
      {/* {rootId !== myId && (
        <div className={styles.reset} onClick={onResetClick}>
          Reset
        </div>
      )} */}
    </div>
  );
};

export interface APIFamilyTree {
  _id: string;
  id: string;
  Firstname: string;
  Middlename: string;
  Lastname: string;
  Gender: string;
  DOB: string;
  Death: string;
  Mother: string;
  Father: string;
  Spouse: string;
}

export async function getServerSideProps(_context: any) {
  const client = await clientPromise;

  const db = client.db('geneology');

  const collectionData = await db.collection('family_tree').find({}).toArray();
  const data: APIFamilyTree[] = JSON.parse(JSON.stringify(collectionData));

  return {
    props: { data },
  };
}

export default FamilyTree;
