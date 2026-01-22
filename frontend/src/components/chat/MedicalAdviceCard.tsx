import { AlertCircle, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

type AdviceType = "safe" | "warning" | "critical";

interface MedicalAdviceCardProps {
  type: AdviceType;
  title: string;
  description: string;
  source?: string;
  sourceUrl?: string;
}

const iconMap = {
  safe: CheckCircle,
  warning: AlertTriangle,
  critical: AlertCircle,
};

const colorMap = {
  safe: "medical-card-safe",
  warning: "medical-card-warning",
  critical: "medical-card-critical",
};

const iconColorMap = {
  safe: "text-safe",
  warning: "text-warning",
  critical: "text-critical",
};

export function MedicalAdviceCard({
  type,
  title,
  description,
  source,
  sourceUrl,
}: MedicalAdviceCardProps) {
  const Icon = iconMap[type];

  return (
    <div
      className={cn(
        "rounded-lg p-4 animate-message-in",
        colorMap[type]
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", iconColorMap[type])} />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground mb-1">{title}</h4>
          <p className="text-sm text-foreground/80 leading-relaxed">{description}</p>
          
          {source && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <a
                href={sourceUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <span>Source: {source}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
