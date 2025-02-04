import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

import { formatTimeAgo } from "@/lib/time-ago"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const EnhancedTimeAgo = ({ date }: { date: Date }) => {
  const [, setTick] = useState(0)
  const [options, setOptions] = useState({
    short: false,
    maxUnits: 2,
    future: true,
  })

  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Enhanced Time Ago
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="short-format">Short Format</Label>
            <Switch
              id="short-format"
              checked={options.short}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, short: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="max-units">Max Units</Label>
            <Select
              value={String(options.maxUnits)}
              onValueChange={(value) =>
                setOptions((prev) => ({ ...prev, maxUnits: Number(value) }))
              }
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3].map((num) => (
                  <SelectItem key={num} value={String(num)}>
                    {num} {num === 1 ? "unit" : "units"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator className="my-1" />
        <div>
          <div className="text-2xl font-semibold">
            {formatTimeAgo(date, options)}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {date.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EnhancedTimeAgo
