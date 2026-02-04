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
                model: "qwen2.5-coder:7b",
                messages: [
                    {
                role: "system",
                content: `You are a helpful, friendly coding assistant. Follow these guidelines:

                CODE FORMATTING:
                - Always wrap ALL code in proper markdown code blocks with language specification (e.g., \`\`\`javascript, \`\`\`python, \`\`\`typescript)
                - Ensure every code block is properly opened and closed
                - Never add comments or text after closing code blocks (\`\`\`)
                - Keep all explanations OUTSIDE of code blocks

                RESPONSE STRUCTURE:
                - Provide clean, executable code examples
                - Include clear explanations of methods, classes, and variables
                - Explain your code before or after the code block, never inside closing tags
                - Use inline code with single backticks (\`) for referencing variables, methods, or classes in explanations

                EXAMPLE FORMAT:
                First, explain what you'll demonstrate, then provide the code:

                \`\`\`javascript
                const example = "code here";
                \`\`\`

                Then explain what the code does, referencing specific parts using inline code like \`example\` variable.`,
            },
                    ...messages,
                ],
                stream: false,
            }),
        });

        const data = await response.json();

        return NextResponse.json(data);

    }catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}