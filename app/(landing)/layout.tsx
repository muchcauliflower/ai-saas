import Navbar from "@/components/navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <main>
        <Navbar />
        {children}
      </main>
    </div>
  );
}
