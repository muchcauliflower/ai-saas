import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-40 h-40 sm:w-50 sm:h-50 md:h-60 md:w-60">
          <Image
            src="/board.svg"
            fill
            className="object-contain dark:hidden"
            alt="board"
          />
          <Image
            src="/board_dark.svg"
            fill
            className="object-contain hidden dark:block"
            alt="board"
          />
        </div>
        <div className="relative h-60 w-60 hidden md:block">
          <Image
            src="/notes.svg"
            fill
            className="object-contain dark:hidden"
            alt="notes"
          />
          <Image
            src="/notes_dark.svg"
            fill
            className="object-contain hidden dark:block"
            alt="notes"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
