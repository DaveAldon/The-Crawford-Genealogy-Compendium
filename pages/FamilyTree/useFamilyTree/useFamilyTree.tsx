import { useCallback, useEffect, useState } from 'react';
import { APIFamilyTree, NormalizedFamilyTree } from '../../../types/genealogy';
import { Node } from '../../../components/relatives-tree/types';
import { getTreeData } from '../../../lib/treeJson';

type Source = Array<Node>;
const DEFAULT_SOURCE = 'crawford-line.json';
const sources: { [key: string]: Source } = {
  'crawford-line.json': {} as Source,
};

export const useFamilyTree = ({ data }: { data: NormalizedFamilyTree[] }) => {
  const [source, setSource] = useState<string>(DEFAULT_SOURCE);
  const [nodes, setNodes] = useState<Source>([]);
  const [myId, setMyId] = useState<string>('');
  const [rootId, setRootId] = useState<string>('');
  const [activeNode, setActiveNode] = useState<string>('');
  const [panelState, setPanelState] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      //let newNodes;
      /* if (source === URL) {
        const response = await fetch(prompt('Paste the url to load:') || '');

        newNodes = await response.json();
      } else {
        newNodes = SOURCES[source];
      } */

      if (data) {
        setNodes([]); // Avoid invalid references to unknown nodes
        setRootId(data[4].id);
        setMyId(data[4].id);
        setNodes(data);
      }
    })();
  }, [data, source]);

  const onResetClick = useCallback(() => setRootId(myId), [myId]);
  const onSetSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSource(event.target.value);
  };

  const onClickNode = (id: string) => {
    /* if (id === activeNode) setPanelState(!panelState);
    else {
      setPanelState(true);
      setActiveNode(id);
    } */
    setPanelState(true);
    setActiveNode(id);
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
    onClickNode,
    panelState,
    setPanelState,
    activeNode,
  };
};
