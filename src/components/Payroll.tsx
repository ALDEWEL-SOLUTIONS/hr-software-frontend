import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DollarSign, Download, TrendingUp, Users, CreditCard, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const payrollSummary = [
  { month: "Jun", amount: 465000 },
  { month: "Jul", amount: 472000 },
  { month: "Aug", amount: 468000 },
  { month: "Sep", amount: 481000 },
  { month: "Oct", amount: 487000 },
  { month: "Nov", amount: 495000 },
];

const employeePayroll = [
  { id: 1, name: "Sarah Johnson", position: "Senior Developer", baseSalary: 95000, bonus: 5000, deductions: 12000, netPay: 88000, status: "Processed" },
  { id: 2, name: "Michael Chen", position: "Sales Manager", baseSalary: 78000, bonus: 8000, deductions: 9500, netPay: 76500, status: "Processed" },
  { id: 3, name: "Emma Davis", position: "Marketing Lead", baseSalary: 72000, bonus: 3000, deductions: 8800, netPay: 66200, status: "Pending" },
  { id: 4, name: "James Wilson", position: "Full Stack Developer", baseSalary: 88000, bonus: 4000, deductions: 11000, netPay: 81000, status: "Processed" },
  { id: 5, name: "Lisa Anderson", position: "HR Manager", baseSalary: 82000, bonus: 3500, deductions: 10200, netPay: 75300, status: "Processed" },
  { id: 6, name: "David Brown", position: "Operations Director", baseSalary: 105000, bonus: 10000, deductions: 14500, netPay: 100500, status: "Pending" },
];

const payrollStats = [
  { title: "Total Payroll", value: "$487,000", change: "+2.8% from last month", icon: DollarSign, color: "text-green-600", bgColor: "bg-green-50" },
  { title: "Employees Paid", value: "247", change: "100% processed", icon: Users, color: "text-blue-600", bgColor: "bg-blue-50" },
  { title: "Average Salary", value: "$78,450", change: "+1.2% from last month", icon: TrendingUp, color: "text-purple-600", bgColor: "bg-purple-50" },
  { title: "Total Bonuses", value: "$45,200", change: "12 employees", icon: CreditCard, color: "text-orange-600", bgColor: "bg-orange-50" },
];

const payslips = [
  { id: 1, month: "October 2025", employees: 247, amount: "$487,000", date: "2025-10-31", status: "Completed" },
  { id: 2, month: "September 2025", employees: 245, amount: "$481,000", date: "2025-09-30", status: "Completed" },
  { id: 3, month: "August 2025", employees: 242, amount: "$468,000", date: "2025-08-31", status: "Completed" },
  { id: 4, month: "July 2025", employees: 240, amount: "$472,000", date: "2025-07-31", status: "Completed" },
];

export function Payroll() {
  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1>Payroll Management</h1>
          <p className="text-muted-foreground">Manage employee compensation and payroll processing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>Process Payroll</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {payrollStats.map((stat, index) => {
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

      {/* Payroll Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll Trend (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={payrollSummary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="amount" fill="#3b82f6" name="Total Payroll" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payroll Details */}
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Month</TabsTrigger>
          <TabsTrigger value="history">Payroll History</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employee Payroll - October 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Base Salary</TableHead>
                    <TableHead>Bonus</TableHead>
                    <TableHead>Deductions</TableHead>
                    <TableHead>Net Pay</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeePayroll.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>${employee.baseSalary.toLocaleString()}</TableCell>
                      <TableCell className="text-green-600">${employee.bonus.toLocaleString()}</TableCell>
                      <TableCell className="text-red-600">-${employee.deductions.toLocaleString()}</TableCell>
                      <TableCell className="font-bold">${employee.netPay.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={employee.status === "Processed" ? "default" : "secondary"}>
                          {employee.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View Slip
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Showing {employeePayroll.length} employees
                </p>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Net Payroll</p>
                  <p className="text-2xl font-bold">
                    ${employeePayroll.reduce((sum, emp) => sum + emp.netPay, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payroll History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Processed Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payslips.map((payslip) => (
                    <TableRow key={payslip.id}>
                      <TableCell className="font-medium">{payslip.month}</TableCell>
                      <TableCell>{payslip.employees}</TableCell>
                      <TableCell>{payslip.amount}</TableCell>
                      <TableCell>{payslip.date}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          {payslip.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
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
  );
}
