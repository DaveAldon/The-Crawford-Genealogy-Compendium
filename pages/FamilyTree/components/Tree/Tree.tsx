import React from 'react';
import {
  TransformComponent,
  TransformWrapper,
} from '@pronestor/react-zoom-pan-pinch';
import FamilyNode from '../FamilyNode/FamilyNode';
import ReactFamilyTree from '../../../../components/react-family-tree';
import {
  ExtNode,
  Gender,
  Node,
} from '../../../../components/relatives-tree/types';
import styles from './Tree.module.css';
import {
  FallbackResources,
  ResourceTypes,
} from '../../../../lib/resources/resources.enum';
import { getResource } from '../../../../lib/resources/resources';
import { NormalizedFamilyTree } from '../../../../types/genealogy';

const WIDTH = 90;
const HEIGHT = 140;

interface ITree {
  nodes: Node[];
  rootId: string;
  setRootId: (id: string) => void;
  onClickNode: (id: string) => void;
  setPanelState: (state: boolean) => void;
  data: NormalizedFamilyTree[];
}
export const Tree: React.FC<ITree> = props => {
  const { nodes, rootId, setRootId, onClickNode, data } = props;

  return (
    <TransformWrapper
      limitToBounds={false}
      centerOnInit
      initialScale={1}
      minScale={0.1}>
      {({ zoomIn, zoomOut, centerView }) => (
        <div className={styles.wrapper}>
          <div className="absolute z-10 left-0 flex flex-col gap-1 ml-1 mt-1">
            <button
              className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded"
              onClick={() => zoomIn()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-zoom-in"
                viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                />
                <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                <path
                  fillRule="evenodd"
                  d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"
                />
              </svg>
            </button>
            <button
              className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded"
              onClick={() => zoomOut()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-zoom-out"
                viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                />
                <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                <path
                  fillRule="evenodd"
                  d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
            <button
              className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded"
              onClick={() => centerView()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-circle"
                viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
          <TransformComponent wrapperStyle={{ width: '100%' }}>
            <ReactFamilyTree
              nodes={nodes}
              rootId={rootId}
              width={WIDTH}
              height={HEIGHT}
              className={styles.tree}
              renderNode={(node: ExtNode) => {
                const nodeReference = data.find(item => item.id === node.id);
                if (nodeReference === undefined) return null;

                const dob = nodeReference?.DOB
                  ? `${nodeReference?.DOB.split('/').pop() || '?'}`
                  : '?';
                const dod = nodeReference?.Death
                  ? ` - ${nodeReference?.Death.split('/').pop()}`
                  : '';

                const photos = nodeReference?.metadata.resources.filter(
                  photos =>
                    photos.type === 'photo' && !photos.url.includes('profile'),
                );
                const movies = nodeReference?.metadata.resources.filter(
                  movies => movies.type === 'video',
                );
                const artifacts = nodeReference?.metadata.resources.filter(
                  artifacts => artifacts.type === 'artifact',
                );

                return (
                  <FamilyNode
                    headerText={`${dob} ${dod}`}
                    onClickNode={onClickNode}
                    key={node.id}
                    node={node}
                    isRoot={node.id === rootId}
                    onSubClick={setRootId}
                    name={node.name.replace(' null', ' ')}
                    person={nodeReference}
                    hasMovies={movies !== undefined && movies.length > 0}
                    hasPhotos={photos !== undefined && photos.length > 0}
                    hasArtifacts={
                      artifacts !== undefined && artifacts.length > 0
                    }
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
