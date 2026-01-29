import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { UserCheck, UserX, Clock, AlertCircle, Download } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useState } from "react";

const attendanceStats = [
  { title: "Present Today", value: "232", percentage: "94%", icon: UserCheck, color: "text-green-600", bgColor: "bg-green-50" },
  { title: "Absent", value: "12", percentage: "4.9%", icon: UserX, color: "text-red-600", bgColor: "bg-red-50" },
  { title: "Late Arrivals", value: "8", percentage: "3.2%", icon: Clock, color: "text-orange-600", bgColor: "bg-orange-50" },
  { title: "On Leave", value: "3", percentage: "1.2%", icon: AlertCircle, color: "text-blue-600", bgColor: "bg-blue-50" },
];

const todayAttendance = [
  { id: 1, name: "Sarah Johnson", checkIn: "08:45 AM", checkOut: "05:30 PM", status: "Present", hours: "8.75", location: "Office" },
  { id: 2, name: "Michael Chen", checkIn: "09:15 AM", checkOut: "-", status: "Late", hours: "-", location: "Office" },
  { id: 3, name: "Emma Davis", checkIn: "08:30 AM", checkOut: "05:15 PM", status: "Present", hours: "8.75", location: "Remote" },
  { id: 4, name: "James Wilson", checkIn: "-", checkOut: "-", status: "Absent", hours: "0", location: "-" },
  { id: 5, name: "Lisa Anderson", checkIn: "08:55 AM", checkOut: "05:20 PM", status: "Present", hours: "8.42", location: "Office" },
  { id: 6, name: "David Brown", checkIn: "09:30 AM", checkOut: "-", status: "Late", hours: "-", location: "Remote" },
  { id: 7, name: "Emily Taylor", checkIn: "08:40 AM", checkOut: "05:25 PM", status: "Present", hours: "8.75", location: "Office" },
  { id: 8, name: "Robert Martinez", checkIn: "-", checkOut: "-", status: "On Leave", hours: "0", location: "-" },
];

const attendanceHistory = [
  { employee: "Sarah Johnson", week1: 100, week2: 100, week3: 100, week4: 80, total: 95 },
  { employee: "Michael Chen", week1: 80, week2: 100, week3: 80, week4: 100, total: 90 },
  { employee: "Emma Davis", week1: 100, week2: 100, week3: 100, week4: 100, total: 100 },
  { employee: "James Wilson", week1: 100, week2: 80, week3: 60, week4: 80, total: 80 },
  { employee: "Lisa Anderson", week1: 100, week2: 100, week3: 100, week4: 100, total: 100 },
];

export function Attendance() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Present":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Present</Badge>;
      case "Absent":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Absent</Badge>;
      case "Late":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Late</Badge>;
      case "On Leave":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">On Leave</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1>Attendance Management</h1>
          <p className="text-muted-foreground">Track and manage employee attendance and work hours</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {attendanceStats.map((stat, index) => {
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
                <p className="text-xs text-muted-foreground mt-1">{stat.percentage} of workforce</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="today" className="space-y-4">
            <TabsList>
              <TabsTrigger value="today">Today's Attendance</TabsTrigger>
              <TabsTrigger value="history">Attendance History</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Attendance - October 28, 2025</CardTitle>
                    <Badge variant="outline">Live Updates</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead>Hours</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {todayAttendance.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs">{getInitials(record.name)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{record.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{record.checkIn}</TableCell>
                          <TableCell>{record.checkOut}</TableCell>
                          <TableCell>{record.hours}</TableCell>
                          <TableCell>{record.location}</TableCell>
                          <TableCell>{getStatusBadge(record.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Attendance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Week 1</TableHead>
                        <TableHead>Week 2</TableHead>
                        <TableHead>Week 3</TableHead>
                        <TableHead>Week 4</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceHistory.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{record.employee}</TableCell>
                          <TableCell>{record.week1}%</TableCell>
                          <TableCell>{record.week2}%</TableCell>
                          <TableCell>{record.week3}%</TableCell>
                          <TableCell>{record.week4}%</TableCell>
                          <TableCell>
                            <Badge variant={record.total >= 90 ? "default" : "secondary"}>
                              {record.total}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Calendar</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average Attendance</span>
                  <span className="font-bold">93.2%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Perfect Attendance</span>
                  <span className="font-bold">142 employees</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Late Arrivals (Month)</span>
                  <span className="font-bold">45 incidents</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average Work Hours</span>
                  <span className="font-bold">8.5 hrs/day</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Frequent Late Arrivals</p>
                    <p className="text-xs text-muted-foreground">3 employees this week</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Unexcused Absences</p>
                    <p className="text-xs text-muted-foreground">2 cases pending review</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
