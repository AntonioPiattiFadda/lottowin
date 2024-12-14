const ShareInformationCard = () => {
  return (
    <div className="w-[767px] max-w-[90vw]   p-10 bg-[#040F1A] rounded-[20px] flex flex-col items-center justify-center gap-6">
      <span className="text-[white] lg:text-[26px] text-[18px]  border-b-[2px] text-center">
        Earn USDT by sharing LottoWin
      </span>
      <span className="text-[white] lg:text-[18px] text-[15px] text-center ">
        Post your unique tracker in your socials, in your Discord and send it to
        anyone with a passion for NFTs with a little explanation of LottoWin.
      </span>
      <span className="text-[white] lg:text-[18px] text-[16px] text-center ">
        You will receive a reward of{' '}
        <span className="text-[#10AC03]">10 USDT</span> for each purchase of 1
        NFT in <span className="text-[#FFE600]">BIG PRIZES</span> competitions
        made by your friend.
      </span>
    </div>
  );
};

export default ShareInformationCard;
