"use client"

import { DialogDescription } from "@/components/ui/dialog"

import type React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  AlertCircle,
  Code,
  Download,
  FileCode,
  FolderOpen,
  Github,
  Globe,
  HardDrive,
  Layers,
  Lock,
  Play,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Terminal,
  Zap,
  Upload,
  User,
  Moon,
  Sun,
  Cog,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const initialAdmins = [{ username: "castles", password: "castles" }]

export default function CastlesSkidatron() {
  const [isExtracting, setIsExtracting] = useState(false)
  const [isDeobfuscating, setIsDeobfuscating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [extractedCode, setExtractedCode] = useState("")
  const [deobfuscatedCode, setDeobfuscatedCode] = useState("")
  const [targetPath, setTargetPath] = useState("")
  const [selectedTab, setSelectedTab] = useState("local")
  const [extractionOptions, setExtractionOptions] = useState({
    extractDependencies: true,
    deobfuscateCode: true,
    extractApiKeys: true,
    bypassProtections: false,
  })
  const [extractionDepth, setExtractionDepth] = useState("medium")
  const [outputFormat, setOutputFormat] = useState("original")
  const [uploadedFile, setUploadedFile] = useState(null)
  const [fileContent, setFileContent] = useState("")
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [activeTab, setActiveTab] = useState("extracted")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [consoleOutput, setConsoleOutput] = useState("")
  const [language, setLanguage] = useState("en")
  const [autoExtract, setAutoExtract] = useState(false)
  const [defaultExtractionDepth, setDefaultExtractionDepth] = useState("medium")
  const [blacklistedUsers, setBlacklistedUsers] = useState<string[]>([])
  const [newBlacklistedUser, setNewBlacklistedUser] = useState("")
  const [newAdminUsername, setNewAdminUsername] = useState("")
  const [newAdminPassword, setNewAdminPassword] = useState("")
  const [admins, setAdmins] = useState<{ username: string; password: string }[]>(initialAdmins)
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    console.log("Component mounted")
  }, [])

  const handleAdminLogin = useCallback(() => {
    const adminUser = admins.find((admin) => admin.username === username && admin.password === password)
    if (adminUser) {
      setIsAdmin(true)
      toast({
        title: "Admin Access Granted",
        description: "Welcome, admin user!",
      })
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid username or password.",
        variant: "destructive",
      })
    }
  }, [username, password, admins])

  const handleConsoleCommand = useCallback((command: string) => {
    setConsoleOutput((prev) => `${prev}\n> ${command}\n`)
    // Simulate command execution
    setTimeout(() => {
      let output = "Command not recognized."
      if (command.toLowerCase() === "help") {
        output = "Available commands: help, version, clear"
      } else if (command.toLowerCase() === "version") {
        output = "Castles Skidatron 3000 v8.0.0"
      } else if (command.toLowerCase() === "clear") {
        setConsoleOutput("")
        return
      }
      setConsoleOutput((prev) => `${prev}${output}\n`)
    }, 500)
  }, [])

  const handleExtract = useCallback(() => {
    console.log("Extraction started", { targetPath, uploadedFile })
    if (!targetPath && !uploadedFile) {
      toast({
        title: "Error",
        description: "Please select a file or enter a valid target path.",
        variant: "destructive",
      })
      return
    }

    setIsExtracting(true)
    setProgress(0)
    setExtractedCode("")

    // Simulate extraction process
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10

        if (newProgress >= 100) {
          clearInterval(interval)
          setIsExtracting(false)

          // Set extracted code based on uploaded file or simulated content
          const sourceCode = fileContent || `// Simulated code for ${targetPath}`
          const depth = extractionDepth || defaultExtractionDepth
          const extractedContent = `// Extracted from ${uploadedFile ? uploadedFile.name : targetPath}
// Extraction options: ${JSON.stringify(extractionOptions)}
// Extraction depth: ${depth}
// Output format: ${outputFormat}

${sourceCode}

// Additional extracted content:
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

// API configuration
const API_KEY = "${extractionOptions.extractApiKeys ? "sk_live_51KjM9pLkOI2aPz8nXcB6Vk" : "[REDACTED]"}";
const API_ENDPOINT = "https://api.example.com/v1";

/**
 * Main application component
 * @class App
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
      error: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await axios.get(\`\${API_ENDPOINT}/data\`, {
        headers: {
          'Authorization': \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json'
        }
      });
      
      this.setState({
        isLoading: false,
        data: response.data
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: error.message
      });
    }
  }

  render() {
    const { isLoading, data, error } = this.state;
    
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    if (error) {
      return <div>Error: {error}</div>;
    }
    
    return (
      <div className="app-container">
        <h1>Data Viewer</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
}

// Initialize the application
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);`

          console.log("Extraction complete", { extractedContent })
          setExtractedCode(extractedContent)

          toast({
            title: "Extraction Complete",
            description: "Source code has been successfully extracted.",
          })

          return 100
        }

        return newProgress
      })
    }, 200)
  }, [targetPath, extractionOptions, extractionDepth, defaultExtractionDepth, outputFormat, uploadedFile, fileContent])

  const handleSave = useCallback(() => {
    if (!extractedCode && !deobfuscatedCode) {
      toast({
        title: "Error",
        description: "No code to save. Please extract or deobfuscate code first.",
        variant: "destructive",
      })
      return
    }

    const codeToSave = activeTab === "extracted" ? extractedCode : deobfuscatedCode
    const blob = new Blob([codeToSave], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "extracted_code.js"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Success",
      description: "Code has been saved to your downloads.",
    })
  }, [extractedCode, deobfuscatedCode, activeTab])

  const handleBrowse = useCallback(() => {
    console.log("Browse button clicked")
    if (fileInputRef.current) {
      fileInputRef.current.click()
    } else {
      console.error("File input reference is null")
      toast({
        title: "Error",
        description: "File selection is not supported in your browser.",
        variant: "destructive",
      })
    }
  }, [])

  const processFile = useCallback(
    (file: File) => {
      console.log("Processing file", { name: file.name, size: file.size, type: file.type })
      setUploadedFile(file)
      setTargetPath(file.name)

      const reader = new FileReader()
      reader.onload = (e) => {
        console.log("File read complete")
        const content = e.target?.result as string
        setFileContent(content)
        if (autoExtract) {
          handleExtract()
        }
      }
      reader.onerror = (e) => {
        console.error("Error reading file", e)
        toast({
          title: "Error",
          description: "Failed to read the selected file. Please try again.",
          variant: "destructive",
        })
      }
      reader.readAsText(file)

      toast({
        title: "File Selected",
        description: `Selected file: ${file.name}`,
      })
    },
    [autoExtract, handleExtract],
  )

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("File change event triggered")
      const file = event.target.files?.[0]
      if (file) {
        processFile(file)
      } else {
        console.log("No file selected")
      }
    },
    [processFile],
  )

  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (files && files.length > 0) {
        processFile(files[0])
      }
    },
    [processFile],
  )

  const handleOptionChange = useCallback((option) => {
    setExtractionOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }, [])

  const handleDeobfuscate = useCallback(() => {
    if (!extractedCode) {
      toast({
        title: "Error",
        description: "No code to deobfuscate. Please extract or input code first.",
        variant: "destructive",
      })
      return
    }

    setIsDeobfuscating(true)
    setProgress(0)
    setDeobfuscatedCode("")

    // Simulate deobfuscation process
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10

        if (newProgress >= 100) {
          clearInterval(interval)
          setIsDeobfuscating(false)

          // Simulate deobfuscated code
          const deobfuscated = `// Deobfuscated code
${extractedCode.replace(/const /g, "let ")}
// Additional deobfuscated content:
function deobfuscatedFunction() {
  console.log("This function was previously obfuscated");
}

// Revealing obfuscated variable names
let API_KEY = "${extractionOptions.extractApiKeys ? "sk_live_51KjM9pLkOI2aPz8nXcB6Vk" : "[REDACTED]"}";
let API_ENDPOINT = "https://api.example.com/v1";

// Simplified class structure
class DeobfuscatedApp extends React.Component {
  state = {
    isLoading: true,
    data: null,
    error: null
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(\`\${API_ENDPOINT}/data\`, {
        headers: {
          'Authorization': \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      this.setState({ isLoading: false, data });
    } catch (error) {
      this.setState({ isLoading: false, error: error.message });
    }
  };

  render() {
    const { isLoading, data, error } = this.state;
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
      <div className="app-container">
        <h1>Deobfuscated Data Viewer</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
}

// Initialize the application
ReactDOM.render(<DeobfuscatedApp />, document.getElementById('root'));`

          setDeobfuscatedCode(deobfuscated)

          toast({
            title: "Deobfuscation Complete",
            description: "Code has been successfully deobfuscated.",
          })

          return 100
        }

        return newProgress
      })
    }, 100)
  }, [extractedCode, extractionOptions.extractApiKeys])

  const SettingsTab = () => {
    return (
      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Settings className="mr-2 h-5 w-5 text-emerald-500" />
            Settings
          </CardTitle>
          <CardDescription>Customize your Castles Skidatron 3000 experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Theme</label>
            <div className="flex items-center space-x-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setTheme("light")
                  document.documentElement.classList.remove("dark")
                }}
              >
                <Sun className="h-4 w-4 mr-1" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setTheme("dark")
                  document.documentElement.classList.add("dark")
                }}
              >
                <Moon className="h-4 w-4 mr-1" />
                Dark
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="bg-zinc-900 border-zinc-700">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Default Extraction Settings</label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoExtract"
                checked={autoExtract}
                onCheckedChange={(checked) => setAutoExtract(checked as boolean)}
              />
              <label
                htmlFor="autoExtract"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Auto-extract on file upload
              </label>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Default extraction depth</label>
              <Select value={defaultExtractionDepth} onValueChange={setDefaultExtractionDepth}>
                <SelectTrigger className="bg-zinc-900 border-zinc-700">
                  <SelectValue placeholder="Select depth" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700">
                  <SelectItem value="shallow">Shallow (faster)</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="deep">Deep (slower)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const AdminTab = () => {
    return (
      <Card className="bg-zinc-950 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Shield className="mr-2 h-5 w-5 text-emerald-500" />
            Admin Controls
          </CardTitle>
          <CardDescription>Manage blacklisted users and admin accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Blacklist Users</h3>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Enter username to blacklist"
                value={newBlacklistedUser}
                onChange={(e) => setNewBlacklistedUser(e.target.value)}
                className="bg-zinc-800 text-zinc-100"
              />
              <Button onClick={handleBlacklistUser}>Blacklist</Button>
            </div>
            <ScrollArea className="h-[200px] rounded-md border border-zinc-800 bg-zinc-900 p-4">
              {blacklistedUsers.map((user) => (
                <div key={user} className="flex items-center justify-between py-2">
                  <span>{user}</span>
                  <Button variant="destructive" size="sm" onClick={() => handleRemoveBlacklist(user)}>
                    Remove
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </div>
          <Separator className="bg-zinc-800" />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add Admin</h3>
            <div className="space-y-2">
              <Input
                placeholder="Username"
                value={newAdminUsername}
                onChange={(e) => setNewAdminUsername(e.target.value)}
                className="bg-zinc-800 text-zinc-100"
              />
              <Input
                type="password"
                placeholder="Password"
                value={newAdminPassword}
                onChange={(e) => setNewAdminPassword(e.target.value)}
                className="bg-zinc-800 text-zinc-100"
              />
              <Button onClick={handleAddAdmin} className="w-full">
                Add Admin
              </Button>
            </div>
            <ScrollArea className="h-[200px] rounded-md border border-zinc-800 bg-zinc-900 p-4">
              {admins.map((admin) => (
                <div key={admin.username} className="flex items-center justify-between py-2">
                  <span>{admin.username}</span>
                  <Button variant="destructive" size="sm" onClick={() => handleRemoveAdmin(admin.username)}>
                    Remove
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleBlacklistUser = useCallback(() => {
    if (newBlacklistedUser && !blacklistedUsers.includes(newBlacklistedUser)) {
      setBlacklistedUsers((prev) => [...prev, newBlacklistedUser])
      setNewBlacklistedUser("")
      toast({
        title: "User Blacklisted",
        description: `${newBlacklistedUser} has been added to the blacklist.`,
      })
    }
  }, [newBlacklistedUser, blacklistedUsers])

  const handleRemoveBlacklist = useCallback((user: string) => {
    setBlacklistedUsers((prev) => prev.filter((u) => u !== user))
    toast({
      title: "User Removed from Blacklist",
      description: `${user} has been removed from the blacklist.`,
    })
  }, [])

  const handleAddAdmin = useCallback(() => {
    if (newAdminUsername && newAdminPassword) {
      setAdmins((prev) => [...prev, { username: newAdminUsername, password: newAdminPassword }])
      setNewAdminUsername("")
      setNewAdminPassword("")
      toast({
        title: "Admin Added",
        description: `${newAdminUsername} has been added as an admin.`,
      })
    }
  }, [newAdminUsername, newAdminPassword])

  const handleRemoveAdmin = useCallback((username: string) => {
    setAdmins((prev) => prev.filter((admin) => admin.username !== username))
    toast({
      title: "Admin Removed",
      description: `${username} has been removed from admin list.`,
    })
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-zinc-100">
      <header className="border-b border-zinc-800 bg-zinc-950 py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-emerald-500" />
            <h1 className="text-xl font-bold">Castles Skidatron 3000</h1>
            <Badge variant="outline" className="ml-2 bg-zinc-800 text-emerald-400 border-emerald-800">
              v8.0.0
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-zinc-100">
                <DialogHeader>
                  <DialogTitle>Admin Access</DialogTitle>
                  <DialogDescription>Enter your credentials to gain admin access.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Input
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-zinc-800 text-zinc-100"
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-zinc-800 text-zinc-100"
                  />
                  <Button onClick={handleAdminLogin}>Login</Button>
                </div>
              </DialogContent>
            </Dialog>
            {isAdmin && (
              <Badge variant="outline" className="bg-green-800 text-green-100 border-green-600">
                Admin
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                toast({ title: "Settings", description: "Settings panel is not implemented in this demo." })
              }
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => window.open("https://github.com", "_blank")}>
              <Github className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main
        className="flex flex-1 overflow-hidden relative"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className="absolute inset-0 bg-zinc-900 bg-opacity-90 flex items-center justify-center z-50">
            <div className="text-center">
              <Upload className="mx-auto h-16 w-16 text-emerald-500 animate-bounce" />
              <p className="mt-4 text-xl font-semibold text-emerald-400">Drop your file here to extract</p>
            </div>
          </div>
        )}
        <div className="w-64 border-r border-zinc-800 bg-zinc-950 p-4 hidden md:block">
          <div className="space-y-4">
            <div>
              <h2 className="mb-2 text-sm font-medium text-zinc-400">TARGETS</h2>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800"
                  onClick={() => setSelectedTab("local")}
                >
                  <HardDrive className="mr-2 h-4 w-4" />
                  Local Files
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800"
                  onClick={() => setSelectedTab("web")}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Web Applications
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800"
                  onClick={() => setSelectedTab("github")}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Repositories
                </Button>
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            <div>
              <h2 className="mb-2 text-sm font-medium text-zinc-400">TOOLS</h2>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800"
                  onClick={handleExtract}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Quick Extract
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800"
                  onClick={handleDeobfuscate}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Deobfuscator
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800"
                    >
                      <Terminal className="mr-2 h-4 w-4" />
                      Console
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px] bg-zinc-900 text-zinc-100">
                    <DialogHeader>
                      <DialogTitle>Console</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <ScrollArea className="h-[300px] rounded-md border border-zinc-800 bg-black p-4">
                        <pre className="text-sm font-mono text-green-400">{consoleOutput}</pre>
                      </ScrollArea>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          const command = (e.target as HTMLFormElement).command.value
                          handleConsoleCommand(command)
                          ;(e.target as HTMLFormElement).reset()
                        }}
                      >
                        <Input id="command" placeholder="Enter command..." className="bg-zinc-800 text-zinc-100" />
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            <div>
              <h2 className="mb-2 text-sm font-medium text-zinc-400">RECENT</h2>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800 text-xs"
                  onClick={() => setTargetPath("C:/Users/Admin/Desktop/app.js")}
                >
                  <FileCode className="mr-2 h-4 w-4" />
                  <span className="truncate">C:/Users/Admin/Desktop/app.js</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800 text-xs"
                  onClick={() => setTargetPath("https://example.com/app")}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  <span className="truncate">https://example.com/app</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800 text-xs"
                  onClick={() => setTargetPath("github.com/user/repo")}
                >
                  <Github className="mr-2 h-4 w-4" />
                  <span className="truncate">github.com/user/repo</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <Tabs defaultValue="target" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-zinc-800">
              <TabsTrigger value="target" className="data-[state=active]:bg-emerald-600">
                <Search className="mr-2 h-4 w-4" />
                Target
              </TabsTrigger>
              <TabsTrigger value="options" className="data-[state=active]:bg-emerald-600">
                <Settings className="mr-2 h-4 w-4" />
                Options
              </TabsTrigger>
              <TabsTrigger value="analysis" className="data-[state=active]:bg-emerald-600">
                <Layers className="mr-2 h-4 w-4" />
                Analysis
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-emerald-600">
                <Cog className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
              {isAdmin && (
                <TabsTrigger value="admin" className="data-[state=active]:bg-emerald-600">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin
                </TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="target">
              <Card className="col-span-3 bg-zinc-950 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Search className="mr-2 h-5 w-5 text-emerald-500" />
                    Target Selection
                  </CardTitle>
                  <CardDescription>Select the source code target you want to extract</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
                      <TabsTrigger value="local" className="data-[state=active]:bg-emerald-600">
                        {" "}
                        <HardDrive className="mr-2 h-4 w-4" />
                        Local
                      </TabsTrigger>
                      <TabsTrigger value="web" className="data-[state=active]:bg-emerald-600">
                        <Globe className="mr-2 h-4 w-4" />
                        Web
                      </TabsTrigger>
                      <TabsTrigger value="github" className="data-[state=active]:bg-emerald-600">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="local" className="mt-4">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="C:/path/to/application"
                          className="bg-zinc-900 border-zinc-700"
                          value={targetPath}
                          onChange={(e) => setTargetPath(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          className="shrink-0 border-zinc-700 hover:bg-zinc-800"
                          onClick={handleBrowse}
                        >
                          <FolderOpen className="h-4 w-4" />
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".js,.jsx,.ts,.tsx,.html,.css"
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="web" className="mt-4">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="https://example.com/app"
                          className="bg-zinc-900 border-zinc-700"
                          value={targetPath}
                          onChange={(e) => setTargetPath(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          className="shrink-0 border-zinc-700 hover:bg-zinc-800"
                          onClick={() =>
                            toast({ title: "Web Scan", description: "Web scanning is not implemented in this demo." })
                          }
                        >
                          <Globe className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="github" className="mt-4">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="username/repository"
                          className="bg-zinc-900 border-zinc-700"
                          value={targetPath}
                          onChange={(e) => setTargetPath(e.target.value)}
                        />
                        <Button
                          variant="outline"
                          className="shrink-0 border-zinc-700 hover:bg-zinc-800"
                          onClick={() =>
                            toast({
                              title: "GitHub Scan",
                              description: "GitHub repository scanning is not implemented in this demo.",
                            })
                          }
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="options">
              <Card className="md:col-span-1 bg-zinc-950 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-emerald-500" />
                    Extraction Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="extractDependencies"
                          checked={extractionOptions.extractDependencies}
                          onCheckedChange={() => handleOptionChange("extractDependencies")}
                        />
                        <label
                          htmlFor="extractDependencies"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Extract dependencies
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="deobfuscateCode"
                          checked={extractionOptions.deobfuscateCode}
                          onCheckedChange={() => handleOptionChange("deobfuscateCode")}
                        />
                        <label
                          htmlFor="deobfuscateCode"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Deobfuscate code
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="extractApiKeys"
                          checked={extractionOptions.extractApiKeys}
                          onCheckedChange={() => handleOptionChange("extractApiKeys")}
                        />
                        <label
                          htmlFor="extractApiKeys"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Extract API keys
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="bypassProtections"
                          checked={extractionOptions.bypassProtections}
                          onCheckedChange={() => handleOptionChange("bypassProtections")}
                        />
                        <label
                          htmlFor="bypassProtections"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Bypass protections
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Extraction depth</label>
                      <Select value={extractionDepth} onValueChange={setExtractionDepth}>
                        <SelectTrigger className="bg-zinc-900 border-zinc-700">
                          <SelectValue placeholder="Select depth" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-700">
                          <SelectItem value="shallow">Shallow (faster)</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="deep">Deep (slower)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Output format</label>
                      <Select value={outputFormat} onValueChange={setOutputFormat}>
                        <SelectTrigger className="bg-zinc-900 border-zinc-700">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-700">
                          <SelectItem value="original">Original structure</SelectItem>
                          <SelectItem value="single">Single file</SelectItem>
                          <SelectItem value="minified">Minified</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analysis">
              <Card className="md:col-span-2 bg-zinc-950 border-zinc-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <Layers className="mr-2 h-5 w-5 text-emerald-500" />
                      Code Analysis
                    </CardTitle>
                    <CardDescription>View extracted and deobfuscated source code</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {(extractedCode || deobfuscatedCode) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-zinc-700 hover:bg-zinc-800"
                        onClick={handleSave}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
                      <TabsTrigger value="extracted" className="data-[state=active]:bg-emerald-600">
                        Extracted Code
                      </TabsTrigger>
                      <TabsTrigger value="deobfuscated" className="data-[state=active]:bg-emerald-600">
                        Deobfuscated Code
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="extracted">
                      {isExtracting ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Extracting source code...</span>
                            <span className="text-sm">{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2 bg-zinc-800" indicatorClassName="bg-emerald-500" />
                          <div className="space-y-2 text-xs text-zinc-400">
                            <div>• Analyzing target structure</div>
                            <div>• Identifying entry points</div>
                            <div>• Bypassing obfuscation</div>
                            <div>• Extracting dependencies</div>
                          </div>
                        </div>
                      ) : extractedCode ? (
                        <ScrollArea className="h-[400px] rounded-md border border-zinc-800 bg-zinc-900 p-4">
                          <pre className="text-sm font-mono text-zinc-300">{extractedCode}</pre>
                        </ScrollArea>
                      ) : (
                        <div className="flex h-[400px] items-center justify-center rounded-md border border-zinc-800 bg-zinc-900">
                          <div className="text-center">
                            <FileCode className="mx-auto h-12 w-12 text-zinc-700" />
                            <h3 className="mt-2 text-lg font-medium text-zinc-400">No code extracted yet</h3>
                            <p className="mt-1 text-sm text-zinc-500">Select a target and click Extract to begin</p>
                          </div>{" "}
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="deobfuscated">
                      {isDeobfuscating ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Deobfuscating code...</span>
                            <span className="text-sm">{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2 bg-zinc-800" indicatorClassName="bg-emerald-500" />
                          <div className="space-y-2 text-xs text-zinc-400">
                            <div>• Analyzing obfuscation patterns</div>
                            <div>• Reversing code transformations</div>
                            <div>• Reconstructing original structure</div>
                            <div>• Renaming variables and functions</div>
                          </div>
                        </div>
                      ) : deobfuscatedCode ? (
                        <ScrollArea className="h-[400px] rounded-md border border-zinc-800 bg-zinc-900 p-4">
                          <pre className="text-sm font-mono text-zinc-300">{deobfuscatedCode}</pre>
                        </ScrollArea>
                      ) : (
                        <div className="flex h-[400px] items-center justify-center rounded-md border border-zinc-800 bg-zinc-900">
                          <div className="text-center">
                            <Shield className="mx-auto h-12 w-12 text-zinc-700" />
                            <h3 className="mt-2 text-lg font-medium text-zinc-400">No deobfuscated code yet</h3>
                            <p className="mt-1 text-sm text-zinc-500">Extract code first, then click Deobfuscate</p>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-zinc-800 pt-4">
                  <div className="flex items-center text-sm">
                    <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                    <span className="text-zinc-400">Use responsibly and ethically</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleExtract}
                      disabled={isExtracting || isDeobfuscating || (!targetPath && !uploadedFile)}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      {isExtracting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Extracting...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Extract Code
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={handleDeobfuscate}
                      disabled={isExtracting || isDeobfuscating || !extractedCode}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isDeobfuscating ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Deobfuscating...
                        </>
                      ) : (
                        <>
                          <Shield className="mr-2 h-4 w-4" />
                          Deobfuscate
                        </>
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <SettingsTab />
            </TabsContent>
            {isAdmin && (
              <TabsContent value="admin">
                <AdminTab />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>

      <footer className="border-t border-zinc-800 bg-zinc-950 py-2 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Lock className="h-3 w-3" />
            <span>Secure connection</span>
          </div>
          <div className="text-xs text-zinc-500">Castles Skidatron 3000 v8.0.0 © 2024 | All rights reserved</div>
        </div>
      </footer>
    </div>
  )
}

