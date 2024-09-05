
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect, useMemo, useCallback } from "react"
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm"
import { useAuth } from "@/providers/authProvider";

interface Message {
  content: string;
  role: "user" | "assistant";
}

enum Flavour {
  IKIGAI = "ikigai",
}

export function Chat() {
  const [chatId, setChatId] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  const getAIResponse = useCallback(async (messages: Message[]) => {
    setLoading(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_CONSOLE_API_URL}/ikigai/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-id': userId || '',
      },
      body: JSON.stringify({
        chat_id: chatId,
        model: "gpt-4o",
        messages: messages,
        flavour: Flavour.IKIGAI,
      }),
    });

    const data = await response.json();

    messages.push({ content: data.content, role: "assistant" });
    setMessages(messages);

    setLoading(false);
  }, [chatId, userId]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userInput) {
      return;
    }

    let newMessages = messages;
    newMessages.push({ content: userInput, role: "user" });
    setMessages(newMessages);
    setUserInput("");

    await getAIResponse(newMessages);
  }, [messages, userInput, getAIResponse]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  useEffect(() => {
    if (!chatId) {
      setChatId(uuidv4());
    }

    if (chatId) {
      setMessages([
        {
          role: "assistant",
          content: `## Ikigai
----
A Japanese concept meaning **"reason for being."** It combines four elements:

1. ### What you love
2. ### What the world needs
3. ### What you're good at
4. ### What you can be paid for

Ikigai is found at the intersection of these elements, representing a balance of passion, mission, profession, and vocation.

**I'm here to help you find yours!** Ready?`
        }
      ]);
    }
  }, [chatId]);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* <aside className="hidden w-64 flex-col border-r bg-muted/40 p-4 lg:flex">
        <div className="flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
            <MessageCircleIcon className="h-6 w-6" />
            <span>Chat App</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="mt-4 space-y-2">
            <div className="px-2 text-xs font-medium text-muted-foreground">Chats</div>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md bg-accent p-2 text-accent-foreground transition-colors hover:bg-accent/80"
              prefetch={false}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate">
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-muted-foreground">Hey, how's it going?</div>
              </div>
              <Badge variant="secondary" className="shrink-0">
                2
              </Badge>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted"
              prefetch={false}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate">
                <div className="font-medium">Jane Smith</div>
                <div className="text-sm text-muted-foreground">Did you see the new design?</div>
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted"
              prefetch={false}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate">
                <div className="font-medium">Michael Johnson</div>
                <div className="text-sm text-muted-foreground">Let's discuss the project update.</div>
              </div>
            </Link>
          </div>
        </div>
      </aside> */}
      <main className="flex-1">
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b bg-muted/40 p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium">Boku no Ikigai</div>
                <div className="text-sm text-muted-foreground">nan deska?</div>
              </div>
            </div>
            
          </header>
          <div className="flex-1 overflow-auto p-4 lg:p-6">
            <div className="grid gap-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex items-start gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  )}
                  <div className={`rounded-lg p-2 text-sm max-w-[80%] ${message.role === "user" ? "text-primary-foreground bg-primary" : "text-primary"}`}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({node, ...props}) => <p className="mb-2" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-lg font-bold" {...props} />,
                        h3: ({node, ...props}) => <h3 className="font-bold" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-2" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-2" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        hr: ({node, ...props}) => <hr className="mb-2" {...props} />,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="border-t bg-muted/40 p-4 lg:p-6">
            <div className="relative">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="min-h-[48px] w-full rounded-2xl border border-neutral-400 bg-background p-3 pr-16 shadow-sm"
              />
              <Button type="submit" size="icon" className="absolute right-3 top-3">
                <SendIcon className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}
