import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Calendar, Clock, DollarSign, TrendingUp, Bell, FileText, Award, User } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export function EmployeeDashboard() {
  const employee = {
    name: "John Doe",
    position: "Software Engineer",
    department: "Engineering",
    remainingLeave: 12,
    usedLeave: 8,
    totalLeave: 20,
  };

  const recentActivities = [
    { id: 1, type: "Leave", action: "Annual Leave Approved", date: "Nov 1, 2025", status: "approved" },
    { id: 2, type: "Attendance", action: "Check-in", date: "Nov 5, 2025", time: "09:00 AM" },
    { id: 3, type: "Performance", action: "Q4 Review Scheduled", date: "Nov 10, 2025", status: "pending" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Team Meeting", date: "Nov 6, 2025", time: "2:00 PM" },
    { id: 2, title: "Performance Review", date: "Nov 10, 2025", time: "10:00 AM" },
    { id: 3, title: "Training Session", date: "Nov 15, 2025", time: "3:00 PM" },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Welcome, {employee.name}</h1>
        <p className="text-muted-foreground">
          {employee.position} • {employee.department}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Leave Balance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{employee.remainingLeave} days</div>
            <p className="text-xs text-muted-foreground">
              Out of {employee.totalLeave} total
            </p>
            <Progress value={(employee.remainingLeave / employee.totalLeave) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">98%</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">4.5/5.0</div>
            <p className="text-xs text-muted-foreground">
              Last review score
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">3</div>
            <p className="text-xs text-muted-foreground">
              Unread messages
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded">
                    {activity.type === "Leave" && <Calendar className="h-4 w-4 text-blue-600" />}
                    {activity.type === "Attendance" && <Clock className="h-4 w-4 text-blue-600" />}
                    {activity.type === "Performance" && <Award className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.date} {activity.time && `• ${activity.time}`}
                    </p>
                  </div>
                </div>
                {activity.status && (
                  <Badge variant={activity.status === "approved" ? "default" : "secondary"}>
                    {activity.status}
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your scheduled meetings and tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date} • {event.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <Calendar className="h-5 w-5" />
              <span>Request Leave</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <Clock className="h-5 w-5" />
              <span>View Attendance</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <DollarSign className="h-5 w-5" />
              <span>Payslips</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 p-4">
              <User className="h-5 w-5" />
              <span>My Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
