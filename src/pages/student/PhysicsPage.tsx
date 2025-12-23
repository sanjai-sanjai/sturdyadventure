import { SubjectLayout } from "@/components/student/SubjectLayout";
import { GameMissionCard } from "@/components/student/GameMissionCard";
import { Atom, Target, Zap, Wind, Waves, Feather } from "lucide-react";
import { useNavigate } from "react-router-dom";

const physicsMissions = [
  {
    title: "Trajectory Lock",
    description: "Launch the ball and nail the perfect landing using angle and speed",
    icon: Target,
    reward: 150,
    difficulty: "medium" as const,
    status: "available" as const,
    path: "/student/physics/trajectory-lock",
  },
  {
    title: "Voltage Trap",
    description: "Power the circuit without blowing the fuse using voltage control",
    icon: Zap,
    reward: 120,
    difficulty: "medium" as const,
    status: "available" as const,
    path: "/student/physics/voltage-trap",
  },
  {
    title: "Force Balance",
    description: "Push the box and stop it exactly on target—inertia rules here",
    icon: Wind,
    reward: 100,
    difficulty: "easy" as const,
    status: "available" as const,
    path: "/student/physics/force-balance",
  },
  {
    title: "Wave Rider",
    description: "Shape the wave to match all gates using frequency and amplitude",
    icon: Waves,
    reward: 140,
    difficulty: "hard" as const,
    status: "available" as const,
    path: "/student/physics/wave-rider",
  },
  {
    title: "Gravity Drop",
    description: "Drop at the right time to hit the moving target—timing is everything",
    icon: Feather,
    reward: 110,
    difficulty: "medium" as const,
    status: "available" as const,
    path: "/student/physics/gravity-drop",
  },
];

export default function PhysicsPage() {
  const navigate = useNavigate();

  return (
    <SubjectLayout
      title="Physics"
      icon={Atom}
      iconColor="text-primary"
      progress={65}
      totalLessons={12}
      completedLessons={8}
      xpEarned={450}
    >
      <div className="slide-up" style={{ animationDelay: "150ms" }}>
        <h3 className="mb-4 font-heading font-semibold">Missions & Games</h3>
        <div className="space-y-3">
          {physicsMissions.map((mission, index) => (
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
