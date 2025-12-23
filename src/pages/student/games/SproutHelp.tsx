import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ConceptIntroPopup } from "@/components/ui/concept-intro-popup";
import { GameCompletionPopup } from "@/components/ui/game-completion-popup";
import { Maximize2, Minimize2, RotateCcw, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type GrowthStage = "seed" | "sprout" | "seedling" | "young-plant" | "flowering" | "blooming";

const GROWTH_STAGES: Record<GrowthStage, { emoji: string; label: string }> = {
  seed: { emoji: "🫘", label: "Seed" },
  sprout: { emoji: "🌱", label: "Sprout" },
  "seedling": { emoji: "🌿", label: "Seedling" },
  "young-plant": { emoji: "🪴", label: "Young Plant" },
  flowering: { emoji: "🌸", label: "Flowering" },
  blooming: { emoji: "🌻", label: "Blooming" },
};

const STAGE_ORDER: GrowthStage[] = [
  "seed",
  "sprout",
  "seedling",
  "young-plant",
  "flowering",
  "blooming",
];

interface PlantState {
  stage: GrowthStage;
  sunlight: number;
  water: number;
  air: number;
  health: number;
}

export default function SproutHelp() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [dayCount, setDayCount] = useState(0);
  const [plant, setPlant] = useState<PlantState>({
    stage: "seed",
    sunlight: 50,
    water: 50,
    air: 50,
    health: 100,
  });

  // Simulate day/night cycle and plant growth
  useEffect(() => {
    if (!gameStarted || showCompletion) return;

    const interval = setInterval(() => {
      setDayCount((prev) => prev + 1);

      setPlant((prev) => {
        // Calculate growth based on balance of needs
        const balance = Math.abs(prev.sunlight - 50) + Math.abs(prev.water - 50) + Math.abs(prev.air - 50);
        const healthPenalty = Math.max(0, (100 - balance) * 0.02);
        const newHealth = Math.max(0, prev.health - healthPenalty);

        // Determine new stage based on health
        let newStage = prev.stage;
        if (newHealth > 80 && STAGE_ORDER.indexOf(prev.stage) < STAGE_ORDER.length - 1) {
          newStage = STAGE_ORDER[STAGE_ORDER.indexOf(prev.stage) + 1];
        }

        // Water evaporates
        const newWater = Math.max(0, prev.water - 3);

        return {
          ...prev,
          water: newWater,
          health: newHealth,
          stage: newStage,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, showCompletion]);

  // Check for completion
  useEffect(() => {
    if (plant.stage === "blooming" && plant.health > 70) {
      setShowCompletion(true);
    }
  }, [plant.stage, plant.health]);

  const handleSunlight = (change: number) => {
    setPlant((prev) => ({
      ...prev,
      sunlight: Math.max(0, Math.min(100, prev.sunlight + change)),
    }));
  };

  const handleWater = () => {
    setPlant((prev) => ({
      ...prev,
      water: Math.min(100, prev.water + 30),
    }));
  };

  const handleRetry = () => {
    setDayCount(0);
    setPlant({
      stage: "seed",
      sunlight: 50,
      water: 50,
      air: 50,
      health: 100,
    });
    setGameStarted(false);
    setShowCompletion(false);
  };

  const getHealthColor = () => {
    if (plant.health > 80) return "text-green-500";
    if (plant.health > 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getStageColor = () => {
    const currentIndex = STAGE_ORDER.indexOf(plant.stage);
    const progress = (currentIndex / (STAGE_ORDER.length - 1)) * 100;
    return progress;
  };

  const content = (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-900/10 to-green-900/20 relative overflow-hidden p-4">
      {/* Sky gradient background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-4 right-10 text-6xl animate-bounce">☀️</div>
        <div className="absolute top-20 right-1/4 text-3xl animate-pulse">☁️</div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Day Counter */}
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">Day {dayCount}</p>
        </div>

        {/* Plant Display */}
        <div className="text-center mb-8">
          <div className={`text-7xl mb-4 ${plant.health > 70 ? "animate-bounce" : ""}`}>
            {GROWTH_STAGES[plant.stage].emoji}
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            {GROWTH_STAGES[plant.stage].label}
          </h2>

          {/* Growth Progress */}
          <div className="mt-4 w-full max-w-xs mx-auto">
            <div className="h-3 bg-muted rounded-full overflow-hidden border border-border">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-1000"
                style={{ width: `${getStageColor()}%` }}
              />
            </div>
          </div>
        </div>

        {/* Health Status */}
        <div className="mb-8 text-center">
          <div className={`text-2xl font-bold ${getHealthColor()}`}>
            Health: {Math.round(plant.health)}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Keep your plant balanced to help it grow!
          </p>
        </div>

        {/* Plant Needs */}
        <div className="grid grid-cols-3 gap-4 mb-8 bg-muted/20 rounded-xl p-4">
          {/* Sunlight */}
          <div className="text-center">
            <div className="text-3xl mb-2">☀️</div>
            <p className="text-xs text-muted-foreground mb-2">Sunlight</p>
            <div className="flex gap-1 justify-center">
              <button
                onClick={() => handleSunlight(-10)}
                className="px-2 py-1 bg-card border border-border rounded hover:bg-primary/20"
              >
                −
              </button>
              <span className="text-sm font-medium w-8">{plant.sunlight}%</span>
              <button
                onClick={() => handleSunlight(10)}
                className="px-2 py-1 bg-card border border-border rounded hover:bg-primary/20"
              >
                +
              </button>
            </div>
          </div>

          {/* Water */}
          <div className="text-center">
            <div className="text-3xl mb-2">💧</div>
            <p className="text-xs text-muted-foreground mb-2">Water</p>
            <button
              onClick={handleWater}
              className="w-full px-2 py-2 bg-primary/20 border border-primary/50 rounded hover:bg-primary/30 transition-all"
            >
              <span className="text-sm font-medium">Add Water</span>
            </button>
            <p className="text-xs mt-1">{plant.water}%</p>
          </div>

          {/* Air */}
          <div className="text-center">
            <div className="text-3xl mb-2">💨</div>
            <p className="text-xs text-muted-foreground mb-2">Air</p>
            <p className="text-sm font-medium">{plant.air}%</p>
            <p className="text-xs text-muted-foreground mt-1">Automatic</p>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-accent/20 border border-accent/50 rounded-lg p-3 text-center text-xs text-muted-foreground">
          💡 Keep sunlight, water, and air balanced for best growth!
        </div>
      </div>
    </div>
  );

  const gameView = (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}>
      <div className={isFullscreen ? "h-screen flex flex-col" : "h-[500px]"}>
        <div className="flex-1 overflow-hidden">{content}</div>

        {!isFullscreen && (
          <div className="border-t border-border bg-card/50 p-4 space-y-2">
            <p className="text-sm font-medium text-foreground">
              🧠 Learning: Plant Growth Needs
            </p>
            <p className="text-xs text-muted-foreground">
              Balance sunlight, water, and air to help your plant grow and bloom
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
        conceptName="🌱 Sprout Help"
        whatYouWillUnderstand="Learn that plants need balanced amounts of sunlight, water, and air. Too much or too little of anything slows growth."
        gameSteps={[
          "Watch your seed grow through different stages",
          "Adjust sunlight, water, and air levels to keep the plant healthy",
          "Keep everything balanced to help your plant bloom into a beautiful flower",
        ]}
        successMeaning="Your plant will bloom into a gorgeous flower and you'll understand how plants thrive with the right balance!"
        icon="🌻"
      />

      <GameCompletionPopup
        isOpen={showCompletion}
        onPlayAgain={handleRetry}
        onExitFullscreen={() => setIsFullscreen(false)}
        onBackToGames={() => navigate("/student/biology")}
        learningOutcome="You now understand that plants need balanced sunlight, water, and air to grow healthy and strong!"
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
