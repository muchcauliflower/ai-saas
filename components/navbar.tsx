"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "@/app/(landing)/_components/logo";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6",
        scrolled && "boreder-b shadow-sm",
      )}
    >
      <Logo />
      {/* to disable/comment mobile sidebar until i find something that can i can incorporate it with. Dashboard still works like the usual */}
      {/* <MobileSidebar /> */}
      <div className="flex w-full justify-end">
        <ModeToggle />
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
