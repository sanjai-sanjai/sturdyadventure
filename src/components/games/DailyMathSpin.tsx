import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface Challenge {
  num1: number;
  num2: number;
  operation: "+" | "-" | "*";
  answers: number[];
}

export function DailyMathSpin({ onClose }: { onClose: () => void }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"none" | "correct" | "wrong">("none");
  const [spins, setSpins] = useState(3);
  const [rotation, setRotation] = useState(0);

  const generateChallenge = (): Challenge => {
    const operations: ("+" | "-" | "*")[] = ["+", "-", "*"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, correctAnswer;
    
    if (operation === "+") {
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      correctAnswer = num1 + num2;
    } else if (operation === "-") {
      num1 = Math.floor(Math.random() * 30) + 10;
      num2 = Math.floor(Math.random() * num1);
      correctAnswer = num1 - num2;
    } else {
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      correctAnswer = num1 * num2;
    }

    const wrongAnswers = [
      correctAnswer + Math.floor(Math.random() * 10) + 1,
      correctAnswer - Math.floor(Math.random() * 10) - 1,
      correctAnswer + Math.floor(Math.random() * 20) + 5,
    ].filter(a => a !== correctAnswer);

    const answers = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);

    return { num1, num2, operation, answers };
  };

  const handleSpin = () => {
    if (spins <= 0) return;
    
    setSpinning(true);
    setSelectedAnswer(null);
    setFeedback("none");
    setAnswered(false);
    
    const newRotation = rotation + (360 * 5 + Math.random() * 360);
    setRotation(newRotation);
    
    setTimeout(() => {
      setSpinning(false);
      const challenge = generateChallenge();
      setCurrentChallenge(challenge);
    }, 1000);
    
    setSpins(spins - 1);
  };

  const handleAnswer = (answer: number) => {
    if (!currentChallenge || answered) return;
    
    const correctAnswer = currentChallenge.operation === "+"
      ? currentChallenge.num1 + currentChallenge.num2
      : currentChallenge.operation === "-"
      ? currentChallenge.num1 - currentChallenge.num2
      : currentChallenge.num1 * currentChallenge.num2;

    setSelectedAnswer(answer);
    setAnswered(true);

    if (answer === correctAnswer) {
      setFeedback("correct");
      setScore(score + 10);
      setStreak(streak + 1);
    } else {
      setFeedback("wrong");
      setStreak(0);
    }
  };

  const continueGame = () => {
    if (spins > 0) {
      handleSpin();
    } else {
      setGameStarted(false);
    }
  };

  if (!gameStarted) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Daily Math Spin 🎡</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-semibold">📘 What You Will Discover</h3>
              <p className="text-sm text-muted-foreground">
                Quick thinking and practice make mental maths easy.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">🎯 What You Need To Do</h3>
              <p className="text-sm text-muted-foreground">
                Spin the wheel and solve math challenges as fast as you can.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">🏆 What Success Looks Like</h3>
              <p className="text-sm text-muted-foreground">
                Build streaks and earn bonus coins for consistent accuracy.
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
          <DialogTitle>Daily Math Spin 🎡</DialogTitle>
          <div className="flex gap-6 mt-4">
            <div>Score: <span className="font-bold text-primary">{score}</span></div>
            <div>Streak: <span className="font-bold text-accent">{streak}🔥</span></div>
            <div>Spins Left: <span className="font-bold">{spins}</span></div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Wheel */}
          <div className="flex justify-center">
            <div 
              className="w-48 h-48 rounded-full border-8 border-primary bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transition-transform"
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <div className="text-center pointer-events-none">
                <div className="text-4xl font-bold text-primary">🎡</div>
              </div>
            </div>
          </div>

          {/* Spin Button */}
          {!spinning && currentChallenge === null && (
            <div className="text-center">
              <Button
                onClick={handleSpin}
                disabled={spins === 0}
                size="lg"
                className="w-full"
              >
                {spins === 0 ? "Game Over!" : `🔄 Spin Wheel (${spins} left)`}
              </Button>
            </div>
          )}

          {/* Challenge */}
          {currentChallenge && (
            <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-6">
              <p className="text-center text-sm text-muted-foreground mb-4">Solve this:</p>
              <div className="text-center mb-6">
                <p className="text-5xl font-bold text-primary">
                  {currentChallenge.num1} {currentChallenge.operation} {currentChallenge.num2}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {currentChallenge.answers.map((answer, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleAnswer(answer)}
                    disabled={answered}
                    variant={selectedAnswer === answer ? "default" : "outline"}
                    className="text-lg font-bold h-16"
                  >
                    {answer}
                  </Button>
                ))}
              </div>

              {feedback !== "none" && (
                <div className={`mt-4 p-4 rounded-lg text-center font-bold ${
                  feedback === "correct"
                    ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                }`}>
                  {feedback === "correct" ? "✓ Correct! +10 pts" : "✗ Wrong! Try again next time"}
                </div>
              )}
            </div>
          )}

          {/* Continue Button */}
          {answered && (
            <Button
              onClick={continueGame}
              className="w-full"
              size="lg"
            >
              {spins > 0 ? "Next Challenge" : "See Results"}
            </Button>
          )}

          {/* Concept Strip */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-300">
            💡 "Practice makes speed."
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
