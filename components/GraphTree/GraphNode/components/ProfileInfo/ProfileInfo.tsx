interface Props {
  title: string;
  height: string | number;
  fontSize: string | number;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}
export const ProfileInfo = (props: Props) => {
  const { title, height, fontSize, style, textStyle } = props;
  return (
    <div
      style={{
        height: height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e2124',
        ...style,
      }}>
      <p
        style={{
          fontSize: fontSize,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#fff',
          ...textStyle,
        }}>
        {title}
      </p>
    </div>
  );
};
