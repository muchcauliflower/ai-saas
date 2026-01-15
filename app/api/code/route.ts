import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const { userId } = await auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const response = await fetch("http://localhost:11434/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "deepseek-coder",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a helpful, friendly coding assistant.",
                    },
                    ...messages,
                ],
                stream: false,
            }),
        });

    }catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}