import React from 'react';
import calcTree from '../relatives-tree';
import { Node, ExtNode } from '../relatives-tree/types';
import Connector from './connector';
import { NormalizedFamilyTree } from '../../types/genealogy';

interface Props {
  nodes: NormalizedFamilyTree[];
  rootId: string;
  width: number;
  height: number;
  placeholders?: boolean;
  className?: string;
  renderNode: (node: ExtNode) => React.ReactNode;
}

export default React.memo<Props>(function ReactFamilyTree(props) {
  const data = calcTree(props.nodes as unknown as Node[], {
    rootId: props.rootId,
    placeholders: props.placeholders,
  });

  const width = props.width / 2;
  const height = props.height / 2;

  return (
    <div
      className={props.className}
      style={{
        position: 'relative',
        width: data.canvas.width * width,
        height: `calc(100vh - 54px)`,
      }}>
      {data.connectors.map((connector, idx) => (
        <Connector
          key={idx}
          connector={connector}
          width={width}
          height={height}
        />
      ))}
      {data.nodes.map(props.renderNode)}
    </div>
  );
});
