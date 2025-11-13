import { Loader2 } from "lucide-react";

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className || "min-h-[400px]"}`}>
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}

