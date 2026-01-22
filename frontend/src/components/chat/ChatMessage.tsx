import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === "bot";

  return (
    <div
      className={cn(
        "flex gap-3 animate-message-in",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-primary" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 shadow-soft",
          isBot
            ? "bg-card border border-border rounded-tl-md"
            : "bg-chat-user text-primary-foreground rounded-tr-md"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <span
          className={cn(
            "text-xs mt-1 block",
            isBot ? "text-muted-foreground" : "text-primary-foreground/70"
          )}
        >
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      {!isBot && (
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}
