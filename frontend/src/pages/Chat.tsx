import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { ChatMessage, Message } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { QuickActionButtons } from "@/components/chat/QuickActionButtons";
import { MedicalAdviceCard } from "@/components/chat/MedicalAdviceCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { askMedicalQuestion } from "@/services/api";
import { toast } from "@/components/ui/use-toast";

const initialMessages: Message[] = [
  {
    id: "1",
    role: "bot",
    content: "Hello! I'm your MediChat assistant. I'm here to help answer your health-related questions. How can I assist you today?",
    timestamp: new Date(),
  },
];

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [showAdviceCard, setShowAdviceCard] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Call the backend API
      const response = await askMedicalQuestion(content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: response.answer,
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
      
      // Show advice card for certain keywords
      if (
        content.toLowerCase().includes("headache") ||
        content.toLowerCase().includes("pain") ||
        content.toLowerCase().includes("symptom")
      ) {
        setShowAdviceCard(true);
      }
    } catch (error) {
      setIsTyping(false);
      const errorMessage = error instanceof Error ? error.message : "Failed to get response";
      
      // Show error toast
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      // Add error message to chat
      const errorBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorBotMessage]);
    }
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      symptoms: "I'd like to discuss my symptoms",
      medication: "I have a question about medication",
      "next-steps": "What should be my next steps?",
      history: "I want to share my medical history",
    };
    handleSendMessage(actionMessages[action] || action);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar onLogout={handleLogout} />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-6">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Health Assistant</h1>
            <p className="text-sm text-muted-foreground">Ask any health-related question</p>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea ref={scrollRef} className="flex-1 p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {showAdviceCard && (
              <div className="space-y-3">
                <MedicalAdviceCard
                  type="safe"
                  title="General Recommendation"
                  description="For mild headaches, rest in a quiet, dark room and stay hydrated. Over-the-counter pain relievers like acetaminophen or ibuprofen may help."
                  source="Mayo Clinic"
                  sourceUrl="https://mayoclinic.org"
                />
                <MedicalAdviceCard
                  type="warning"
                  title="When to Seek Care"
                  description="If your headache is severe, sudden, or accompanied by fever, stiff neck, confusion, or vision changes, seek medical attention promptly."
                  source="CDC Guidelines"
                  sourceUrl="https://cdc.gov"
                />
              </div>
            )}
            
            {isTyping && <TypingIndicator />}
            
            {messages.length === 1 && (
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-3">Quick actions:</p>
                <QuickActionButtons onAction={handleQuickAction} />
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm pb-20 lg:pb-4">
          <div className="max-w-3xl mx-auto">
            <ChatInput onSend={handleSendMessage} disabled={isTyping} />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}
