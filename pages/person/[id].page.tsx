import React from 'react';
import { getRowById } from '../../lib/googlesheets';
import { APIFamilyTree } from '../../types/geneology';

const Person = (props: APIFamilyTree) => {
  const { id, Firstname } = props;
  return (
    <div>
      <p>Post: {id}</p>
      <p>Post: {Firstname}</p>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const result = getRowById(context.query.id);
  return {
    props: result,
  };
};

export default Person;
