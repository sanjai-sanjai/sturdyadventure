import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface ConceptIntroPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  conceptName: string;
  whatYouWillUnderstand: string;
  gameSteps: string[];
  successMeaning: string;
  icon?: React.ReactNode;
}

export function ConceptIntroPopup({
  isOpen,
  onClose,
  onStart,
  conceptName,
  whatYouWillUnderstand,
  gameSteps,
  successMeaning,
  icon,
}: ConceptIntroPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] glass-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {icon && <span className="text-2xl">{icon}</span>}
            <span>{conceptName}</span>
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-md opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <div className="space-y-5">
          {/* What You Will Understand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">📘</span>
              <h4 className="font-semibold text-foreground">What You Will Understand</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed ml-7">
              {whatYouWillUnderstand}
            </p>
          </div>

          {/* How This Game Works */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎮</span>
              <h4 className="font-semibold text-foreground">How This Game Works</h4>
            </div>
            <div className="ml-7 space-y-2">
              {gameSteps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What Success Means */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏆</span>
              <h4 className="font-semibold text-foreground">What Success Means</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed ml-7">
              {successMeaning}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            ❌ Go Back
          </Button>
          <Button
            onClick={onStart}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            ✅ Start Game
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
