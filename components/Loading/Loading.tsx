import { Header } from '../Header/Header';

export const Loading = () => {
  return (
    <div className="flex flex-col h-screen justify-between bg-black text-white">
      <Header />
      <span
        className="flex flex-col items-center justify-center"
        style={{ height: 'calc(100% - 60px)' }}>
        <svg
          className="animate-spin h-20 w-20 mr-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      </span>
    </div>
  );
};
