import { SubjectLayout } from "@/components/student/SubjectLayout";
import { GameMissionCard } from "@/components/student/GameMissionCard";
import { Wallet, PiggyBank, CreditCard, TrendingUp, Receipt, Landmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const financeMissions = [
  {
    title: "Family Budget Challenge",
    description: "Help your family plan monthly expenses and savings",
    icon: Receipt,
    reward: 100,
    difficulty: "medium" as const,
    status: "in-progress" as const,
    progress: 55,
    path: "/learn/finance",
  },
  {
    title: "Savings Superstar",
    description: "Learn the power of saving money regularly",
    icon: PiggyBank,
    reward: 75,
    difficulty: "easy" as const,
    status: "completed" as const,
  },
  {
    title: "Smart Shopping",
    description: "Compare prices and make wise buying decisions",
    icon: CreditCard,
    reward: 80,
    difficulty: "easy" as const,
    status: "completed" as const,
  },
  {
    title: "Investment Basics",
    description: "Understand how money can grow over time",
    icon: TrendingUp,
    reward: 110,
    difficulty: "hard" as const,
    status: "available" as const,
  },
  {
    title: "Banking Basics",
    description: "Learn how banks work and manage accounts",
    icon: Landmark,
    reward: 90,
    difficulty: "medium" as const,
    status: "available" as const,
  },
];

export default function FinancePage() {
  const navigate = useNavigate();

  return (
    <SubjectLayout
      title="Financial Literacy"
      icon={Wallet}
      iconColor="text-accent"
      progress={55}
      totalLessons={10}
      completedLessons={6}
      xpEarned={340}
    >
      <div className="slide-up" style={{ animationDelay: "150ms" }}>
        <h3 className="mb-4 font-heading font-semibold">Missions & Games</h3>
        <div className="space-y-3">
          {financeMissions.map((mission, index) => (
            <div
              key={mission.title}
              className="slide-up"
              style={{ animationDelay: `${200 + index * 50}ms` }}
            >
              <GameMissionCard
                {...mission}
                onClick={() => mission.path && navigate(mission.path)}
              />
            </div>
          ))}
        </div>
      </div>
    </SubjectLayout>
  );
}
