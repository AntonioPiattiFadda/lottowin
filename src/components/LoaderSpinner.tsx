export const ButtonSpinner = () => {
  return (
    <button className=" relative flex items-center justify-center bg-[#0085FF] rounded-[20px] text-[white] text-[23px] px-7 w-[90%]">
      <div className="loader border-t-transparent border-white border-2 w-4 h-4 rounded-full animate-spin mr-2"></div>
      Loading...
    </button>
  );
};

export const PageSpinner = () => {
  return (
    <div className="min-h-[82vh] flex items-center justify-center bg-[black]">
      <div className="flex flex-col items-center justify-center">
        <div className="loader border-t-transparent border-[#42ff00] border-4 w-16 h-16 rounded-full animate-spin"></div>
        <p className="text-white text-[23px] mt-4">Loading...</p>
      </div>
    </div>
  );
};

export const DatabaseSpinner = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center "
      style={{
        zIndex: 9999,
      }}
    >
      <div className="loader border-t-transparent border-white border-2 w-4 h-4 rounded-full animate-spin"></div>
    </div>
  );
};
