"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import EnhancedTimeAgo from "./enhanced-time-ago-demo"
import SimpleTimeAgo from "./simple-time-ago-demo"

const TimeAgoDemo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const presetTimes = [
    { label: "Just now", time: new Date() },
    { label: "1 hour ago", time: new Date(Date.now() - 3600000) },
    { label: "1 day ago", time: new Date(Date.now() - 86400000) },
    { label: "1 week ago", time: new Date(Date.now() - 604800000) },
    { label: "1 month ago", time: new Date(Date.now() - 2592000000) },
    { label: "Future", time: new Date(Date.now() + 3600000) },
  ]

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-6">
      <Tabs defaultValue="presets" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="presets">Preset Times</TabsTrigger>
          <TabsTrigger value="custom">Custom Date</TabsTrigger>
        </TabsList>
        <TabsContent value="presets">
          <div className="mb-6 grid grid-cols-2 gap-4">
            {presetTimes.map((preset, idx) => (
              <Button
                key={idx}
                variant={
                  selectedDate.getTime() === preset.time.getTime() ?
                    "default"
                  : "outline"
                }
                onClick={() => setSelectedDate(preset.time)}
                className="w-full justify-start"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="custom">
          <div className="mb-6 flex items-center gap-4">
            <input
              type="datetime-local"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={selectedDate.toISOString().slice(0, 16)}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <SimpleTimeAgo date={selectedDate} />
        <EnhancedTimeAgo date={selectedDate} />
      </div>
    </div>
  )
}

export default TimeAgoDemo
