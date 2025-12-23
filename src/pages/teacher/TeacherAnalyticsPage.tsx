import { AppLayout } from "@/components/navigation";
import { GameBadge } from "@/components/ui/game-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
} from "lucide-react";

const weeklyProgress = [
  { day: "Mon", progress: 65 },
  { day: "Tue", progress: 72 },
  { day: "Wed", progress: 68 },
  { day: "Thu", progress: 80 },
  { day: "Fri", progress: 75 },
  { day: "Sat", progress: 45 },
  { day: "Sun", progress: 30 },
];

const subjectPerformance = [
  { subject: "Physics", score: 72, color: "hsl(var(--primary))" },
  { subject: "Chemistry", score: 65, color: "hsl(var(--secondary))" },
  { subject: "Math", score: 85, color: "hsl(var(--accent))" },
  { subject: "Biology", score: 58, color: "hsl(var(--badge))" },
  { subject: "Tech", score: 78, color: "hsl(var(--destructive))" },
];

const engagementData = [
  { name: "Active", value: 68, color: "hsl(var(--secondary))" },
  { name: "Moderate", value: 22, color: "hsl(var(--accent))" },
  { name: "Inactive", value: 10, color: "hsl(var(--muted))" },
];

const topMetrics = [
  { label: "Avg. Score", value: "72%", change: "+5%", positive: true },
  { label: "Completion Rate", value: "85%", change: "+12%", positive: true },
  { label: "Active Time", value: "4.2h", change: "-0.5h", positive: false },
  { label: "Tasks Done", value: "156", change: "+23", positive: true },
];

export default function TeacherAnalyticsPage() {
  return (
    <AppLayout role="teacher" title="Analytics">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between slide-up">
          <div>
            <h2 className="font-heading text-2xl font-bold">Analytics</h2>
            <p className="text-muted-foreground">Class performance insights</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-6 grid grid-cols-2 gap-3 slide-up" style={{ animationDelay: "100ms" }}>
          {topMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-border bg-card p-3"
            >
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <div className="mt-1 flex items-end justify-between">
                <p className="font-heading text-xl font-bold">{metric.value}</p>
                <div className={`flex items-center text-xs ${metric.positive ? "text-secondary" : "text-destructive"}`}>
                  {metric.positive ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <Tabs defaultValue="progress" className="slide-up" style={{ animationDelay: "150ms" }}>
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="progress" className="flex-1">Progress</TabsTrigger>
            <TabsTrigger value="subjects" className="flex-1">Subjects</TabsTrigger>
            <TabsTrigger value="engagement" className="flex-1">Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="progress">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-4 font-heading font-semibold">Weekly Learning Progress</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyProgress}>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="progress" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="subjects">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-4 font-heading font-semibold">Subject Performance</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformance} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis 
                      type="category" 
                      dataKey="subject" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      width={60}
                    />
                    <Bar 
                      dataKey="score" 
                      radius={[0, 4, 4, 0]}
                    >
                      {subjectPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="engagement">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-4 font-heading font-semibold">Student Engagement</h3>
              <div className="flex items-center justify-center gap-8">
                <div className="h-[150px] w-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={engagementData}
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {engagementData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {engagementData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-6 space-y-3 slide-up" style={{ animationDelay: "200ms" }}>
          <Button className="w-full" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Full Report
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
