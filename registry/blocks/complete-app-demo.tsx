"use client"

import React from "react"
import {
  AlertTriangle,
  Bell,
  FileText,
  Home,
  Info,
  Layers,
  LogOut,
  Menu,
  MessageCircle,
  PanelBottomOpen,
  Search,
  Settings,
  User,
  X,
} from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { BottomNav, NavItem } from "@/registry/reusables/ui/mobile/bottom-nav"
import { MobileContainer } from "@/registry/reusables/ui/mobile/mobile-container"

/**
 * Complete app demo showcasing all features combined
 */
export default function CompleteAppDemo() {
  const [showSplash, setShowSplash] = React.useState(true)
  const [activeTab, setActiveTab] = React.useState("home")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  // Reset the demo to show splash screen again
  const resetDemo = () => {
    setShowSplash(true)
  }

  // Logo and splash content
  const AppLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )

  const splashContent = (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-primary text-primary-foreground">
      <div className="flex flex-col items-center gap-4">
        <AppLogo className="h-16 w-16" />
        <h1 className="text-2xl font-bold">AppDemo</h1>
        <p className="text-sm opacity-80">Your complete mobile experience</p>
      </div>
    </div>
  )

  // Demo feed content
  const feedItems = [
    {
      id: 1,
      author: "Alex Johnson",
      avatar: "/avatars/01.png",
      content:
        "Just launched our new mobile container component! Check out the flexible layout options and theme variants.",
      likes: 24,
      comments: 5,
      time: "2h ago",
    },
    {
      id: 2,
      author: "Sam Wilson",
      avatar: "/avatars/02.png",
      content:
        "The new accessibility features in this component are amazing. Screen reader support works flawlessly!",
      likes: 18,
      comments: 3,
      time: "4h ago",
    },
    {
      id: 3,
      author: "Taylor Swift",
      avatar: "/avatars/03.png",
      content:
        "I'm loving the splash screen animations. The custom timing functions give it a really polished feel.",
      likes: 42,
      comments: 8,
      time: "8h ago",
    },
  ]

  // Navigation items with badge
  const navItems: NavItem[] = [
    {
      href: "#home",
      icon: Home,
      label: "Home",
    },
    {
      href: "#search",
      icon: Search,
      label: "Search",
    },
    {
      href: "#ui",
      icon: Layers,
      label: "UI",
      badge: "New",
      badgeVariant: "pill",
      badgeStatus: "info",
    },
    {
      href: "#messages",
      icon: MessageCircle,
      label: "Messages",
      badge: 3,
      badgeVariant: "dot",
      badgeStatus: "error",
    },
  ]

  // Handle tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <MobileContainer
      splashScreen={showSplash ? splashContent : undefined}
      splashScreenDuration={3000}
      useSplashAnimation={true}
      splashAnimationConfig={{
        enterClass: "animate-in fade-in-0 zoom-in-95 duration-500",
        exitClass: "animate-out fade-out-0 zoom-out-95 duration-500",
        timing: "ease-in-out 0.5s",
      }}
      header={
        <div className="flex h-14 items-center justify-between border-b bg-background px-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            {menuOpen && (
              <div className="absolute left-0 top-14 z-50 w-56 rounded-md border bg-background shadow-md">
                <div className="border-b p-3">
                  <h3 className="font-medium">App Menu</h3>
                </div>
                <div className="flex flex-col gap-1 p-2">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Home className="mr-2 h-4 w-4" /> Home
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={resetDemo}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Reset Demo
                  </Button>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <AppLogo className="h-6 w-6" />
              <h1 className="text-lg font-semibold">AppDemo</h1>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      }
      bottomNav={
        <BottomNav
          items={navItems}
          activePage={activeTab}
          linkComponent={({ href, children }) => (
            <div
              onClick={() => handleTabChange(href.replace("#", ""))}
              className="cursor-pointer"
            >
              {children}
            </div>
          )}
        />
      }
      slots={{
        belowHeader: activeTab === "search" && (
          <div className="border-b bg-background p-3 duration-200 animate-in fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search posts, people, tags..."
                className="h-9 pl-9 pr-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full w-9 rounded-l-none"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ),
        aboveBottomNav: (
          <div className="border-t bg-background px-3 py-1">
            <p className="text-center text-xs text-muted-foreground">
              Mobile Container Demo • {new Date().getFullYear()}
            </p>
          </div>
        ),
      }}
      theme="default"
      size="comfortable"
      rounded="md"
      padding="none"
      ariaLabel="AppDemo Application"
      ariaRole="main"
      announceContentChanges={true}
    >
      <div>
        {/* Home Tab */}
        {activeTab === "home" && (
          <div className="flex flex-col gap-4 p-4">
            <div className="rounded-lg bg-muted/30 p-4">
              <h2 className="text-lg font-semibold">Welcome to AppDemo</h2>
              <p className="text-sm text-muted-foreground">
                This example demonstrates all features of the enhanced
                MobileContainer component.
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" onClick={resetDemo}>
                  Restart Demo
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleTabChange("search")}
                >
                  Explore Features
                </Button>
              </div>
            </div>

            <h3 className="font-medium">Recent Updates</h3>

            <div className="space-y-4">
              {feedItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={item.avatar} alt={item.author} />
                          <AvatarFallback>{item.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{item.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.time}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <span className="sr-only">Menu</span>
                        <svg
                          width="15"
                          height="3"
                          viewBox="0 0 15 3"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                        >
                          <path
                            d="M1.5 1.5C1.5 1.89782 1.65804 2.27936 1.93934 2.56066C2.22064 2.84196 2.60218 3 3 3C3.39782 3 3.77936 2.84196 4.06066 2.56066C4.34196 2.27936 4.5 1.89782 4.5 1.5C4.5 1.10218 4.34196 0.720644 4.06066 0.439339C3.77936 0.158035 3.39782 0 3 0C2.60218 0 2.22064 0.158035 1.93934 0.439339C1.65804 0.720644 1.5 1.10218 1.5 1.5ZM6 1.5C6 1.89782 6.15804 2.27936 6.43934 2.56066C6.72064 2.84196 7.10218 3 7.5 3C7.89782 3 8.27936 2.84196 8.56066 2.56066C8.84196 2.27936 9 1.89782 9 1.5C9 1.10218 8.84196 0.720644 8.56066 0.439339C8.27936 0.158035 7.89782 0 7.5 0C7.10218 0 6.72064 0.158035 6.43934 0.439339C6.15804 0.720644 6 1.10218 6 1.5ZM10.5 1.5C10.5 1.89782 10.658 2.27936 10.9393 2.56066C11.2206 2.84196 11.6022 3 12 3C12.3978 3 12.7794 2.84196 13.0607 2.56066C13.342 2.27936 13.5 1.89782 13.5 1.5C13.5 1.10218 13.342 0.720644 13.0607 0.439339C12.7794 0.158035 12.3978 0 12 0C11.6022 0 11.2206 0.158035 10.9393 0.439339C10.658 0.720644 10.5 1.10218 10.5 1.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-3">
                    <p className="text-sm">{item.content}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 px-2"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                        >
                          <path
                            d="M4.5 6.5C4.5 6.5 4.5 4.5 7.5 4.5C10.5 4.5 10.5 6.5 10.5 6.5M4.5 6.5V13.5H2.5C1.94772 13.5 1.5 13.0523 1.5 12.5V7.5C1.5 6.94772 1.94772 6.5 2.5 6.5H4.5ZM10.5 6.5V13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V7.5C13.5 6.94772 13.0523 6.5 12.5 6.5H10.5ZM4.5 10.5H10.5M4.5 8.5H10.5M7.5 4.5V2.5C7.5 1.94772 7.05228 1.5 6.5 1.5H6C5.44772 1.5 5 1.94772 5 2.5V4.5"
                            stroke="currentColor"
                          />
                        </svg>
                        <span className="text-xs">{item.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 px-2"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                        >
                          <path
                            d="M7.5 11.5C9.98528 11.5 12 9.48528 12 7C12 4.51472 9.98528 2.5 7.5 2.5C5.01472 2.5 3 4.51472 3 7C3 7.6325 3.1242 8.23422 3.34946 8.77987C3.4167 8.92267 3.41952 9.08594 3.35227 9.2311L2.31931 11.5273C2.13281 11.9248 2.41402 12.37 2.84307 12.3352L5.84792 12.0878C5.95893 12.0771 6.06868 12.1046 6.16063 12.1661C6.57833 12.3807 7.02938 12.5 7.5 12.5C7.77404 12.5 8.04091 12.4762 8.29843 12.4312"
                            stroke="currentColor"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="text-xs">{item.comments}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto h-8 gap-1 px-2"
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                        >
                          <path
                            d="M8.5 3.5L6.5 3.5M8.5 7.5H6.5M8.5 11.5H6.5M4.5 3.5H2.5V11.5H4.5M4.5 7.5H1.5M4.5 11.5H1.5M10.5 3.5H12.5V11.5H10.5M10.5 7.5H13.5M10.5 11.5H13.5"
                            stroke="currentColor"
                          />
                        </svg>
                        <span className="text-xs">Share</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Search Tab */}
        {activeTab === "search" && (
          <div className="flex flex-col gap-4 p-4">
            {searchQuery ?
              <div className="flex flex-col items-center justify-center py-8">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">
                  {searchQuery.length > 0 ?
                    `Search results for "${searchQuery}"`
                  : "Enter a search term"}
                </h3>
                <p className="text-center text-sm text-muted-foreground">
                  {searchQuery.length > 0 ?
                    "No results found. Try different keywords."
                  : "Use the search bar above to find content"}
                </p>
              </div>
            : <>
                <h2 className="font-medium">MobileContainer Features</h2>
                <div className="grid grid-cols-2 gap-2">
                  <Card
                    className="cursor-pointer hover:bg-muted/20"
                    onClick={() => handleTabChange("home")}
                  >
                    <CardHeader className="p-3 pb-0">
                      <h3 className="text-sm font-medium">Basic Layout</h3>
                    </CardHeader>
                    <CardContent className="p-3 pt-1">
                      <p className="text-xs text-muted-foreground">
                        Standard mobile app layout
                      </p>
                    </CardContent>
                  </Card>
                  <Card
                    className="cursor-pointer hover:bg-muted/20"
                    onClick={resetDemo}
                  >
                    <CardHeader className="p-3 pb-0">
                      <h3 className="text-sm font-medium">Splash Screen</h3>
                    </CardHeader>
                    <CardContent className="p-3 pt-1">
                      <p className="text-xs text-muted-foreground">
                        With custom animations
                      </p>
                    </CardContent>
                  </Card>
                  <Card
                    className="cursor-pointer hover:bg-muted/20"
                    onClick={() => handleTabChange("notifications")}
                  >
                    <CardHeader className="p-3 pb-0">
                      <h3 className="text-sm font-medium">Slot System</h3>
                    </CardHeader>
                    <CardContent className="p-3 pt-1">
                      <p className="text-xs text-muted-foreground">
                        For complex layouts
                      </p>
                    </CardContent>
                  </Card>
                  <Card
                    className="cursor-pointer hover:bg-muted/20"
                    onClick={() => handleTabChange("profile")}
                  >
                    <CardHeader className="p-3 pb-0">
                      <h3 className="text-sm font-medium">Theming</h3>
                    </CardHeader>
                    <CardContent className="p-3 pt-1">
                      <p className="text-xs text-muted-foreground">
                        With full customization
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <Button className="mt-2 w-full" onClick={resetDemo}>
                  Restart Demo
                </Button>
              </>
            }
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="flex flex-col">
            <div className="border-b p-4">
              <h2 className="font-medium">Messages</h2>
              <p className="text-sm text-muted-foreground">
                You have 3 unread messages
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 border-b p-4">
                <Badge className="h-2 w-2 rounded-full p-0" />
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/avatars/01.png" alt="User" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Alex Johnson</p>
                    <span className="text-xs text-muted-foreground">12m</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    Hey! What do you think about the new mobile container?
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-b p-4">
                <Badge className="h-2 w-2 rounded-full p-0" />
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/avatars/02.png" alt="User" />
                  <AvatarFallback>SW</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Sam Wilson</p>
                    <span className="text-xs text-muted-foreground">1h</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    The accessibility features are really impressive!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 border-b p-4">
                <Badge className="h-2 w-2 rounded-full p-0" />
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/avatars/03.png" alt="User" />
                  <AvatarFallback>TS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Taylor Swift</p>
                    <span className="text-xs text-muted-foreground">3h</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    Love the animations! How did you implement them?
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="flex flex-col">
            <div className="border-b p-4">
              <h2 className="font-medium">Notifications</h2>
              <p className="text-sm text-muted-foreground">
                You have 1 unread notification
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-start gap-3 border-b bg-muted/20 p-4">
                <div className="rounded-full bg-primary p-2">
                  <Bell className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">New Feature Available</p>
                  <p className="text-sm text-muted-foreground">
                    The MobileContainer now supports custom theme variants and
                    accessibility features.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Just now</p>
                </div>
                <Badge>New</Badge>
              </div>
              <div className="flex items-start gap-3 border-b p-4">
                <div className="rounded-full bg-muted p-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Profile Updated</p>
                  <p className="text-sm text-muted-foreground">
                    Your profile information has been updated successfully.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">2h ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-b p-4">
                <div className="rounded-full bg-muted p-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Settings Changed</p>
                  <p className="text-sm text-muted-foreground">
                    Your account settings have been updated with the new
                    preferences.
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Yesterday
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="flex flex-col">
            <div className="relative">
              <div className="h-32 bg-gradient-to-r from-primary to-primary/60"></div>
              <div className="absolute bottom-0 left-0 right-0 flex translate-y-1/2 items-end justify-between px-4">
                <Avatar className="h-20 w-20 border-4 border-background">
                  <AvatarImage src="/avatars/04.png" alt="User profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button className="mb-2" size="sm">
                  Edit Profile
                </Button>
              </div>
            </div>

            <div className="mt-12 p-4">
              <h2 className="text-xl font-bold">Jane Doe</h2>
              <p className="text-sm text-muted-foreground">
                UI/UX Designer & Developer
              </p>

              <div className="mt-6 grid gap-6">
                <div>
                  <h3 className="mb-2 font-medium">About</h3>
                  <p className="text-sm text-muted-foreground">
                    UI/UX designer and developer specializing in mobile
                    experiences. Working on creating accessible and beautiful
                    mobile interfaces.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 font-medium">App Settings</h3>
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between border-b p-3">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <span>Notifications</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border-b p-3">
                      <div className="flex items-center gap-3">
                        <Settings className="h-5 w-5 text-muted-foreground" />
                        <span>Preferences</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Configure
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <LogOut className="h-5 w-5 text-muted-foreground" />
                        <span>Sign Out</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={resetDemo}>
                        Log Out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* UI Tab */}
        {activeTab === "ui" && (
          <div className="space-y-6 p-4">
            <div>
              <h2 className="text-lg font-semibold">UI Components</h2>
              <p className="text-sm text-muted-foreground">
                Try out different mobile UI components
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <PanelBottomOpen className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Drawer</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Bottom sheet UI pattern for mobile
                  </p>

                  <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <DrawerTrigger asChild>
                      <Button className="w-full">Open Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Mobile Drawer</DrawerTitle>
                        <DrawerDescription>
                          This is a bottom sheet drawer component, commonly used
                          in mobile interfaces.
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="space-y-4 p-4">
                        <p className="text-sm">
                          Drawers are perfect for mobile interfaces where screen
                          space is limited. They slide in from the bottom to
                          provide additional options or information.
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {[1, 2, 3, 4].map((i) => (
                            <Card key={i} className="p-4">
                              <p className="text-sm font-medium">Item {i}</p>
                            </Card>
                          ))}
                        </div>
                      </div>
                      <DrawerFooter>
                        <Button onClick={() => setDrawerOpen(false)}>
                          Select Option
                        </Button>
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Dialog</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Modal dialog for important interactions
                  </p>

                  <Dialog open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>App Settings</DialogTitle>
                        <DialogDescription>
                          Configure your app preferences. Changes will be saved
                          automatically.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">
                            Notification Preferences
                          </h4>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Email notifications</span>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Push notifications</span>
                            <Switch checked />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Alert Dialog</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    For critical confirmations and alerts
                  </p>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>

              <div className="py-3 text-center">
                <p className="text-xs text-muted-foreground">
                  Explore different UI components designed for mobile use
                </p>
                <Badge variant="outline" className="mt-2">
                  <Info className="mr-1 h-3 w-3" /> Built with Radix UI
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileContainer>
  )
}
