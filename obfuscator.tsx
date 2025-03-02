"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Code, FileCode } from "lucide-react"

const languageExtensions = {
  python: "py",
  lua: "lua",
  c: "c",
  cpp: "cpp",
  javascript: "js",
}

function obfuscateCode(code: string, language: string): string {
  // This is a very basic obfuscation. In a real-world scenario, you'd want to use more sophisticated techniques.
  let obfuscated = code

  // Simple variable renaming
  const varNames = "abcdefghijklmnopqrstuvwxyz"
  let varIndex = 0

  // Simple string encryption
  const encryptString = (str: string) => {
    return str
      .split("")
      .map((char) => char.charCodeAt(0).toString(16))
      .join("")
  }

  switch (language) {
    case "python":
      obfuscated = obfuscated.replace(/\b([a-zA-Z_]\w*)\b(?=\s*=)/g, () => `_${varNames[varIndex++]}`)
      obfuscated = obfuscated.replace(
        /(["'])(?:(?=(\\?))\2.)*?\1/g,
        (match) => `bytes.fromhex('${encryptString(match.slice(1, -1))}').decode()`,
      )
      break
    case "lua":
      obfuscated = obfuscated.replace(/local\s+([a-zA-Z_]\w*)/g, (_, name) => `local _${varNames[varIndex++]}`)
      obfuscated = obfuscated.replace(
        /(["'])(?:(?=(\\?))\2.)*?\1/g,
        (match) =>
          `(function() local s = '${encryptString(match.slice(1, -1))}' local r = '' for i = 1, #s, 2 do r = r .. string.char(tonumber(s:sub(i,i+1), 16)) end return r end)()`,
      )
      break
    case "c":
    case "cpp":
      obfuscated = obfuscated.replace(/\b([a-zA-Z_]\w*)\b(?=\s*[;=])/g, () => `_${varNames[varIndex++]}`)
      obfuscated = obfuscated.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
        const hex = encryptString(match.slice(1, -1))
        return `([](){std::string s="${hex}";std::string r="";for(int i=0;i<s.length();i+=2)r+=(char)std::stoi(s.substr(i,2),0,16);return r;})()`
      })
      break
    case "javascript":
      obfuscated = obfuscated.replace(
        /\b(let|var|const)\s+([a-zA-Z_]\w*)/g,
        (_, keyword, name) => `${keyword} _${varNames[varIndex++]}`,
      )
      obfuscated = obfuscated.replace(
        /(["'])(?:(?=(\\?))\2.)*?\1/g,
        (match) =>
          `(()=>{let s='${encryptString(match.slice(1, -1))}';let r='';for(let i=0;i<s.length;i+=2)r+=String.fromCharCode(parseInt(s.substr(i,2),16));return r;})()`,
      )
      break
  }

  return obfuscated
}

export default function Obfuscator() {
  const [inputCode, setInputCode] = useState("")
  const [outputCode, setOutputCode] = useState("")
  const [language, setLanguage] = useState("python")
  const [fileName, setFileName] = useState("")

  const handleObfuscate = () => {
    const obfuscated = obfuscateCode(inputCode, language)
    setOutputCode(obfuscated)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([outputCode], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${fileName || "obfuscated"}.${languageExtensions[language]}`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Code className="mr-2 h-6 w-6 text-emerald-500" />
          Code Obfuscator
        </CardTitle>
        <CardDescription>Obfuscate your code to make it harder to understand</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="lua">Lua</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor="fileName">File Name</Label>
            <Input
              id="fileName"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="inputCode">Input Code</Label>
          <Textarea
            id="inputCode"
            placeholder="Paste your code here"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="h-64"
          />
        </div>
        <Button onClick={handleObfuscate} className="w-full">
          Obfuscate
        </Button>
        <div>
          <Label htmlFor="outputCode">Obfuscated Code</Label>
          <ScrollArea className="h-64 w-full rounded-md border">
            <pre className="p-4">
              <code>{outputCode}</code>
            </pre>
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleDownload} disabled={!outputCode} className="w-full">
          <FileCode className="mr-2 h-4 w-4" />
          Download Obfuscated Code
        </Button>
      </CardFooter>
    </Card>
  )
}

