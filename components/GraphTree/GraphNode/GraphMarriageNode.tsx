import React from 'react';
import { ProfilePhoto } from './components/ProfilePhoto/ProfilePhoto';
import { Handle, NodeProps, Position } from 'reactflow';
import { NormalizedFamilyTree } from '../../../types/genealogy';

export default React.memo(function GraphMarriageNode(
  data: NodeProps<NormalizedFamilyTree>,
) {
  if (!data.data || !data.data.metadata) return null;
  const { data: node } = data;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}>
      <ProfilePhoto src={node.metadata.profile[0].link} alt={node.Firstname} />
      <Handle type="target" id="tt" position={Position.Top} hidden />
      <Handle type="source" id="bs" position={Position.Bottom} hidden />
    </div>
  );
});
