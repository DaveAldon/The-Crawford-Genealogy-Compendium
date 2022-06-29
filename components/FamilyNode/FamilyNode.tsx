import React from 'react';
import classNames from 'classnames';
import styles from './FamilyNode.module.css';
import { ExtNode } from '../relatives-tree/types';

interface Props {
  node: ExtNode;
  isRoot: boolean;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  photoSrc?: string;
  name?: string;
}

export default React.memo<Props>(function FamilyNode({
  node,
  isRoot,
  onSubClick,
  style,
  children,
  photoSrc,
  name,
}) {
  return (
    <div className={styles.root} style={style} title={node.id}>
      <div
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
          <img height={'75%'} src={photoSrc} />
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
