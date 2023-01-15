import { APIFamilyTree } from '../../types/geneology';

const indigo500 = 'rgb(67 56 202 / var(--tw-text-opacity))';
const indigo100 = 'rgb(239 246 255 / var(--tw-text-opacity))';
const cyan500 = '#06b6d4';
const cyan100 = '#cffafe';
const fuchsia500 = '#d946ef';
const fuchsia100 = '#fae8ff';

export const FamilyLinkButton = ({
  person,
  updatePerson,
}: {
  person: APIFamilyTree;
  updatePerson: (id: string) => void;
}) => {
  let backgroundColor = person.Gender === 'M' ? cyan100 : fuchsia100;
  let color = person.Gender === 'M' ? cyan500 : fuchsia500;
  return (
    <a
      style={{
        cursor: 'pointer',
      }}
      onClick={() => updatePerson(person.id)}>
      <strong
        style={{
          color,
          backgroundColor,
        }}
        className="rounded px-3 py-1.5 text-xs font-medium flex flex-row items-center justify-between">
        {`${person.Firstname} ${person.Middlename} ${person.Lastname}`}{' '}
        <svg className="svg-icon" viewBox="0 0 20 20" width={18} height={18}>
          <path
            style={{
              color,
            }}
            className="fill-current"
            d="M1.729,9.212h14.656l-4.184-4.184c-0.307-0.306-0.307-0.801,0-1.107c0.305-0.306,0.801-0.306,1.106,0
	l5.481,5.482c0.018,0.014,0.037,0.019,0.053,0.034c0.181,0.181,0.242,0.425,0.209,0.66c-0.004,0.038-0.012,0.071-0.021,0.109
	c-0.028,0.098-0.075,0.188-0.143,0.271c-0.021,0.026-0.021,0.061-0.045,0.085c-0.015,0.016-0.034,0.02-0.051,0.033l-5.483,5.483
	c-0.306,0.307-0.802,0.307-1.106,0c-0.307-0.305-0.307-0.801,0-1.105l4.184-4.185H1.729c-0.436,0-0.788-0.353-0.788-0.788
	S1.293,9.212,1.729,9.212z"></path>
        </svg>
      </strong>
    </a>
  );
};
