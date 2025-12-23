import { AppLayout } from "@/components/navigation";
import { AnimatedProgress } from "@/components/ui/animated-progress";
import { GameBadge } from "@/components/ui/game-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  MoreVertical,
  TrendingUp,
  Clock,
  Award,
  Users,
} from "lucide-react";
import { useParams } from "react-router-dom";

const students = [
  { id: "1", name: "Priya Sharma", progress: 95, coins: 2450, lastActive: "2 min ago", avatar: "PS" },
  { id: "2", name: "Amit Kumar", progress: 88, coins: 2100, lastActive: "15 min ago", avatar: "AK" },
  { id: "3", name: "Sunita Devi", progress: 85, coins: 1980, lastActive: "1 hour ago", avatar: "SD" },
  { id: "4", name: "Ravi Patel", progress: 72, coins: 1650, lastActive: "3 hours ago", avatar: "RP" },
  { id: "5", name: "Meera Singh", progress: 68, coins: 1450, lastActive: "5 hours ago", avatar: "MS" },
  { id: "6", name: "Vikram Rao", progress: 55, coins: 1100, lastActive: "1 day ago", avatar: "VR" },
];

const assignments = [
  { title: "Physics Quiz - Electricity", dueDate: "Dec 22", submitted: 28, total: 32 },
  { title: "Village Task - Solar Energy", dueDate: "Dec 24", submitted: 15, total: 32 },
  { title: "Chemistry Lab Report", dueDate: "Dec 26", submitted: 8, total: 32 },
];

const classStats = [
  { label: "Students", value: 32, icon: Users, color: "text-primary" },
  { label: "Avg Progress", value: "72%", icon: TrendingUp, color: "text-secondary" },
  { label: "Active Today", value: 18, icon: Clock, color: "text-accent" },
  { label: "Achievements", value: 45, icon: Award, color: "text-badge" },
];

export default function TeacherClassDetailPage() {
  const { id } = useParams();

  return (
    <AppLayout role="teacher" title="Grade 8 - Section A">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-4 slide-up">
          <h2 className="font-heading text-2xl font-bold">Grade 8 - Section A</h2>
          <p className="text-muted-foreground">Class ID: {id}</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-4 gap-2 slide-up" style={{ animationDelay: "100ms" }}>
          {classStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card p-2 text-center"
            >
              <stat.icon className={`mx-auto mb-1 h-4 w-4 ${stat.color}`} />
              <p className="font-heading text-sm font-bold">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="students" className="slide-up" style={{ animationDelay: "150ms" }}>
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="students" className="flex-1">Students</TabsTrigger>
            <TabsTrigger value="assignments" className="flex-1">Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-3">
            {students.map((student, index) => (
              <div
                key={student.id}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-heading font-bold text-primary text-sm">
                  {student.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{student.name}</p>
                    {index < 3 && (
                      <GameBadge variant="secondary" size="sm">Top</GameBadge>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{student.progress}% progress</span>
                    <span>•</span>
                    <span>{student.coins} coins</span>
                  </div>
                  <AnimatedProgress value={student.progress} size="sm" className="mt-2" />
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="assignments" className="space-y-3">
            {assignments.map((assignment, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      Due: {assignment.dueDate}
                    </p>
                  </div>
                  <GameBadge variant="outline" size="sm">
                    {assignment.submitted}/{assignment.total}
                  </GameBadge>
                </div>
              <AnimatedProgress 
                  value={(assignment.submitted / assignment.total) * 100} 
                  variant="success"
                />
              </div>
            ))}
            
            <Button className="w-full mt-4">
              Create New Assignment
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
