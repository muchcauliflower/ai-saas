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
import React from "react";
import { POST } from "@/app/api/conversation/route";

const ConversationPage = () => {
  const route = useRouter();
  // If messages are from an API eg. OpenAI. The openAI libraru has a <ChatCompletionRequestMessage> method to handle the message
  // Basically the method returns the same values of { role: string; content: string }
  const [messages, setMessages] = React.useState<
    Array<{ role: string; content: string }>
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: { role: string; content: string } = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      // calling api route
      const response = await fetch("/api/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message.content },
      ]);
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
        title="Conversation"
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
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div key={message.content}>{message.content}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
