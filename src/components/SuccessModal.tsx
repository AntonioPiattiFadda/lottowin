const SuccessModal = ({
  children,
  onClose,
}: {
  children: string[] | string;
  onClose: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50  "
      style={{ zIndex: 60 }}
    >
      <div className="bg-green-700 text-white p-6 pr-10 rounded-md relative">
        {children}
        <div
          onClick={onClose}
          className="absolute rounded-[50%] border px-2 top-[10px] right-[10px] cursor-pointer "
        >
          X
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
