import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        // supposedly if this was through an API, there would be a condition here to check for api key
        // The llm is called natively through Ollama
        // if (!configuration.apiKey) {
        //     return new NextResponse("API Key not configured", { status: 500 });
        // }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const response = await fetch("http://localhost:11434/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "qwen3:8b",
                messages: [
                {
                    role: "system",
                    // content: "You are a helpful, friendly assistant.",
                    content: "You are a friendly, but brief assistant. That provides summaries and laymans if required",
                },
                ...messages,
                ],
                stream: false,
            }),
        });

        const data = await response.json();

        return NextResponse.json(data);
    }
    catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}