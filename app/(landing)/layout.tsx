import Navbar from "@/components/navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col" suppressHydrationWarning>
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
