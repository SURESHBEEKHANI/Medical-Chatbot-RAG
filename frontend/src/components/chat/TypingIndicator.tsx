import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start animate-fade-in">
      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Bot className="w-5 h-5 text-primary" />
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-tl-md px-4 py-3 shadow-soft">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
          <div className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
          <div className="w-2 h-2 rounded-full bg-primary/60 typing-dot" />
        </div>
      </div>
    </div>
  );
}
