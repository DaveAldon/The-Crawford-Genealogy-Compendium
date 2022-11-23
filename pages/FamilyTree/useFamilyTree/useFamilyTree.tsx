import { useCallback, useEffect, useState } from 'react';
import crawfordLine from '../../../data/crawford-line.json';
import { APIFamilyTree } from '../../../types/geneology';
import { Node } from '../../../components/relatives-tree/types';
import { getTransformedFamilyTree } from '../../../utils/transformFamilyTree';

type Source = Array<Node>;
const DEFAULT_SOURCE = 'crawford-line.json';
const sources: { [key: string]: Source } = {
  'crawford-line.json': crawfordLine as Source,
};

export const useFamilyTree = ({ data }: { data: APIFamilyTree[] }) => {
  const [source, setSource] = useState<string>(DEFAULT_SOURCE);
  const [nodes, setNodes] = useState<Source>([]);
  const [myId, setMyId] = useState<string>('');
  const [rootId, setRootId] = useState<string>('');

  useEffect(() => {
    (async () => {
      //let newNodes;
      /* if (source === URL) {
        const response = await fetch(prompt('Paste the url to load:') || '');

        newNodes = await response.json();
      } else {
        newNodes = SOURCES[source];
      } */

      const newNodes = getTransformedFamilyTree(data);
      console.log('newNodes', newNodes);
      if (newNodes) {
        setNodes([]); // Avoid invalid references to unknown nodes
        setRootId(newNodes[0].id);
        setMyId(newNodes[0].id);
        setNodes(newNodes);
      }
    })();
  }, [data, source]);

  const onResetClick = useCallback(() => setRootId(myId), [myId]);
  const onSetSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(event.target.value);
  };

  return {
    sources,
    source,
    nodes,
    rootId,
    setRootId,
    myId,
    onResetClick,
    onSetSource,
  };
};
