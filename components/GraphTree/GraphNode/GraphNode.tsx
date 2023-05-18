import React from 'react';
import classNames from 'classnames';
import styles from './FamilyNode.module.css';
import { ProfilePhoto } from './components/ProfilePhoto/ProfilePhoto';
import { ProfileInfo } from './components/ProfileInfo/ProfileInfo';
import { ProfileChips } from './components/ProfileChips/ProfileChips';
import { Handle, NodeProps, Position } from 'reactflow';
import { NormalizedFamilyTree } from '../../../types/genealogy';

const EnterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="black"
    className="bi bi-plus-circle-fill"
    viewBox="3 3 10.5 11">
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
  </svg>
);

export default React.memo(function GraphNode(
  data: NodeProps<NormalizedFamilyTree>,
) {
  if (!data.data || !data.data.metadata) return null;
  const { data: node } = data;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}>
        <ProfileInfo height={'12%'} title={`${node.DOB}`} fontSize={'.50rem'} />
        <ProfilePhoto
          src={node.metadata.profile[0].link}
          alt={node.Firstname}
        />
        <ProfileInfo
          height={'22%'}
          title={`${node.Firstname} ${node.Middlename} ${node.Lastname}`}
          fontSize={'.40rem'}
        />
        {node ? (
          <ProfileChips
            hasMovies={node.metadata.videos.length > 0}
            hasPhotos={node.metadata.photos.length > 0}
            hasMilitary={node.military !== undefined}
            height={'10%'}
          />
        ) : null}
      </div>

      <Handle type="target" id="tt" position={Position.Top} />
      <Handle type="source" id="bs" position={Position.Bottom} />
    </div>
  );
});
