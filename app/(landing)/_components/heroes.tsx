import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-50 h-50 sm:w-87.5 sm:h-62.5 md:h-75 md:w-75">
          <Image src="/board.svg" fill className="object-contain" alt="board" />
        </div>
        <div className="relative h-75 w-75 hidden md:block">
          <Image src="/notes.svg" fill className="object-contain" alt="notes" />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
