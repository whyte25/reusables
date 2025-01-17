"use client";

import { Card } from "@/components/ui/card";
import useInViewState from "@/hooks/use-inview";
import { motion } from "framer-motion";

function AnimatedCard({ delay = 0 }) {
  const { ref, isInView } = useInViewState({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="p-6 h-40   flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted">
        <p className="text-lg font-medium">
          {isInView ? "👋 I'm visible!" : "Scroll to see me"}
        </p>
      </Card>
    </motion.div>
  );
}

export default function InViewDemo() {
  return (
    <div className="space-y-32 flex flex-col gap-10 ">
      <AnimatedCard delay={0} />
      <AnimatedCard delay={0.2} />
      <AnimatedCard delay={0.4} />
    </div>
  );
}
