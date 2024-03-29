import dayjs from 'dayjs';

export default function Date({ dateString }: { dateString: string }) {
  const date = dayjs(dateString);
  return <time dateTime={dateString}>{date.format('LLLL d, yyyy')}</time>;
}
