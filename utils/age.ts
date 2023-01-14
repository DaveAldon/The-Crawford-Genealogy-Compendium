import dayjs from 'dayjs';

export const getAge = ({ Death, DOB }: { Death: string; DOB: string }) => {
  const currentDecade = `${dayjs().format('YYYY').slice(0, 3)}0`;
  if (Death) {
    const deathYear = parseInt(
      Death.length === 4 ? Death : Death.split('/')[2],
    );
    const birthYear = parseInt(DOB.length === 4 ? DOB : DOB.split('/')[2]);
    return deathYear - birthYear;
  } else {
    const baseAge = parseInt(currentDecade) - parseInt(DOB.slice(0, -1));
    return `${baseAge - 10}-${baseAge}s`;
  }
};
