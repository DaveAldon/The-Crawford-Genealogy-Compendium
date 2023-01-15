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

export const Table = ({
  data,
  title,
}: {
  data: TableData[];
  title: string;
}) => {
  return (
    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 mb-10 max-w-none lg:max-w-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-600">
          <tr>
            {[title, 'Value'].map((row, index) => (
              <Label key={index} title={row} />
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-600">
          {data.map((row, index) => (
            <tr key={index}>
              <Row value={row.label} />
              <Row value={row.value} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
