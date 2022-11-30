import React from 'react';
import classNames from 'classnames';
import styles from './FamilyNode.module.css';
import { ExtNode } from '../../../../components/relatives-tree/types';
import { useImageFallback } from '../../../../hooks/useImageFallback/useImageFallback';
import { ProfilePhoto } from './components/ProfilePhoto/ProfilePhoto';
import { ProfileInfo } from './components/ProfileInfo/ProfileInfo';

interface Props {
  node: ExtNode;
  isRoot: boolean;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
  photoSrc?: string;
  fallbackSrc: string;
  name?: string;
  onClickNode: (id: string) => void;
  headerText: string;
}

export default React.memo<Props>(function FamilyNode({
  node,
  isRoot,
  onSubClick,
  style,
  photoSrc,
  fallbackSrc,
  name,
  onClickNode,
  headerText,
}) {
  const { imageSrc, onError } = useImageFallback({ photoSrc, fallbackSrc });

  return (
    <div className={styles.root} style={style} title={node.id}>
      <div
        id={node.id}
        onClick={() => {
          onClickNode(node.id);
        }}
        className={classNames(
          styles.inner,
          styles[node.gender],
          isRoot && styles.isRoot,
        )}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}>
          <ProfileInfo height={'15%'} title={headerText} fontSize={'.50rem'} />
          <ProfilePhoto src={imageSrc} onError={onError} alt={name} />
          <ProfileInfo height={'25%'} title={name || ''} fontSize={'.40rem'} />
        </div>
      </div>
      {node.hasSubTree && (
        <div
          className={classNames(styles.sub, styles[node.gender])}
          onClick={() => onSubClick(node.id)}
        />
      )}
    </div>
  );
});
