import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, Calendar, DollarSign, TrendingUp, Clock, UserCheck, UserX, Briefcase } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const statsData = [
  { title: "Total Employees", value: "247", change: "+12 this month", icon: Users, color: "text-blue-600", bgColor: "bg-blue-50" },
  { title: "Present Today", value: "232", change: "94% attendance", icon: UserCheck, color: "text-green-600", bgColor: "bg-green-50" },
  { title: "On Leave", value: "12", change: "3 pending requests", icon: Calendar, color: "text-orange-600", bgColor: "bg-orange-50" },
  { title: "Monthly Payroll", value: "$487K", change: "+8% from last month", icon: DollarSign, color: "text-purple-600", bgColor: "bg-purple-50" },
];

const attendanceData = [
  { month: "Jan", present: 92, absent: 8 },
  { month: "Feb", present: 89, absent: 11 },
  { month: "Mar", present: 94, absent: 6 },
  { month: "Apr", present: 91, absent: 9 },
  { month: "May", present: 93, absent: 7 },
  { month: "Jun", present: 95, absent: 5 },
];

const departmentData = [
  { name: "Engineering", value: 85, color: "#3b82f6" },
  { name: "Sales", value: 52, color: "#10b981" },
  { name: "Marketing", value: 38, color: "#f59e0b" },
  { name: "HR", value: 24, color: "#8b5cf6" },
  { name: "Operations", value: 48, color: "#ec4899" },
];

const recentActivities = [
  { id: 1, employee: "Sarah Johnson", action: "submitted a leave request", time: "5 minutes ago", type: "leave" },
  { id: 2, employee: "Michael Chen", action: "completed onboarding", time: "1 hour ago", type: "onboarding" },
  { id: 3, employee: "Emma Davis", action: "updated timesheet", time: "2 hours ago", type: "timesheet" },
  { id: 4, employee: "James Wilson", action: "performance review due", time: "3 hours ago", type: "review" },
  { id: 5, employee: "Lisa Anderson", action: "marked present", time: "4 hours ago", type: "attendance" },
];

const upcomingEvents = [
  { id: 1, title: "Team Building Event", date: "Nov 5, 2025", participants: 45 },
  { id: 2, title: "Performance Reviews", date: "Nov 10, 2025", participants: 120 },
  { id: 3, title: "New Hire Orientation", date: "Nov 15, 2025", participants: 8 },
  { id: 4, title: "Annual Company Meeting", date: "Nov 20, 2025", participants: 247 },
];

export function Dashboard() {
  return (
    <div className="space-y-6 p-8">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Attendance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2} name="Present %" />
                <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} name="Absent %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Upcoming Events */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.employee}</span> {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-4">
                  <div className="bg-purple-50 p-2 rounded-full">
                    <Briefcase className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{event.date}</span>
                      <span>{event.participants} participants</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
