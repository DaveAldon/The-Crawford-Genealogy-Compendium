const Row = ({ value }: { value: string | React.ReactNode }) => {
  return <td className="whitespace-nowrap px-4 py-2 text-white">{value}</td>;
};

const Label = ({ title }: { title: string }) => {
  return (
    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-white">
      <div className="flex items-center gap-2">
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-white"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </th>
  );
};

export interface TableData {
  label: string;
  value: string | React.ReactNode;
}

export const MilitaryTable = ({
  data,
  title,
  raw,
}: {
  data: TableData[];
  title: string;
  raw?: boolean;
}) => {
  const columns = raw ? [title] : [title, 'Value'];
  return (
    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 mb-10 max-w-none lg:max-w-1/2">
      <div className="bg-gray-900 border border-gray-800 rounded shadow p-2">
        <div className="flex flex-row items-center">
          <div className="flex-shrink pr-4">
            <div className="rounded p-3 bg-green-600">
              <i className="fa fa-wallet fa-2x foma-fw fa-inverse"></i>
            </div>
          </div>
          <div className="flex-1 text-right md:text-center">
            <h5 className="font-bold uppercase text-gray-400">Total Revenue</h5>
            <h3 className="font-bold text-3xl text-gray-600">
              $3249{' '}
              <span className="text-green-500">
                <i className="fas fa-caret-up"></i>
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
