import Image from "next/image";

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="logo" fill src="/logo.svg" />
      </div>
      <p className="text-sm text-muted-foreground">
        Thinking one thought per 5 business days...
      </p>
    </div>
  );
};

export default Loader;
