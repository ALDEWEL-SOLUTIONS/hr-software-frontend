import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FileText, Download, Calendar as CalendarIcon, TrendingUp, Users, DollarSign, Clock, Award, Filter } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

const employeeReportData = [
  { month: "Jan", total: 145, active: 142, onLeave: 3 },
  { month: "Feb", total: 148, active: 145, onLeave: 3 },
  { month: "Mar", total: 152, active: 148, onLeave: 4 },
  { month: "Apr", total: 155, active: 151, onLeave: 4 },
  { month: "May", total: 158, active: 154, onLeave: 4 },
  { month: "Jun", total: 162, active: 158, onLeave: 4 },
];

const attendanceData = [
  { month: "Jan", present: 92, absent: 5, late: 3 },
  { month: "Feb", present: 94, absent: 4, late: 2 },
  { month: "Mar", present: 91, absent: 6, late: 3 },
  { month: "Apr", present: 95, absent: 3, late: 2 },
  { month: "May", present: 93, absent: 4, late: 3 },
  { month: "Jun", present: 96, absent: 2, late: 2 },
];

const payrollData = [
  { month: "Jan", salaries: 425000, benefits: 85000, taxes: 95000 },
  { month: "Feb", salaries: 428000, benefits: 86000, taxes: 96000 },
  { month: "Mar", salaries: 432000, benefits: 87000, taxes: 97000 },
  { month: "Apr", salaries: 438000, benefits: 88000, taxes: 98000 },
  { month: "May", salaries: 445000, benefits: 89000, taxes: 99000 },
  { month: "Jun", salaries: 452000, benefits: 90000, taxes: 100000 },
];

const leaveData = [
  { type: "Sick Leave", value: 245, color: "#E07A5F" },
  { type: "Annual Leave", value: 420, color: "#88B04B" },
  { type: "Personal Leave", value: 180, color: "#4A6572" },
  { type: "Unpaid Leave", value: 95, color: "#8A8A8A" },
];

const departmentData = [
  { department: "Engineering", headcount: 45, budget: 180000 },
  { department: "Sales", headcount: 28, budget: 112000 },
  { department: "Marketing", headcount: 18, budget: 72000 },
  { department: "HR", headcount: 12, budget: 48000 },
  { department: "Finance", headcount: 15, budget: 60000 },
  { department: "Operations", headcount: 22, budget: 88000 },
];

const performanceData = [
  { quarter: "Q1", score: 3.8, excellent: 25, good: 45, average: 20, poor: 10 },
  { quarter: "Q2", score: 4.0, excellent: 30, good: 42, average: 18, poor: 10 },
  { quarter: "Q3", score: 4.1, excellent: 32, good: 45, average: 15, poor: 8 },
  { quarter: "Q4", score: 4.2, excellent: 35, good: 43, average: 15, poor: 7 },
];

