import Image from 'next/image';
import styles from './ProfileCard.module.css';

interface Props {
  imageSrc: string;
  name: string;
  dob: string;
  dod: string;
}
export const ProfileCard = (props: Props) => {
  const { imageSrc, name, dob, dod } = props;
  return (
    <div className={styles.profileCard}>
      <div className={styles.bannerContainer}>
        <div className={styles.imageContainer}>
          <Image
            style={{}}
            src={imageSrc}
            alt="profile"
            height={150}
            width={150}
            className={styles.image}
          />
        </div>
        <div className={styles.topHalf}></div>
        <div className={styles.bottomHalf}></div>
      </div>
    </div>
  );
};
