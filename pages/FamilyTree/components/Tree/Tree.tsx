import React from 'react';
import {
  TransformComponent,
  TransformWrapper,
} from '@pronestor/react-zoom-pan-pinch';
import FamilyNode from '../FamilyNode/FamilyNode';
import ReactFamilyTree from '../../../../components/react-family-tree';
import { ExtNode, Node } from '../../../../components/relatives-tree/types';
import styles from './Tree.module.css';
import {
  FallbackResources,
  ResourceTypes,
} from '../../../../lib/resources/resources.enum';
import { getResource } from '../../../../lib/resources/resources';
import { APIArtifact, APIFamilyTree } from '../../../../types/geneology';

const WIDTH = 90;
const HEIGHT = 140;

interface ITree {
  nodes: Node[];
  rootId: string;
  setRootId: (id: string) => void;
  onClickNode: (id: string) => void;
  setPanelState: (state: boolean) => void;
  compendiumData: APIFamilyTree[];
  activeMovies: APIArtifact[];
  activePhotos: APIArtifact[];
  activeArtifacts: APIArtifact[];
}
export const Tree: React.FC<ITree> = props => {
  const {
    nodes,
    rootId,
    setRootId,
    onClickNode,
    compendiumData,
    activeMovies,
    activeArtifacts,
    activePhotos,
  } = props;
  return (
    <TransformWrapper limitToBounds={false} centerOnInit initialScale={1}>
      {({ zoomIn, zoomOut, centerView }) => (
        <div className={styles.wrapper}>
          <div className="tools">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => centerView()}>x</button>
          </div>
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
            <ReactFamilyTree
              nodes={nodes}
              rootId={rootId}
              width={WIDTH}
              height={HEIGHT}
              className={styles.tree}
              renderNode={(node: ExtNode) => {
                const nodeReference = compendiumData.find(
                  item => item.id === node.id,
                );
                const dob = `${nodeReference?.DOB.split('/').pop() || '?'}`;
                const dod = nodeReference?.Death
                  ? ` - ${nodeReference?.Death.split('/').pop()}`
                  : '';

                return (
                  <FamilyNode
                    headerText={`${dob} ${dod}`}
                    onClickNode={onClickNode}
                    key={node.id}
                    node={node}
                    isRoot={node.id === rootId}
                    onSubClick={setRootId}
                    photoSrc={getResource(node.id, ResourceTypes.profile)}
                    fallbackSrc={`${FallbackResources.profile}${node.id}`}
                    name={node.name}
                    compendiumReference={compendiumData.find(
                      item => item.id === node.id,
                    )}
                    hasMovies={activeMovies.some(item => item.id === node.id)}
                    hasPhotos={activePhotos.some(item => item.id === node.id)}
                    hasArtifacts={activeArtifacts.some(
                      item => item.id === node.id,
                    )}
                    style={{
                      width: WIDTH,
                      height: HEIGHT,
                      transform: `translate(${node.left * (WIDTH / 2)}px, ${
                        node.top * (HEIGHT / 2)
                      }px)`,
                    }}
                  />
                );
              }}
            />
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  );
};
