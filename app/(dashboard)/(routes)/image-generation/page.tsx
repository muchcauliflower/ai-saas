"use client";

// take note: Youtube guide uses retrieves responses through API route.
// The code provided in the video requies the Axios library to make HTTP requests.
// Since this our model is native. We can directly call the model and parse without the need of Axious.
// Axious is installed through: npm install axios
// import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./constants";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { POST } from "@/app/api/conversation/route";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@clerk/nextjs";
import BotAvatar from "@/components/bot-avatar";

const ImagePage = () => {
  const route = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "", amount: "1", resolution: "512x512" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);

      // calling api route
      const response = await fetch("/api/conversation");

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
    } catch (error: any) {
      // TODO: Open pro modal
      console.log(error);
    } finally {
      route.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Image Generation"
        description="Our most advanced Gyrau Model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <FormProvider {...form}>
            <form
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                  rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Who is Ado?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </FormProvider>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label="Generate an Image!" />
          )}
          <div>Images will be rendered here</div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
