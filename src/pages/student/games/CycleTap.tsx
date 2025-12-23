import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ConceptIntroPopup } from "@/components/ui/concept-intro-popup";
import { GameCompletionPopup } from "@/components/ui/game-completion-popup";
import { Maximize2, Minimize2, RotateCcw, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LifeStage {
  name: string;
  emoji: string;
  description: string;
}

const BUTTERFLY_CYCLE: LifeStage[] = [
  { name: "Egg", emoji: "🥚", description: "Tiny eggs on a leaf" },
  { name: "Caterpillar", emoji: "🐛", description: "Hungry eating stage" },
  { name: "Chrysalis", emoji: "🟫", description: "Transformation stage" },
  { name: "Butterfly", emoji: "🦋", description: "Beautiful flying stage" },
];

export default function CycleTap() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [totalTaps, setTotalTaps] = useState(0);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [nextStageOptions, setNextStageOptions] = useState<number[]>([]);

  // Initialize next stage options
  useEffect(() => {
    if (gameStarted && !showCompletion) {
      const nextIndex = (currentStage + 1) % BUTTERFLY_CYCLE.length;
      const incorrectIndices = Array.from({ length: BUTTERFLY_CYCLE.length }, (_, i) => i).filter(
        (i) => i !== nextIndex
      );
      const shuffled = [nextIndex, ...incorrectIndices.slice(0, 2)].sort(() => Math.random() - 0.5);
      setNextStageOptions(shuffled);
    }
  }, [currentStage, gameStarted, showCompletion]);

  const handleStageSelect = (stageIndex: number) => {
    setTotalTaps(totalTaps + 1);

    const expectedNextIndex = (currentStage + 1) % BUTTERFLY_CYCLE.length;

    if (stageIndex === expectedNextIndex) {
      setFeedback("✨ Perfect! Correct stage!");
      setWheelRotation((prev) => prev + 90);

      setTimeout(() => {
        const newStage = (currentStage + 1) % BUTTERFLY_CYCLE.length;
        setCurrentStage(newStage);
        setFeedback("");

        if (newStage === 0) {
          setCompletedCycles(completedCycles + 1);
          if (completedCycles + 1 >= 3) {
            setShowCompletion(true);
          }
        }
      }, 800);
    } else {
      setFeedback("⚠️ Not this one! Try again.");
      setTimeout(() => setFeedback(""), 1500);
    }
  };

  const handleRetry = () => {
    setCurrentStage(0);
    setCompletedCycles(0);
    setTotalTaps(0);
    setWheelRotation(0);
    setFeedback("");
    setGameStarted(false);
    setShowCompletion(false);
  };

  const content = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-purple-900/10 to-blue-900/20 relative overflow-hidden p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 right-1/4 text-5xl animate-bounce">🌞</div>
        <div className="absolute bottom-20 left-1/4 text-4xl animate-pulse">🌿</div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress */}
        <div className="text-center mb-6">
          <h3 className="text-sm text-muted-foreground mb-1">
            Cycles Completed: {completedCycles}/3
          </h3>
          <p className="text-xs text-muted-foreground">
            Complete 3 full life cycles to master the pattern
          </p>
        </div>

        {/* Lifecycle Wheel */}
        <div className="flex justify-center mb-8">
          <div className="relative w-80 h-80">
            {/* Rotating wheel background */}
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              style={{
                transform: `rotate(${wheelRotation}deg)`,
                transition: "transform 0.6s ease-out",
              }}
            >
              <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" opacity="0.3" />

              {/* Stage positions */}
              {BUTTERFLY_CYCLE.map((_, index) => {
                const angle = (index / BUTTERFLY_CYCLE.length) * 360;
                const x = 200 + 120 * Math.cos((angle - 90) * (Math.PI / 180));
                const y = 200 + 120 * Math.sin((angle - 90) * (Math.PI / 180));

                return (
                  <g key={index}>
                    <circle
                      cx={x}
                      cy={y}
                      r="30"
                      fill="currentColor"
                      className="text-muted/30"
                    />
                  </g>
                );
              })}

              {/* Center indicator */}
              <circle cx="200" cy="200" r="15" fill="currentColor" className="text-primary" />
            </svg>

            {/* Stage buttons overlaid */}
            <div className="absolute inset-0 flex items-center justify-center">
              {nextStageOptions.map((stageIndex) => {
                const angle = (stageIndex / BUTTERFLY_CYCLE.length) * 360;
                const x = 120 * Math.cos((angle - 90) * (Math.PI / 180));
                const y = 120 * Math.sin((angle - 90) * (Math.PI / 180));

                const isCorrect = stageIndex === (currentStage + 1) % BUTTERFLY_CYCLE.length;

                return (
                  <button
                    key={stageIndex}
                    onClick={() => handleStageSelect(stageIndex)}
                    className={`absolute w-20 h-20 flex flex-col items-center justify-center rounded-full border-2 transition-all transform hover:scale-110 ${
                      isCorrect
                        ? "border-green-500/40 bg-green-500/10 hover:border-green-500"
                        : "border-border bg-card/50 hover:border-primary/50"
                    }`}
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div className="text-3xl">{BUTTERFLY_CYCLE[stageIndex].emoji}</div>
                    <p className="text-xs font-medium text-foreground mt-1">
                      {BUTTERFLY_CYCLE[stageIndex].name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Stage Info */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Current: {BUTTERFLY_CYCLE[currentStage].name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {BUTTERFLY_CYCLE[currentStage].description}
          </p>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`text-center mb-4 p-3 rounded-lg transition-all ${
              feedback.includes("Perfect")
                ? "bg-green-500/20 text-green-600"
                : "bg-yellow-500/20 text-yellow-600"
            }`}
          >
            {feedback}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-accent/20 border border-accent/50 rounded-lg p-3 text-center text-xs text-muted-foreground">
          👉 Tap the correct next stage in the butterfly's life cycle!
        </div>
      </div>
    </div>
  );

  const gameView = (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}>
      <div className={isFullscreen ? "h-screen flex flex-col" : "h-[600px]"}>
        <div className="flex-1 overflow-auto">{content}</div>

        {!isFullscreen && (
          <div className="border-t border-border bg-card/50 p-4 space-y-2">
            <p className="text-sm font-medium text-foreground">
              🧠 Learning: Life Cycle Stages
            </p>
            <p className="text-xs text-muted-foreground">
              Master the butterfly life cycle - the order matters!
            </p>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" /> Retry
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/student/biology")}
                className="gap-2 ml-auto"
              >
                <ChevronLeft className="h-4 w-4" /> Back to Biology
              </Button>
            </div>
          </div>
        )}
      </div>

      {isFullscreen && (
        <div className="fixed bottom-6 right-6 flex gap-2 z-50">
          <Button
            size="sm"
            variant="outline"
            onClick={handleRetry}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" /> Retry
          </Button>
          <Button
            size="sm"
            onClick={() => setIsFullscreen(false)}
            className="gap-2"
          >
            <Minimize2 className="h-4 w-4" /> Exit
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <ConceptIntroPopup
        isOpen={showIntro}
        onClose={() => setShowIntro(true)}
        onStart={() => {
          setShowIntro(false);
          setGameStarted(true);
        }}
        conceptName="🦋 Cycle Tap"
        whatYouWillUnderstand="Learn that life happens in stages, and the order of these stages cannot be skipped. Cycles repeat forever in nature."
        gameSteps={[
          "Watch the current stage in the butterfly's life cycle",
          "Tap the correct next stage to advance the cycle",
          "Complete 3 full cycles to master the pattern",
        ]}
        successMeaning="You'll understand the complete life cycle and how nature repeats this pattern perfectly!"
        icon="🦋"
      />

      <GameCompletionPopup
        isOpen={showCompletion}
        onPlayAgain={handleRetry}
        onExitFullscreen={() => setIsFullscreen(false)}
        onBackToGames={() => navigate("/student/biology")}
        learningOutcome="You've mastered the butterfly life cycle! You now understand that nature moves in perfect patterns and order matters!"
        isFullscreen={isFullscreen}
      />

      <div className="bg-background">
        {!isFullscreen ? (
          <div className="max-w-4xl mx-auto">
            {gameView}
            <div className="flex justify-end p-4 border-t border-border bg-card/50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(true)}
                className="gap-2"
              >
                <Maximize2 className="h-4 w-4" /> Fullscreen
              </Button>
            </div>
          </div>
        ) : (
          gameView
        )}
      </div>
    </>
  );
}
