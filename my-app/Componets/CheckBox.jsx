const CheckBox = ({ label, checked, className, onChange }) => {
  return (
    <>
      <label className="flex items-center space-x-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="hidden"
        />
        <div
          className={`${className} w-5 h-5 flex items-center justify-center border-2 rounded ${
            checked ? 'bg-[#f1a31c] border-[#f1a31c]' : 'border-[#f1a31c]/50'
          }`}
        >
          {checked && (
            <>
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </>
          )}
        </div>
        <span
          className={` ${className} mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito font-bold text-[#000] leading-6`}
        >
          {label}
        </span>
      </label>
    </>
  );
};

export default CheckBox;
