"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

const DocumentsPage = () => {
  const { user } = useUser();

  return (
    <div className="h-full">
      <div className="flex justify-end p-4">
        <ModeToggle />
      </div>
      <div className="h-full flex flex-col items-center justify-center space-y-4 -mt-17.5">
        <Image
          src="/document-empty.svg"
          height="300"
          width="300"
          alt="Empty"
          className="dark:hidden"
        />
        <Image
          src="/document-empty-dark.svg"
          height="300"
          width="300"
          alt="Empty"
          className="hidden dark:block"
        />
        <h2 className="text-lg font-medium">
          Welcome to {user?.firstName}&apos;s Documents Page!
        </h2>
        <Button>
          <PlusCircle className="h-2 w-4 mr-2" />
          Create a note
        </Button>
      </div>
    </div>
  );
};
export default DocumentsPage;
