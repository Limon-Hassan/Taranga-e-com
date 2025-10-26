const Container = ({ children }) => {
  return (
    <div className="computer:max-w-[1200px] mobile:p-[10px] tablet:max-w-[580px] laptop:max-w-[950px] tablet:mx-auto laptop:mx-auto computer:mx-auto ">
      {children}
    </div>
  );
};

export default Container;
