import { SubjectLayout } from "@/components/student/SubjectLayout";
import { GameMissionCard } from "@/components/student/GameMissionCard";
import { FlaskConical, Atom, Droplets, Flame, ShieldAlert, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const chemistryMissions = [
  {
    title: "Chemical Reactions",
    description: "Balance equations and build molecules from atoms",
    icon: FlaskConical,
    reward: 100,
    difficulty: "medium" as const,
    status: "available" as const,
    progress: 0,
    path: "/student/chemistry/level/1",
  },
  {
    title: "Acids & Bases",
    description: "Master the pH scale and neutralize dangerous substances",
    icon: Droplets,
    reward: 150,
    difficulty: "medium" as const,
    status: "available" as const,
    path: "/student/chemistry/level/2",
  },
  {
    title: "Element Hunter",
    description: "Hunt for elements based on their unique properties",
    icon: Atom,
    reward: 200,
    difficulty: "medium" as const,
    status: "available" as const,
    path: "/student/chemistry/level/3",
  },
  {
    title: "Bond Master",
    description: "Form covalent and ionic bonds to create stable molecules",
    icon: Link2,
    reward: 250,
    difficulty: "hard" as const,
    status: "available" as const,
    path: "/student/chemistry/level/4",
  },
  {
    title: "Lab Safety Hero",
    description: "Identify hazards and keeping the laboratory safe",
    icon: ShieldAlert,
    reward: 300,
    difficulty: "easy" as const,
    status: "available" as const,
    path: "/student/chemistry/level/5",
  },
];

export default function ChemistryPage() {
  const navigate = useNavigate();

  return (
    <SubjectLayout
      title="Chemistry"
      icon={FlaskConical}
      iconColor="text-secondary"
      progress={0}
      totalLessons={15}
      completedLessons={0}
      xpEarned={0}
    >
      <div className="slide-up" style={{ animationDelay: "150ms" }}>
        <h3 className="mb-4 font-heading font-semibold">Missions & Games</h3>
        <div className="space-y-3">
          {chemistryMissions.map((mission, index) => (
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
