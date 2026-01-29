import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Progress } from "./ui/progress";
import { Award, Target, TrendingUp, AlertCircle, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const performanceStats = [
  { title: "Reviews Due", value: "24", change: "This quarter", icon: Target, color: "text-orange-600", bgColor: "bg-orange-50" },
  { title: "Top Performers", value: "45", change: "18% of workforce", icon: Award, color: "text-green-600", bgColor: "bg-green-50" },
  { title: "Avg Rating", value: "4.2", change: "+0.3 from last quarter", icon: Star, color: "text-purple-600", bgColor: "bg-purple-50" },
  { title: "Improvement Plans", value: "8", change: "In progress", icon: TrendingUp, color: "text-blue-600", bgColor: "bg-blue-50" },
];

const employeeReviews = [
  { id: 1, name: "Sarah Johnson", department: "Engineering", position: "Senior Developer", lastReview: "2025-07-15", nextReview: "2025-10-15", rating: 4.8, status: "Completed", goals: 5, goalsCompleted: 5 },
  { id: 2, name: "Michael Chen", department: "Sales", position: "Sales Manager", lastReview: "2025-08-20", nextReview: "2025-11-20", rating: 4.5, status: "Upcoming", goals: 6, goalsCompleted: 4 },
  { id: 3, name: "Emma Davis", department: "Marketing", position: "Marketing Lead", lastReview: "2025-06-10", nextReview: "2025-09-10", rating: 4.6, status: "Overdue", goals: 4, goalsCompleted: 3 },
  { id: 4, name: "James Wilson", department: "Engineering", position: "Full Stack Developer", lastReview: "2025-07-25", nextReview: "2025-10-25", rating: 4.2, status: "Completed", goals: 5, goalsCompleted: 4 },
  { id: 5, name: "Lisa Anderson", department: "HR", position: "HR Manager", lastReview: "2025-08-05", nextReview: "2025-11-05", rating: 4.7, status: "Upcoming", goals: 5, goalsCompleted: 5 },
];

const topPerformers = [
  { name: "Sarah Johnson", rating: 4.8, improvement: 12 },
  { name: "Lisa Anderson", rating: 4.7, improvement: 8 },
  { name: "Emma Davis", rating: 4.6, improvement: 10 },
  { name: "Michael Chen", rating: 4.5, improvement: 15 },
  { name: "David Brown", rating: 4.5, improvement: 7 },
];

const performanceMetrics = [
  { category: "Quality of Work", average: 4.3, target: 4.0 },
  { category: "Communication", average: 4.1, target: 4.0 },
  { category: "Teamwork", average: 4.4, target: 4.0 },
  { category: "Leadership", average: 3.9, target: 4.0 },
  { category: "Innovation", average: 4.0, target: 4.0 },
];

export function Performance() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>;
      case "Upcoming":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Upcoming</Badge>;
      case "Overdue":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-blue-600";
    if (rating >= 3.5) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1>Performance Management</h1>
          <p className="text-muted-foreground">Track employee performance, reviews, and goals</p>
        </div>
        <Button>Schedule Review</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceStats.map((stat, index) => {
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

      <div className="grid gap-4 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="reviews" className="space-y-4">
            <TabsList>
              <TabsTrigger value="reviews">Performance Reviews</TabsTrigger>
              <TabsTrigger value="metrics">Metrics Overview</TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Last Review</TableHead>
                        <TableHead>Next Review</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Goals</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employeeReviews.map((review) => (
                        <TableRow key={review.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{getInitials(review.name)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{review.name}</div>
                                <div className="text-sm text-muted-foreground">{review.department}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{review.position}</TableCell>
                          <TableCell className="text-sm">{review.lastReview}</TableCell>
                          <TableCell className="text-sm">{review.nextReview}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className={`h-4 w-4 fill-current ${getRatingColor(review.rating)}`} />
                              <span className={`font-medium ${getRatingColor(review.rating)}`}>{review.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {review.goalsCompleted}/{review.goals}
                            </div>
                            <Progress value={(review.goalsCompleted / review.goals) * 100} className="h-1 mt-1" />
                          </TableCell>
                          <TableCell>{getStatusBadge(review.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {performanceMetrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{metric.category}</p>
                            <p className="text-sm text-muted-foreground">Target: {metric.target}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-lg font-bold ${metric.average >= metric.target ? 'text-green-600' : 'text-orange-600'}`}>
                              {metric.average}
                            </span>
                            {metric.average >= metric.target ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-orange-600" />
                            )}
                          </div>
                        </div>
                        <Progress value={(metric.average / 5) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold">
                      {index + 1}
                    </div>
                    <Avatar>
                      <AvatarFallback>{getInitials(performer.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{performer.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                          {performer.rating}
                        </span>
                        <span>•</span>
                        <span className="text-green-600">+{performer.improvement}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Review Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="bg-orange-50 p-2 rounded-full">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Overdue Reviews</p>
                    <p className="text-xs text-muted-foreground">3 employees need immediate attention</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Upcoming Reviews</p>
                    <p className="text-xs text-muted-foreground">24 scheduled for this quarter</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-green-50 p-2 rounded-full">
                    <Award className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Goals Achieved</p>
                    <p className="text-xs text-muted-foreground">85% completion rate</p>
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
