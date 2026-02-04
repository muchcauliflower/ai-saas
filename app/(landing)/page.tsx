import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import Heroes from "./_components/heroes";

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <section
        className="
          flex
          flex-col
          items-center
          justify-center
          gap-y-5
          sm:gap-y-6
          px-6
          text-center
          min-h-[70vh]
          sm:min-h-[75vh]
          lg:min-h-[82.75vh]
        "
      >
        <Heading />
        <Heroes />
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
