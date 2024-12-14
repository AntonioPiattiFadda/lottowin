const Footer = () => {
  return (
    <div className="bg-[black]">
      <div className="py-10 md:hidden">
        <ul className="flex flex-col items-center">
          <li className="text-[23px] text-[white] ">Term and conditions</li>
          <li className="text-[23px] text-[white] ">Cookie Policy</li>
          <li className="text-[23px] text-[white] ">Privacy Policy</li>
        </ul>
      </div>

      <div>
        <ul className="flex flex-col items-center sm:h-[107px] sm:justify-center sm:items-start sm:px-10 sm:bg-[#040F1A] sm:rounded-[30px]">
          <li className="text-[23px] text-[white] sm:text-[25px]">
            Copyright 2023{' '}
          </li>
          <li className="text-[23px] text-[white]  py-[80px] md:hidden">
            LottoWin Logo
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
