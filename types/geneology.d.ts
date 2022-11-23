export interface APIFamilyTree {
  _id: string;
  id: string;
  Firstname: string;
  Middlename: string;
  Lastname: string;
  Gender: string;
  DOB: string;
  Death: string;
  Mother: string;
  Father: string;
  Spouse: string;
}

export interface TransformedFamilyTree {
  id: string;
  name: string;
  gender: Gender;
  parents: Relation[];
  children: Relation[];
  siblings: Relation[];
  spouses: Relation[];
  placeholder?: boolean;
};