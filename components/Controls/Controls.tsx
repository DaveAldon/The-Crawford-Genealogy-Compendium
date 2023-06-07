import { getBlurStyle } from '../../styles/specialEffects';
import { NormalizedFamilyTree } from '../../types/genealogy';
import { SearchPeople } from '../SearchResults/SearchPeople';
import { SearchFamilies } from '../SearchResults/SearchFamilies';
import { families } from '../../compendium/lib/families';
import { Node } from 'reactflow';

interface ControlProps {
  selectedFamily: string;
  setSelectedFamily: (family: string) => void;
  peopleData: Node[];
  person: Node | null;
  setPerson: (people: Node | null) => void;
}
export const Controls = (props: ControlProps) => {
  //const personName = `${props.person.data.Firstname} ${props.person.data.Middlename} ${props.person.data.Lastname}`;
  return (
    <div
      className="flex flex-row gap-4 w-full bg-gray-800 px-2 py-2 pr-12 justify-center items-center text-white"
      style={getBlurStyle()}>
      <SearchPeople
        person={props.person}
        setPerson={props.setPerson}
        peopleData={props.peopleData}
      />
      <SearchFamilies {...props} />
      <div className="w-full text-white"></div>
    </div>
  );
};
