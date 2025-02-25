import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

import { timeAgo } from "@/lib/time-ago"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const SimpleTimeAgo = ({ date }: { date: Date }) => {
  const [, setTick] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Simple Time Ago
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{timeAgo(date)}</div>
        <div className="mt-2 text-sm text-muted-foreground">
          {date.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}

export default SimpleTimeAgo
