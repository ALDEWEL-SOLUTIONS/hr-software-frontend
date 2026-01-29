import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Briefcase, Users, FileText, TrendingUp, Plus, Eye, Mail } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

const recruitmentStats = [
  { title: "Active Openings", value: "18", change: "+3 this month", icon: Briefcase, color: "text-blue-600", bgColor: "bg-blue-50" },
  { title: "Total Applications", value: "342", change: "+45 this week", icon: FileText, color: "text-green-600", bgColor: "bg-green-50" },
  { title: "In Interview", value: "56", change: "16% of applicants", icon: Users, color: "text-purple-600", bgColor: "bg-purple-50" },
  { title: "Hired This Month", value: "12", change: "+4 from target", icon: TrendingUp, color: "text-orange-600", bgColor: "bg-orange-50" },
];

const jobOpenings = [
  { id: 1, title: "Senior Full Stack Developer", department: "Engineering", location: "Remote", type: "Full-time", posted: "2025-10-15", applicants: 45, status: "Active" },
  { id: 2, title: "Product Manager", department: "Product", location: "New York", type: "Full-time", posted: "2025-10-20", applicants: 32, status: "Active" },
  { id: 3, title: "UI/UX Designer", department: "Design", location: "San Francisco", type: "Full-time", posted: "2025-10-18", applicants: 28, status: "Active" },
  { id: 4, title: "Sales Executive", department: "Sales", location: "Chicago", type: "Full-time", posted: "2025-10-22", applicants: 52, status: "Active" },
  { id: 5, title: "DevOps Engineer", department: "Engineering", location: "Remote", type: "Contract", posted: "2025-10-12", applicants: 38, status: "Active" },
  { id: 6, title: "Content Writer", department: "Marketing", location: "Remote", type: "Part-time", posted: "2025-10-25", applicants: 67, status: "Active" },
];

const candidates = [
  { id: 1, name: "Alex Morgan", position: "Senior Full Stack Developer", email: "alex.m@email.com", phone: "+1 555-0101", experience: "8 years", status: "Interview", appliedDate: "2025-10-20", rating: 4.5 },
  { id: 2, name: "Jordan Lee", position: "Product Manager", email: "jordan.l@email.com", phone: "+1 555-0102", experience: "6 years", status: "Screening", appliedDate: "2025-10-22", rating: 4.0 },
  { id: 3, name: "Sam Taylor", position: "UI/UX Designer", email: "sam.t@email.com", phone: "+1 555-0103", experience: "5 years", status: "Offer", appliedDate: "2025-10-18", rating: 4.8 },
  { id: 4, name: "Casey Brown", position: "Sales Executive", email: "casey.b@email.com", phone: "+1 555-0104", experience: "4 years", status: "Interview", appliedDate: "2025-10-23", rating: 4.2 },
  { id: 5, name: "Morgan Davis", position: "DevOps Engineer", email: "morgan.d@email.com", phone: "+1 555-0105", experience: "7 years", status: "Screening", appliedDate: "2025-10-21", rating: 4.6 },
];

const hiringPipeline = [
  { stage: "Applied", count: 342 },
  { stage: "Screening", count: 124 },
  { stage: "Interview", count: 56 },
  { stage: "Offer", count: 18 },
  { stage: "Hired", count: 12 },
];

export function Recruitment() {
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>;
      case "Interview":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Interview</Badge>;
      case "Screening":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Screening</Badge>;
      case "Offer":
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">Offer</Badge>;
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
          <h1>Recruitment</h1>
          <p className="text-muted-foreground">Manage job postings, applications, and hiring process</p>
        </div>
        <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Job Posting</DialogTitle>
              <DialogDescription>Fill in the details for the new job opening</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" placeholder="e.g., Senior Software Engineer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., Remote, New York" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Employment Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full-time</SelectItem>
                      <SelectItem value="parttime">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="intern">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Required</Label>
                  <Input id="experience" placeholder="e.g., 3-5 years" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea id="description" placeholder="Enter job description and requirements..." className="min-h-[100px]" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsJobDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsJobDialogOpen(false)}>Post Job</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {recruitmentStats.map((stat, index) => {
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

      {/* Hiring Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle>Hiring Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {hiringPipeline.map((stage, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-50 rounded-lg p-4 mb-2">
                  <div className="text-2xl font-bold text-blue-600">{stage.count}</div>
                </div>
                <p className="text-sm font-medium">{stage.stage}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="openings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="openings">Job Openings</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
        </TabsList>

        <TabsContent value="openings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Job Openings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobOpenings.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.type}</TableCell>
                      <TableCell>{job.posted}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{job.applicants} applicants</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(job.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Applied For</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{candidate.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{candidate.position}</TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div>{candidate.email}</div>
                          <div className="text-muted-foreground">{candidate.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{candidate.experience}</TableCell>
                      <TableCell>{candidate.appliedDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span>{candidate.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
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
