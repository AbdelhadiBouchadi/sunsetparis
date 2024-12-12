'use client';

interface MenuButtonProps {
  onClick: () => void;
}

export const MenuButton = ({ onClick }: MenuButtonProps) => {
  return (
    <button
      className="flex items-center justify-center group transition-transform duration-300 hover:scale-110"
      onClick={onClick}
    >
      <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
        <span className="absolute w-1 h-8 md:h-10 bg-gradient-to-t from-[#FCBB53] dark:from-[#FE9492] via-[#FB65A4] to-[#A67DD2] dark:to-[#0D0DA3] rounded-md z-10 transition-all duration-300 group-hover:h-9 md:group-hover:h-11"></span>
        <span className="absolute h-1 w-8 md:w-10 bg-gradient-to-t from-[#FCBB53] dark:from-[#FE9492] via-[#FB65A4] to-[#A67DD2] dark:to-[#0D0DA3] rounded-md transition-all duration-300 group-hover:w-9 md:group-hover:w-11"></span>
      </div>
    </button>
  );
};