export function Reports() {
  const [dateRange, setDateRange] = useState<Date | undefined>(new Date());

  const exportReport = (type: string) => {
    // In production, this would generate and download the actual report
    console.log(`Exporting ${type} report...`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1>Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and data analysis
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {dateRange ? format(dateRange, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={dateRange}
                onSelect={setDateRange}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select defaultValue="2024">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-3xl mt-1">142</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Employees</p>
                <p className="text-3xl mt-1">162</p>
              </div>
              <div className="bg-accent/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-accent" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-sm text-muted-foreground">+2.5% growth</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
                <p className="text-3xl mt-1">96%</p>
              </div>
              <div className="bg-secondary/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <TrendingUp className="h-4 w-4 text-secondary" />
              <span className="text-sm text-muted-foreground">+3% improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#F4A261]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Payroll</p>
                <p className="text-3xl mt-1">$642K</p>
              </div>
              <div className="bg-[#F4A261]/10 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-[#F4A261]" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <TrendingUp className="h-4 w-4 text-[#F4A261]" />
              <span className="text-sm text-muted-foreground">+1.6% vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full lg:w-auto">
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="leave">Leave</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Employee Growth Trend</CardTitle>
                <CardDescription>Monthly employee count over the last 6 months</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => exportReport("employees")}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={employeeReportData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#88B04B" strokeWidth={2} />
                  <Line type="monotone" dataKey="active" stroke="#4A6572" strokeWidth={2} />
                  <Line type="monotone" dataKey="onLeave" stroke="#E07A5F" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Department Breakdown</CardTitle>
              <CardDescription>Headcount and budget allocation by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {departmentData.map((dept) => (
                  <div key={dept.department} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex-1">
                      <p>{dept.department}</p>
                      <p className="text-sm text-muted-foreground">
                        {dept.headcount} employees
                      </p>
                    </div>
                    <div className="text-right">
                      <p>${(dept.budget / 1000).toFixed(0)}K</p>
                      <Badge variant="outline" className="border-primary text-primary">
                        {((dept.headcount / 140) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Attendance Trends</CardTitle>
                <CardDescription>Monthly attendance statistics</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => exportReport("attendance")}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" fill="#88B04B" />
                  <Bar dataKey="late" fill="#E07A5F" />
                  <Bar dataKey="absent" fill="#8A8A8A" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Average Presence</p>
                  <p className="text-4xl mt-2 text-primary">93.8%</p>
                  <p className="text-sm text-muted-foreground mt-2">Last 6 months</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Late Arrivals</p>
                  <p className="text-4xl mt-2 text-accent">2.5%</p>
                  <p className="text-sm text-muted-foreground mt-2">Average rate</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Absence Rate</p>
                  <p className="text-4xl mt-2 text-secondary">3.7%</p>
                  <p className="text-sm text-muted-foreground mt-2">Below industry avg</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payroll Distribution</CardTitle>
                <CardDescription>Monthly payroll breakdown over time</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => exportReport("payroll")}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={payrollData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="salaries" fill="#88B04B" stackId="a" />
                  <Bar dataKey="benefits" fill="#4A6572" stackId="a" />
                  <Bar dataKey="taxes" fill="#E07A5F" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Compensation</CardTitle>
                <CardDescription>June 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Base Salaries</span>
                  <span>$452,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Benefits</span>
                  <span>$90,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Taxes & Deductions</span>
                  <span>$100,000</span>
                </div>
                <div className="pt-4 border-t flex justify-between items-center">
                  <span>Total</span>
                  <span className="text-primary">$642,000</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Year-to-Date Summary</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Disbursed</span>
                  <span>$2,620,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Average per Employee</span>
                  <span>$16,173</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Growth vs 2023</span>
                  <Badge className="bg-primary">+6.2%</Badge>
                </div>
                <div className="pt-4 border-t flex justify-between items-center">
                  <span className="text-muted-foreground">Projected Annual</span>
                  <span className="text-primary">$5,240,000</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leave" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Leave Distribution</CardTitle>
                  <CardDescription>By leave type</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => exportReport("leave")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={leaveData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {leaveData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leave Statistics</CardTitle>
                <CardDescription>Year to date summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {leaveData.map((item) => (
                  <div key={item.type} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                      <span>{item.type}</span>
                    </div>
                    <div className="text-right">
                      <p>{item.value} days</p>
                      <p className="text-sm text-muted-foreground">
                        {((item.value / 940) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t flex justify-between items-center">
                  <span>Total Leave Days</span>
                  <span className="text-primary">940 days</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Leave Requests</CardTitle>
              <CardDescription>Latest 5 approved leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Sarah Johnson", type: "Annual Leave", dates: "Jul 15-19, 2024", days: 5 },
                  { name: "Michael Chen", type: "Sick Leave", dates: "Jul 12, 2024", days: 1 },
                  { name: "Emma Wilson", type: "Personal Leave", dates: "Jul 8-9, 2024", days: 2 },
                  { name: "David Brown", type: "Annual Leave", dates: "Jul 1-5, 2024", days: 5 },
                  { name: "Lisa Anderson", type: "Sick Leave", dates: "Jun 28-29, 2024", days: 2 },
                ].map((leave, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div>
                      <p>{leave.name}</p>
                      <p className="text-sm text-muted-foreground">{leave.dates}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="border-primary text-primary">
                        {leave.type}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{leave.days} days</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Performance Ratings Distribution</CardTitle>
                <CardDescription>Quarterly performance review trends</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => exportReport("performance")}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="excellent" fill="#88B04B" />
                  <Bar dataKey="good" fill="#4A6572" />
                  <Bar dataKey="average" fill="#E07A5F" />
                  <Bar dataKey="poor" fill="#8A8A8A" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-primary" />
                  <p className="text-sm text-muted-foreground">Excellent</p>
                </div>
                <p className="text-3xl">35%</p>
                <p className="text-sm text-muted-foreground mt-1">+3% vs Q3</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-secondary">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-secondary" />
                  <p className="text-sm text-muted-foreground">Good</p>
                </div>
                <p className="text-3xl">43%</p>
                <p className="text-sm text-muted-foreground mt-1">-2% vs Q3</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-accent" />
                  <p className="text-sm text-muted-foreground">Average</p>
                </div>
                <p className="text-3xl">15%</p>
                <p className="text-sm text-muted-foreground mt-1">Same as Q3</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-muted-foreground">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Needs Improvement</p>
                </div>
                <p className="text-3xl">7%</p>
                <p className="text-sm text-muted-foreground mt-1">-1% vs Q3</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Q4 2024 highest rated employees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Sarah Johnson", department: "Engineering", rating: 4.9, reviews: 12 },
                  { name: "Michael Chen", department: "Sales", rating: 4.8, reviews: 10 },
                  { name: "Emma Wilson", department: "Marketing", rating: 4.7, reviews: 11 },
                  { name: "David Brown", department: "Engineering", rating: 4.7, reviews: 9 },
                  { name: "Lisa Anderson", department: "HR", rating: 4.6, reviews: 8 },
                ].map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div>
                        <p>{performer.name}</p>
                        <p className="text-sm text-muted-foreground">{performer.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span>{performer.rating}/5.0</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{performer.reviews} reviews</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
