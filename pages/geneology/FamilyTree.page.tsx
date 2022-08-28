import React, { useState, useEffect, useCallback } from 'react';
import { Node } from '../../components/relatives-tree/types';

import averageTree from '../../components/relatives-tree/samples/average-tree.json';
import couple from '../../components/relatives-tree/samples/couple.json';
import diffParents from '../../components/relatives-tree/samples/diff-parents.json';
import divorcedParents from '../../components/relatives-tree/samples/divorced-parents.json';
import empty from '../../components/relatives-tree/samples/empty.json';
import severalSpouses from '../../components/relatives-tree/samples/several-spouses.json';
import simpleFamily from '../../components/relatives-tree/samples/simple-family.json';
import testTreeN1 from '../../components/relatives-tree/samples/test-tree-n1.json';
import testTreeN2 from '../../components/relatives-tree/samples/test-tree-n2.json';
import crawfordLine from '../../data/crawford-line.json';

import styles from './FamilyTree.module.css';
import { Tree } from '../../components/Tree/Tree';

const DEFAULT_SOURCE = 'crawford-line.json';

type Source = Array<Node>;

const SOURCES: { [key: string]: Source } = {
  'crawford-line.json': crawfordLine as Source,
  /* 'average-tree.json': averageTree as Source,
  'couple.json': couple as Source,
  'diff-parents.json': diffParents as Source,
  'divorced-parents.json': divorcedParents as Source,
  'empty.json': empty as Source,
  'several-spouses.json': severalSpouses as Source,
  'simple-family.json': simpleFamily as Source,
  'test-tree-n1.json': testTreeN1 as Source,
  'test-tree-n2.json': testTreeN2 as Source, */
};

const URL = 'URL (Gist, Paste.bin, ...)';

export default React.memo<{}>(function FamilyTree() {
  const [source, setSource] = useState<string>(DEFAULT_SOURCE);
  const [nodes, setNodes] = useState<Source>([]);
  const [myId, setMyId] = useState<string>('');
  const [rootId, setRootId] = useState<string>('');

  useEffect(() => {
    (async () => {
      let newNodes;
      console.log('loadData', source, URL);
      if (source === URL) {
        const response = await fetch(prompt('Paste the url to load:') || '');

        newNodes = await response.json();
      } else {
        newNodes = SOURCES[source];
      }

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
        <h1 className={styles.title}>FamilyTree demo</h1>

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
});
