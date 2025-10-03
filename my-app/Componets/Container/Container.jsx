const Container = ({ children }) => {
  return (
    <div className="computer:max-w-[1200px] mobile:max-w-[310px] tablet:max-w-[520px] laptop:max-w-[950px] mobile:mx-auto tablet:mx-auto laptop:mx-auto computer:mx-auto ">
      {children}
    </div>
  );
};

export default Container;
