interface Props {
  title: string;
  height: string | number;
  fontSize: string | number;
}
export const ProfileInfo = (props: Props) => {
  const { title, height, fontSize } = props;
  return (
    <div
      style={{
        height: height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e2124',
      }}>
      <p
        style={{
          fontSize: fontSize,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#fff',
        }}>
        {title}
      </p>
    </div>
  );
};
