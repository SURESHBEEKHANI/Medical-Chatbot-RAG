import { useState } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center gap-2 p-2 bg-card border border-border rounded-2xl shadow-soft">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <Paperclip className="w-5 h-5" />
        </Button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your health question..."
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm py-2"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <Mic className="w-5 h-5" />
        </Button>

        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || disabled}
          className={cn(
            "rounded-xl transition-all",
            message.trim() ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          )}
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-2">
        MediChat provides guidance only. Always consult a healthcare professional for medical decisions.
      </p>
    </form>
  );
}
