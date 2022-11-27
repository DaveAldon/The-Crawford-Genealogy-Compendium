import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './FamilyNode.module.css';
import { ExtNode } from '../../../../components/relatives-tree/types';
import { getResource } from '../../../../lib/resources/resources';
import { ResourceTypes } from '../../../../lib/resources/resources.enum';
import { useImageFallback } from '../../../../hooks/useImageFallback/useImageFallback';
import Image from 'next/image';

interface Props {
  node: ExtNode;
  isRoot: boolean;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  photoSrc?: string;
  fallbackSrc: string;
  name?: string;
  onClickNode: (id: string) => void;
}

export default React.memo<Props>(function FamilyNode({
  node,
  isRoot,
  onSubClick,
  style,
  children,
  photoSrc,
  fallbackSrc,
  name,
  onClickNode,
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
          }}>
          <div style={{ height: '75%', position: 'relative' }}>
            <Image alt="" fill sizes="100vw" src={imageSrc} onError={onError} />
          </div>
          <p
            style={{
              fontSize: '.3rem',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {name}
          </p>
          {children}
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
