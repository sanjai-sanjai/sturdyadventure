import { SubjectLayout } from "@/components/student/SubjectLayout";
import { GameMissionCard } from "@/components/student/GameMissionCard";
import { Laptop, Code, Shield, Wifi, Smartphone, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const techMissions = [
  {
    title: "Digital Literacy Basics",
    description: "Learn to use computers and smartphones effectively",
    icon: Smartphone,
    reward: 80,
    difficulty: "easy" as const,
    status: "completed" as const,
  },
  {
    title: "Coding Playground",
    description: "Start your coding journey with fun visual programming",
    icon: Code,
    reward: 100,
    difficulty: "medium" as const,
    status: "in-progress" as const,
    progress: 40,
    path: "/student/technology/skills",
  },
  {
    title: "Internet Safety",
    description: "Stay safe online and protect your personal information",
    icon: Shield,
    reward: 90,
    difficulty: "medium" as const,
    status: "available" as const,
  },
  {
    title: "How Internet Works",
    description: "Understand networks, WiFi, and how data travels",
    icon: Wifi,
    reward: 85,
    difficulty: "medium" as const,
    status: "available" as const,
  },
  {
    title: "Web Explorer",
    description: "Create your first webpage and learn HTML basics",
    icon: Globe,
    reward: 120,
    difficulty: "hard" as const,
    status: "locked" as const,
  },
];

export default function TechnologyPage() {
  const navigate = useNavigate();

  return (
    <SubjectLayout
      title="Technology"
      icon={Laptop}
      iconColor="text-primary"
      progress={20}
      totalLessons={8}
      completedLessons={2}
      xpEarned={120}
    >
      <div className="slide-up" style={{ animationDelay: "150ms" }}>
        <h3 className="mb-4 font-heading font-semibold">Missions & Games</h3>
        <div className="space-y-3">
          {techMissions.map((mission, index) => (
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
