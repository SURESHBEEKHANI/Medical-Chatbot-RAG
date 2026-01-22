import { Activity, Pill, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionButtonsProps {
  onAction: (action: string) => void;
}

const quickActions = [
  { id: "symptoms", label: "Symptoms", icon: Activity },
  { id: "medication", label: "Medication", icon: Pill },
  { id: "next-steps", label: "Next Steps", icon: ArrowRight },
  { id: "history", label: "Medical History", icon: FileText },
];

export function QuickActionButtons({ onAction }: QuickActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {quickActions.map((action) => (
        <Button
          key={action.id}
          variant="quickAction"
          size="sm"
          onClick={() => onAction(action.id)}
          className="flex items-center gap-2"
        >
          <action.icon className="w-4 h-4" />
          {action.label}
        </Button>
      ))}
    </div>
  );
}
