import { AppLayout } from "@/components/navigation";
import { GameCard } from "@/components/ui/game-card";
import { AnimatedProgress } from "@/components/ui/animated-progress";
import { GameBadge } from "@/components/ui/game-badge";
import { Users, TrendingUp, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const classes = [
  {
    id: "1",
    name: "Grade 8 - Section A",
    students: 32,
    avgProgress: 72,
    topPerformer: "Priya Sharma",
    pendingTasks: 5,
  },
  {
    id: "2",
    name: "Grade 8 - Section B",
    students: 28,
    avgProgress: 65,
    topPerformer: "Amit Kumar",
    pendingTasks: 8,
  },
  {
    id: "3",
    name: "Grade 9 - Section A",
    students: 35,
    avgProgress: 78,
    topPerformer: "Sunita Devi",
    pendingTasks: 3,
  },
  {
    id: "4",
    name: "Grade 7 - Section B",
    students: 30,
    avgProgress: 58,
    topPerformer: "Ravi Patel",
    pendingTasks: 12,
  },
];

export default function TeacherClassesPage() {
  return (
    <AppLayout role="teacher" title="My Classes">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between slide-up">
          <div>
            <h2 className="font-heading text-2xl font-bold">My Classes</h2>
            <p className="text-muted-foreground">Manage your students</p>
          </div>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Add Class
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="mb-6 grid grid-cols-2 gap-3 slide-up" style={{ animationDelay: "100ms" }}>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Users className="mx-auto mb-2 h-6 w-6 text-primary" />
            <p className="font-heading text-2xl font-bold">125</p>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <TrendingUp className="mx-auto mb-2 h-6 w-6 text-secondary" />
            <p className="font-heading text-2xl font-bold">68%</p>
            <p className="text-sm text-muted-foreground">Avg Progress</p>
          </div>
        </div>

        {/* Classes List */}
        <div className="space-y-4 slide-up" style={{ animationDelay: "150ms" }}>
          {classes.map((cls) => (
            <Link
              key={cls.id}
              to={`/teacher/class/${cls.id}`}
              className="block rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-heading font-semibold">{cls.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {cls.students} students
                  </p>
                </div>
                {cls.pendingTasks > 0 && (
                  <GameBadge variant="accent" size="sm">
                    {cls.pendingTasks} pending
                  </GameBadge>
                )}
              </div>

              <div className="mb-3">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg Progress</span>
                  <span className="font-medium">{cls.avgProgress}%</span>
                </div>
                <AnimatedProgress value={cls.avgProgress} />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Top performer:</span>
                <span className="font-medium text-secondary">{cls.topPerformer}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
