import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter } from "./components/ui/sidebar";
import { LayoutDashboard, Users, Calendar, Clock, DollarSign, Briefcase, Award, FileText, Settings, LogOut } from "lucide-react";
import { Dashboard } from "./components/Dashboard";
import { EmployeeList } from "./components/EmployeeList";
import { LeaveManagement } from "./components/LeaveManagement";
import { Attendance } from "./components/Attendance";
import { Payroll } from "./components/Payroll";
import { Recruitment } from "./components/Recruitment";
import { Performance } from "./components/Performance";
import { Settings as SettingsPage } from "./components/Settings";
import { Reports } from "./components/Reports";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { Separator } from "./components/ui/separator";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { authService } from "./services/auth";
import { useEffect } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Users, label: "Employees", id: "employees" },
  { icon: Calendar, label: "Leave Management", id: "leave" },
  { icon: Clock, label: "Attendance", id: "attendance" },
  { icon: DollarSign, label: "Payroll", id: "payroll" },
  { icon: Briefcase, label: "Recruitment", id: "recruitment" },
  { icon: Award, label: "Performance", id: "performance" },
];

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const user = authService.getUser();
    const token = authService.getToken();
    if (user && token) {
      setIsAuthenticated(true);
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setAuthError("");
    try {
      const response = await authService.login({ email, password });

      const { user, token } = response.data;
      const userData = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.roleName,
        id: user.id
      };

      setIsAuthenticated(true);
      setCurrentUser(userData);
      authService.setToken(token);
      authService.setUser(userData);
      toast.success("Welcome back! Successfully logged in.");
    } catch (error: any) {
      console.error("Login Error details:", error);
      setAuthError(error.message || "Invalid email or password");
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Demo registration - in production, this would create an account in a backend
    setIsAuthenticated(true);
    setCurrentUser({ name, email });
    setAuthError("");
    toast.success(`Welcome, ${name}! Your account has been created.`);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setCurrentUser({ name: "", email: "" });
    setActiveView("dashboard");
    toast.info("You have been logged out.");
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "employees":
        return <EmployeeList />;
      case "leave":
        return <LeaveManagement />;
      case "attendance":
        return <Attendance />;
      case "payroll":
        return <Payroll />;
      case "recruitment":
        return <Recruitment />;
      case "performance":
        return <Performance />;
      case "settings":
        return <SettingsPage />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  // Show authentication screens if not logged in
  if (!isAuthenticated) {
    if (authView === "login") {
      return (
        <>
          <Login
            onLogin={handleLogin}
            onSwitchToRegister={() => {
              setAuthView("register");
              setAuthError("");
            }}
            error={authError}
            isLoading={isLoading}
          />
          <Toaster />
        </>
      );
    } else {
      return (
        <>
          <Register
            onRegister={handleRegister}
            onSwitchToLogin={() => {
              setAuthView("login");
              setAuthError("");
            }}
            error={authError}
          />
          <Toaster />
        </>
      );
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">HR System</h1>
                <p className="text-xs text-muted-foreground">Human Resources</p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => setActiveView(item.id)}
                          isActive={activeView === item.id}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-auto">
              <SidebarGroupLabel>More</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveView("settings")}
                      isActive={activeView === "settings"}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setActiveView("reports")}
                      isActive={activeView === "reports"}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Reports</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <Separator className="mb-4" />
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-white">
                  {currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 bg-background">
          {renderContent()}
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
