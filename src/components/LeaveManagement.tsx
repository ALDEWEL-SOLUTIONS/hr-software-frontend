import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Calendar, Plus, Check, X, Clock, Umbrella } from "lucide-react";
import { Calendar as CalendarComponent } from "./ui/calendar";

const leaveRequests = [
  { id: 1, employee: "Sarah Johnson", type: "Annual Leave", startDate: "2025-11-15", endDate: "2025-11-20", days: 6, status: "Pending", reason: "Family vacation" },
  { id: 2, employee: "Michael Chen", type: "Sick Leave", startDate: "2025-10-28", endDate: "2025-10-29", days: 2, status: "Approved", reason: "Medical appointment" },
  { id: 3, employee: "Emma Davis", type: "Annual Leave", startDate: "2025-12-01", endDate: "2025-12-10", days: 10, status: "Pending", reason: "Holiday trip" },
  { id: 4, employee: "James Wilson", type: "Personal Leave", startDate: "2025-11-05", endDate: "2025-11-05", days: 1, status: "Approved", reason: "Personal matters" },
  { id: 5, employee: "Lisa Anderson", type: "Sick Leave", startDate: "2025-10-25", endDate: "2025-10-26", days: 2, status: "Rejected", reason: "Flu symptoms" },
];

const leaveBalance = [
  { employee: "Sarah Johnson", annual: 15, sick: 10, personal: 5, used: 8 },
  { employee: "Michael Chen", annual: 12, sick: 8, personal: 4, used: 6 },
  { employee: "Emma Davis", annual: 18, sick: 10, personal: 5, used: 3 },
  { employee: "James Wilson", annual: 14, sick: 9, personal: 5, used: 12 },
  { employee: "Lisa Anderson", annual: 16, sick: 10, personal: 5, used: 7 },
];

const upcomingLeaves = [
  { employee: "Sarah Johnson", type: "Annual Leave", date: "Nov 15 - Nov 20" },
  { employee: "Emma Davis", type: "Annual Leave", date: "Dec 1 - Dec 10" },
  { employee: "Robert Martinez", type: "Sick Leave", date: "Oct 28 - Nov 1" },
];

export function LeaveManagement() {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Approved</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Rejected</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1>Leave Management</h1>
          <p className="text-muted-foreground">Manage employee leave requests and balances</p>
        </div>
        <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Leave Request
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Leave Request</DialogTitle>
              <DialogDescription>Fill in the details for your leave request</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="employee">Employee</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="michael">Michael Chen</SelectItem>
                    <SelectItem value="emma">Emma Davis</SelectItem>
                    <SelectItem value="james">James Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="leaveType">Leave Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual Leave</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                    <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <input type="date" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors" />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <input type="date" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea id="reason" placeholder="Enter reason for leave..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsRequestDialogOpen(false)}>Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved This Month</CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave Today</CardTitle>
            <Umbrella className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4.9% of workforce</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Leaves</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Main Content - Leave Requests */}
        <div className="md:col-span-2">
          <Tabs defaultValue="requests" className="space-y-4">
            <TabsList>
              <TabsTrigger value="requests">Leave Requests</TabsTrigger>
              <TabsTrigger value="balance">Leave Balance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="requests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Leave Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Days</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaveRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.employee}</TableCell>
                          <TableCell>{request.type}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {request.startDate} to {request.endDate}
                            </div>
                          </TableCell>
                          <TableCell>{request.days} days</TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell className="text-right">
                            {request.status === "Pending" && (
                              <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline" className="h-8">
                                  <Check className="h-3 w-3 mr-1" />
                                  Approve
                                </Button>
                                <Button size="sm" variant="outline" className="h-8">
                                  <X className="h-3 w-3 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="balance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Leave Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Annual Leave</TableHead>
                        <TableHead>Sick Leave</TableHead>
                        <TableHead>Personal Leave</TableHead>
                        <TableHead>Total Used</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaveBalance.map((balance, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{balance.employee}</TableCell>
                          <TableCell>{balance.annual} days</TableCell>
                          <TableCell>{balance.sick} days</TableCell>
                          <TableCell>{balance.personal} days</TableCell>
                          <TableCell>{balance.used} days</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Calendar and Upcoming */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Calendar</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Leaves</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingLeaves.map((leave, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className="bg-blue-50 p-2 rounded-full">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{leave.employee}</p>
                      <p className="text-xs text-muted-foreground">{leave.type}</p>
                      <p className="text-xs text-muted-foreground mt-1">{leave.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
