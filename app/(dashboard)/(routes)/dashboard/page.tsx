"use client";

import {
  ArrowRight,
  Code,
  FileImage,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

const tool = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image-generation",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video-generation",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
  {
    label: "Image Search",
    icon: FileImage,
    color: "text-yellow-700",
    bgColor: "bg-yellow-700/10",
    href: "/image-search",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Gyaru</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          GyaruGyaru smartest AI - Experience the power of Gyaru
        </p>
        <div>
          <Image
            src="/gyaru.jpg"
            alt="Gyaru"
            width={300}
            height={300}
            className="rounded-lg mx-auto"
          />
        </div>
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {tool.map((tool) => (
            <Card
              onClick={() => router.push(tool.href)}
              key={tool.href}
              className="p-4 border-black/5 flex items-start justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-x-4">
                <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                  <tool.icon className={cn("w-8 h-8", tool.bgColor)} />
                </div>
                <div className="font-semibold">{tool.label}</div>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
