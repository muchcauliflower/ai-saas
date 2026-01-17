import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import Heroes from "./_components/heroes";

const LandingPage = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center gap-y-8 px-6 text-center">
        <Heading />
        <Heroes />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
