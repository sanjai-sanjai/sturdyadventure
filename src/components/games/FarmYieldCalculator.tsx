import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Zap } from "lucide-react";

export function FarmYieldCalculator({ onClose }: { onClose: () => void }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [gridWidth, setGridWidth] = useState(5);
  const [gridHeight, setGridHeight] = useState(5);
  const [seedDensity, setSeedDensity] = useState(1);
  const [harvested, setHarvested] = useState(false);
  const [yield_, setYield] = useState(0);
  const [feedback, setFeedback] = useState<"none" | "optimal" | "poor">("none");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  const optimalSeedDensity = 0.8;
  const landArea = gridWidth * gridHeight;
  const optimalYield = Math.floor(landArea * 100 * optimalSeedDensity);
  
  // Calculate yield based on seed density
  const calculateYield = () => {
    const wastePercentage = Math.abs(seedDensity - optimalSeedDensity) * 100;
    const efficiency = Math.max(0, 100 - wastePercentage * 50);
    const calculatedYield = Math.floor((landArea * 100 * seedDensity * efficiency) / 100);
    return calculatedYield;
  };

  const handleHarvest = () => {
    const harvestYield = calculateYield();
    setYield(harvestYield);
    setHarvested(true);

    if (Math.abs(seedDensity - optimalSeedDensity) < 0.15) {
      setFeedback("optimal");
      setScore(score + 15);
    } else {
      setFeedback("poor");
    }
  };

  const nextRound = () => {
    if (round < 3) {
      setRound(round + 1);
      setGridWidth(4 + Math.floor(Math.random() * 4));
      setGridHeight(4 + Math.floor(Math.random() * 4));
      setSeedDensity(1);
      setHarvested(false);
      setFeedback("none");
      setYield(0);
    } else {
      setGameStarted(false);
    }
  };

  if (!gameStarted) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Farm Yield Calculator 🌾</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-semibold">📘 What You Will Discover</h3>
              <p className="text-sm text-muted-foreground">
                How land size and seeds affect crop yield.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">🎯 What You Need To Do</h3>
              <p className="text-sm text-muted-foreground">
                Choose land size, adjust seed density, and predict harvest yield.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">🏆 What Success Looks Like</h3>
              <p className="text-sm text-muted-foreground">
                Healthy crops and maximum profit through optimal planning.
              </p>
            </div>
            <Button onClick={() => setGameStarted(true)} className="w-full">
              Start Game
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Farm Yield Calculator 🌾 - Round {round}/3</DialogTitle>
          <div className="flex gap-4 mt-4">
            <div>Score: <span className="font-bold">{score}</span></div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Farm Grid Visualization */}
          <div className="bg-green-50 dark:bg-green-950 rounded-lg p-6">
            <p className="text-sm font-semibold mb-4">🌱 Your Farm Field</p>
            <div className="mb-4 text-center">
              <p className="text-sm text-muted-foreground">Land Size: {gridWidth}m × {gridHeight}m</p>
              <p className="font-bold text-lg">Total Area: {landArea} m²</p>
            </div>
            
            {/* Grid Display */}
            <div 
              className="inline-block gap-1 p-4 bg-white dark:bg-slate-800 rounded border border-green-300"
              style={{
                display: "inline-grid",
                gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
                margin: "0 auto",
              }}
            >
              {Array.from({ length: landArea }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-8 h-8 rounded flex items-center justify-center text-lg transition ${
                    seedDensity > 0.7 ? "bg-yellow-300" : "bg-yellow-100"
                  }`}
                  title={`Cell ${idx + 1}`}
                >
                  {seedDensity > 0.7 ? "🌾" : seedDensity > 0.3 ? "🌱" : "🌍"}
                </div>
              ))}
            </div>
          </div>

          {/* Seed Density Control */}
          {!harvested && (
            <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
              <p className="text-sm font-semibold mb-4">🌱 Adjust Seed Density</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Current: {(seedDensity * 100).toFixed(0)}%</span>
                    <span className="text-xs text-muted-foreground">(Optimal: 80%)</span>
                  </div>
                  <Slider
                    value={[seedDensity]}
                    onValueChange={(v) => setSeedDensity(v[0])}
                    min={0.2}
                    max={1.5}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Too Few</span>
                    <span>Perfect</span>
                    <span>Too Many</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded p-3">
                  <p className="text-sm mb-2">📊 Predicted Outcome:</p>
                  <p className="font-bold text-lg text-primary">
                    ~{Math.floor(landArea * 100 * seedDensity)} kg harvest
                  </p>
                  {seedDensity < 0.5 && <p className="text-xs text-orange-600 mt-1">⚠️ Too few seeds - wasting land!</p>}
                  {seedDensity > 1.2 && <p className="text-xs text-orange-600 mt-1">⚠️ Too many seeds - overcrowding!</p>}
                </div>
              </div>
            </div>
          )}

          {/* Harvest Results */}
          {harvested && (
            <div className={`p-4 rounded-lg ${
              feedback === "optimal"
                ? "bg-green-100 dark:bg-green-900"
                : "bg-orange-100 dark:bg-orange-900"
            }`}>
              <p className="text-sm font-semibold mb-2">🌾 Harvest Results</p>
              <p className="text-3xl font-bold mb-2">
                {yield_} kg 🌾
              </p>
              {feedback === "optimal" && (
                <div className="text-green-800 dark:text-green-200">
                  <p className="font-bold">✓ Excellent Yield!</p>
                  <p className="text-sm">You found the optimal balance of seeds and land.</p>
                </div>
              )}
              {feedback === "poor" && (
                <div className="text-orange-800 dark:text-orange-200">
                  <p className="font-bold">⚠️ Suboptimal Harvest</p>
                  <p className="text-sm">You could have harvested more with better planning.</p>
                  <p className="text-sm">Optimal would be ~{optimalYield} kg</p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!harvested && (
              <Button onClick={handleHarvest} className="w-full" size="lg">
                🌾 Harvest Farm
              </Button>
            )}
            {harvested && (
              <>
                {round < 3 && (
                  <Button onClick={nextRound} className="w-full" size="lg">
                    Next Farm
                  </Button>
                )}
                {round === 3 && (
                  <Button onClick={onClose} className="w-full" size="lg">
                    Finish Game
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Concept Strip */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">
            💡 "More land or more seeds changes the result."
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
