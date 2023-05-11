import React from 'react';
import classNames from 'classnames';
import styles from './FamilyNode.module.css';
import { ExtNode } from '../../../../components/relatives-tree/types';
import { ProfilePhoto } from './components/ProfilePhoto/ProfilePhoto';
import { ProfileInfo } from './components/ProfileInfo/ProfileInfo';
import { ProfileChips } from './components/ProfileChips/ProfileChips';
import { NormalizedFamilyTree } from '../../../../types/genealogy';

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

interface Props {
  node: ExtNode;
  isRoot: boolean;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
  name?: string;
  onClickNode: (id: string) => void;
  headerText: string;
  person: NormalizedFamilyTree;
  hasMovies: boolean;
  hasPhotos: boolean;
  hasMilitary: boolean;
}

export default React.memo<Props>(function FamilyNode({
  node,
  isRoot,
  onSubClick,
  style,
  name,
  onClickNode,
  headerText,
  person,
  hasMovies,
  hasPhotos,
  hasMilitary,
}) {
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
          <ProfileInfo height={'12%'} title={headerText} fontSize={'.50rem'} />
          <ProfilePhoto
            src={person.metadata.profile[0].thumbnailLink}
            alt={name}
          />
          <ProfileInfo height={'22%'} title={name || ''} fontSize={'.40rem'} />
          {person ? (
            <ProfileChips
              hasMovies={hasMovies}
              hasPhotos={hasPhotos}
              hasMilitary={hasMilitary}
              height={'10%'}
            />
          ) : null}
        </div>
      </div>
      {node.hasSubTree && (
        <div
          className={classNames(styles.sub, styles[node.gender])}
          onClick={() => onSubClick(node.id)}>
          <EnterIcon />
        </div>
      )}
    </div>
  );
});
