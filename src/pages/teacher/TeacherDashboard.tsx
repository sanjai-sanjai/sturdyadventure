import { AppLayout } from "@/components/navigation";
import { GameCard } from "@/components/ui/game-card";
import { GameBadge } from "@/components/ui/game-badge";
import {
  Users,
  ClipboardCheck,
  TrendingUp,
  Bell,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const classStats = [
  { label: "Total Students", value: 45, icon: Users, color: "text-primary" },
  { label: "Pending Tasks", value: 12, icon: ClipboardCheck, color: "text-accent" },
  { label: "Avg Progress", value: "68%", icon: TrendingUp, color: "text-secondary" },
];

const recentActivity = [
  { student: "Priya", action: "completed Physics lesson", time: "5 min ago" },
  { student: "Amit", action: "submitted village task", time: "15 min ago" },
  { student: "Ravi", action: "earned 50 PlayCoins", time: "1 hour ago" },
];

const topStudents = [
  { name: "Priya Sharma", progress: 95, coins: 2450 },
  { name: "Amit Kumar", progress: 88, coins: 2100 },
  { name: "Sunita Devi", progress: 85, coins: 1980 },
];

export default function TeacherDashboard() {
  return (
    <AppLayout role="teacher" title="Dashboard">
      <div className="px-4 py-6">
        {/* Welcome */}
        <div className="mb-6 slide-up">
          <h2 className="font-heading text-2xl font-bold">
            Good morning, <span className="text-secondary">Mrs. Sharma!</span>
          </h2>
          <p className="mt-1 text-muted-foreground">
            Here's your class overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-3 gap-3 slide-up" style={{ animationDelay: "100ms" }}>
          {classStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-3 text-center"
            >
              <div className="mb-1 flex justify-center">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="font-heading text-lg font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Pending Verifications */}
        <Link 
          to="/teacher/tasks/verification"
          className="mb-6 flex items-center justify-between rounded-xl border-2 border-accent/30 bg-accent/10 p-4 transition-colors hover:border-accent slide-up"
          style={{ animationDelay: "150ms" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <ClipboardCheck className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-heading font-semibold">12 Tasks Pending</p>
              <p className="text-sm text-muted-foreground">Review student submissions</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>

        {/* Top Students */}
        <div className="mb-6 slide-up" style={{ animationDelay: "200ms" }}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-heading font-semibold">Top Students</h3>
            <Link to="/teacher/analytics" className="text-sm text-primary">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {topStudents.map((student, index) => (
              <div
                key={student.name}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-heading font-bold text-primary">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {student.progress}% • {student.coins} PlayCoins
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="slide-up" style={{ animationDelay: "250ms" }}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-heading font-semibold">Recent Activity</h3>
            <GameBadge variant="primary" size="sm" icon={<Bell className="h-3 w-3" />}>
              Live
            </GameBadge>
          </div>
          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg bg-muted/50 p-3"
              >
                <div className="h-2 w-2 rounded-full bg-secondary" />
                <p className="flex-1 text-sm">
                  <span className="font-medium">{activity.student}</span>{" "}
                  {activity.action}
                </p>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
