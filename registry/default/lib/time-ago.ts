type TimeUnit = "year" | "month" | "week" | "day" | "hour" | "minute" | "second"

interface TimeInterval {
  seconds: number
  label: TimeUnit
}

interface TimeAgoOptions {
  short?: boolean
  maxUnits?: number
  future?: boolean
  round?: boolean
}

export const timeAgo = (date: Date | string | number): string => {
  const inputDate = date instanceof Date ? date : new Date(date)
  const now = new Date()

  const seconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000)
  const isNegative = seconds < 0
  const absoluteSeconds = Math.abs(seconds)

  const intervals: TimeInterval[] = [
    { seconds: 31536000, label: "year" },
    { seconds: 2592000, label: "month" },
    { seconds: 604800, label: "week" },
    { seconds: 86400, label: "day" },
    { seconds: 3600, label: "hour" },
    { seconds: 60, label: "minute" },
    { seconds: 1, label: "second" },
  ]

  if (absoluteSeconds < 10) return "just now"
  if (absoluteSeconds < 60) return `${absoluteSeconds} seconds ago`

  const interval = intervals.find((int) => absoluteSeconds >= int.seconds)
  if (!interval) return "just now"

  const value = Math.floor(absoluteSeconds / interval.seconds)

  const specialSingular: Record<TimeUnit, (val: number) => string> = {
    hour: (val) => (val === 1 ? "an hour" : `${val} hours`),
    day: (val) => (val === 1 ? "a day" : `${val} days`),
    week: (val) => (val === 1 ? "a week" : `${val} weeks`),
    month: (val) => (val === 1 ? "a month" : `${val} months`),
    year: (val) => (val === 1 ? "a year" : `${val} years`),
    minute: (val) => `${val} minute${val === 1 ? "" : "s"}`,
    second: (val) => `${val} second${val === 1 ? "" : "s"}`,
  }

  const timeString = specialSingular[interval.label](value)
  return isNegative ? `in ${timeString}` : `${timeString} ago`
}

export const formatTimeAgo = (
  date: Date | string | number,
  options: TimeAgoOptions = {}
): string => {
  const { short = false, maxUnits = 1, future = true, round = true } = options

  const inputDate = date instanceof Date ? date : new Date(date)
  const now = new Date()

  const seconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000)
  const isNegative = seconds < 0
  const absoluteSeconds = Math.abs(seconds)

  type UnitConfig = [string, number] // [shortLabel, seconds]
  const units: Record<TimeUnit, UnitConfig> = {
    year: ["y", 31536000],
    month: ["mo", 2592000],
    week: ["w", 604800],
    day: ["d", 86400],
    hour: ["h", 3600],
    minute: ["m", 60],
    second: ["s", 1],
  }

  if (absoluteSeconds < 10) return "just now"

  let remaining = absoluteSeconds
  const parts: string[] = []

  for (const [unit, [shortLabel, secondsInUnit]] of Object.entries(units)) {
    if (parts.length >= maxUnits) break

    const value = Math.floor(remaining / secondsInUnit)
    if (value >= 1) {
      const formatted =
        short ?
          `${value}${shortLabel}`
        : `${value} ${unit}${value === 1 ? "" : "s"}`
      parts.push(formatted)
      remaining -= value * secondsInUnit
    }
  }

  if (!parts.length) return "just now"

  const timeString = parts.join(short ? " " : ", ")
  return isNegative && future ? `in ${timeString}` : `${timeString} ago`
}
