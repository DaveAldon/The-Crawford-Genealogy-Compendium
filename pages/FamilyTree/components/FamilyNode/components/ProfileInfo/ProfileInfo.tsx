interface Props {
  name: string;
}
export const ProfileInfo = (props: Props) => {
  const { name } = props;
  return (
    <div
      style={{
        height: '35%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 5,
        paddingLeft: 5,
        backgroundColor: '#fff',
      }}>
      <p
        style={{
          fontSize: '.37rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#000',
          lineHeight: 1.3,
        }}>
        {name}
      </p>
    </div>
  );
};
