import { Header } from '../Header/Header';

export const Loading = () => {
  return (
    <div className="flex flex-col h-screen justify-between bg-black text-white">
      <Header />
      <span
        className="flex flex-col items-center justify-center"
        style={{ height: 'calc(100% - 60px)' }}>
        <div className="flex items-center justify-center space-x-2">
          <div
            className="spinner-grow inline-block w-12 h-12 bg-current rounded-full opacity-0"
            role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </span>
    </div>
  );
};
