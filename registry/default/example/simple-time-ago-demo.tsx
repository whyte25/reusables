import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { timeAgo } from "@/lib/time-ago";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const SimpleTimeAgo = ({ date }: { date: Date }) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Simple Time Ago
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{timeAgo(date)}</div>
        <div className="text-sm text-muted-foreground mt-2">
          {date.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleTimeAgo;
