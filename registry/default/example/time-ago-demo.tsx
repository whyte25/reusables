"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import EnhancedTimeAgo from "./enhanced-time-ago-demo";
import SimpleTimeAgo from "./simple-time-ago-demo";

const TimeAgoDemo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const presetTimes = [
    { label: "Just now", time: new Date() },
    { label: "1 hour ago", time: new Date(Date.now() - 3600000) },
    { label: "1 day ago", time: new Date(Date.now() - 86400000) },
    { label: "1 week ago", time: new Date(Date.now() - 604800000) },
    { label: "1 month ago", time: new Date(Date.now() - 2592000000) },
    { label: "Future", time: new Date(Date.now() + 3600000) },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      <Tabs defaultValue="presets" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="presets">Preset Times</TabsTrigger>
          <TabsTrigger value="custom">Custom Date</TabsTrigger>
        </TabsList>
        <TabsContent value="presets">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {presetTimes.map((preset, idx) => (
              <Button
                key={idx}
                variant={
                  selectedDate.getTime() === preset.time.getTime()
                    ? "default"
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
          <div className="flex items-center gap-4 mb-6">
            <input
              type="datetime-local"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={selectedDate.toISOString().slice(0, 16)}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <SimpleTimeAgo date={selectedDate} />
        <EnhancedTimeAgo date={selectedDate} />
      </div>
    </div>
  );
};

export default TimeAgoDemo;
