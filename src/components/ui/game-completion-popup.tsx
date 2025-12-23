import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export interface GameCompletionPopupProps {
  isOpen: boolean;
  onPlayAgain: () => void;
  onExitFullscreen?: () => void;
  onBackToGames: () => void;
  learningOutcome: string;
  isFullscreen?: boolean;
}

export function GameCompletionPopup({
  isOpen,
  onPlayAgain,
  onExitFullscreen,
  onBackToGames,
  learningOutcome,
  isFullscreen = false,
}: GameCompletionPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[450px] glass-card border-border text-center">
        {/* Celebration Emoji Animation */}
        <div className="mb-4 text-6xl animate-bounce">🎉</div>

        <div className="space-y-4">
          <h2 className="font-heading text-3xl font-bold text-foreground">
            You Did It!
          </h2>

          <p className="text-lg text-muted-foreground">
            {learningOutcome}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <Button
            onClick={onPlayAgain}
            className="bg-primary hover:bg-primary/90"
          >
            🔄 Play Again
          </Button>
          
          {isFullscreen && onExitFullscreen && (
            <Button
              variant="outline"
              onClick={onExitFullscreen}
            >
              ⛶ Exit Fullscreen
            </Button>
          )}

          <Button
            variant="outline"
            onClick={onBackToGames}
          >
            ⬅ Back to Biology Games
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
