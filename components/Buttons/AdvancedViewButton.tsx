export const AdvancedViewButton = ({
  guid,
  text,
}: {
  guid: string;
  text?: string;
}) => (
  <a
    className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
    href={`/person/${guid}`}
    target="_blank"
    rel="noreferrer">
    <span className="rounded-md absolute inset-0 border border-indigo-500 group-active:border-indigo-500"></span>
    <span className="rounded-md block border border-indigo-500 bg-indigo-500 px-12 py-3 transition-transform active:border-indigo-500 active:bg-indigo-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
      {text || 'Show more details'}
    </span>
  </a>
);
