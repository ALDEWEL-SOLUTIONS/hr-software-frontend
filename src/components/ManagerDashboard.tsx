import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Users, Calendar, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function ManagerDashboard() {
  const teamStats = {
    totalMembers: 12,
    activeToday: 11,
    onLeave: 1,
    avgPerformance: 4.2,
  };

  const pendingApprovals = [
    { id: 1, employee: "Sarah Johnson", type: "Annual Leave", duration: "3 days", date: "Nov 10-12" },
    { id: 2, employee: "Mike Chen", type: "Sick Leave", duration: "1 day", date: "Nov 6" },
    { id: 3, employee: "Emily Brown", type: "Remote Work", duration: "2 days", date: "Nov 8-9" },
  ];

  const teamPerformance = [
    { month: "Jul", score: 3.8 },
    { month: "Aug", score: 4.0 },
    { month: "Sep", score: 4.1 },
    { month: "Oct", score: 4.2 },
    { month: "Nov", score: 4.3 },
  ];

  const topPerformers = [
    { name: "Sarah Johnson", score: 4.8, tasks: 45 },
    { name: "Mike Chen", score: 4.6, tasks: 42 },
    { name: "Emily Brown", score: 4.5, tasks: 40 },
  ];

  const recentActivities = [
    { id: 1, action: "Approved leave request", employee: "John Doe", time: "2 hours ago" },
    { id: 2, action: "Completed performance review", employee: "Sarah Johnson", time: "5 hours ago" },
    { id: 3, action: "Updated team goals", employee: "Team", time: "1 day ago" },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Manager Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your team and approve requests
        </p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{teamStats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              {teamStats.activeToday} active today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pending Approvals</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{pendingApprovals.length}</div>
            <p className="text-xs text-muted-foreground">
              Requires your attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Team Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{teamStats.avgPerformance}/5.0</div>
            <p className="text-xs text-muted-foreground">
              Average score
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">On Leave</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{teamStats.onLeave}</div>
            <p className="text-xs text-muted-foreground">
              Member(s) today
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Leave and absence requests waiting for approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingApprovals.map((request) => (
              <div key={request.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium">{request.employee}</p>
                  <p className="text-sm text-muted-foreground">
                    {request.type} • {request.duration}
                  </p>
                  <p className="text-xs text-muted-foreground">{request.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="h-8">
                    <XCircle className="h-3 w-3 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">View All Requests</Button>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Best performing team members this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{performer.name}</p>
                    <p className="text-xs text-muted-foreground">{performer.tasks} tasks completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium">{performer.score}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Team Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance Trend</CardTitle>
          <CardDescription>Average team performance over the last 5 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={teamPerformance}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Area type="monotone" dataKey="score" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your recent management actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 border-b pb-3 last:border-0">
              <div className="bg-blue-100 p-2 rounded">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.employee}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
