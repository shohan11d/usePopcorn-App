
function Box({ children }) {
  return (
    <div className="m-2 max-w-[400px]   overflow-scroll h-[800px]   min-w-[400px]  bg-[#303439]    rounded-lg">
      {children}
    </div>
  );
}

export default Box;
