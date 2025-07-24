import { useEffect, useMemo } from "react"
import { format, getDaysInMonth, isValid, parse } from "date-fns"

import type { WheelPickerOption } from "@/components/ui/wheel-picker"
import { WheelPicker, WheelPickerWrapper } from "@/components/ui/wheel-picker"

type WheelPickerCalenderProps = {
  /** The current date value */
  value?: Date
  /** Callback when date changes */
  onChange?: (date: Date) => void
  /** Default date value for uncontrolled usage */
  defaultValue?: Date
  /** Optional class name for the container */
  className?: string
}

const createArray = (length: number, add = 0): WheelPickerOption[] =>
  Array.from({ length }, (_, i) => {
    const value = i + add
    return {
      label: value.toString().padStart(2, "0"),
      value: value.toString().padStart(2, "0"),
    }
  })

const monthOptions: WheelPickerOption[] = Array.from(
  { length: 12 },
  (_, i) => ({
    label: format(new Date(2024, i, 1), "MMMM"),
    value: (i + 1).toString().padStart(2, "0"),
  })
)

const currentYear = new Date().getFullYear()
const yearOptions: WheelPickerOption[] = Array.from({ length: 21 }, (_, i) => {
  const year = currentYear - 10 + i
  return {
    label: year.toString(),
    value: year.toString(),
  }
}).sort((a, b) => parseInt(a.value) - parseInt(b.value))

export function WheelPickerCalender({
  value,
  onChange,
  defaultValue = new Date(),
  className,
}: WheelPickerCalenderProps) {
  const currentDate = useMemo(() => {
    if (value instanceof Date && isValid(value)) {
      return value
    }
    return defaultValue
  }, [value, defaultValue])

  const currentMonth = format(currentDate, "MM")
  const currentYear = format(currentDate, "yyyy")
  const currentDay = format(currentDate, "dd")

  const daysInMonth = getDaysInMonth(currentDate)
  const dayOptions = createArray(daysInMonth, 1)

  const handleDateChange = (
    type: "day" | "month" | "year",
    newValue: string
  ) => {
    const dateString = `${type === "year" ? newValue : currentYear}-${type === "month" ? newValue : currentMonth}-${type === "day" ? newValue : currentDay}`
    const newDate = parse(dateString, "yyyy-MM-dd", new Date())

    if (isValid(newDate) && onChange) {
      onChange(newDate)
    }
  }

  // Update days when month/year changes to handle varying days in months
  useEffect(() => {
    const daysInNewMonth = getDaysInMonth(currentDate)
    const currentDayNum = parseInt(currentDay)

    if (currentDayNum > daysInNewMonth) {
      handleDateChange("day", daysInNewMonth.toString())
    }
  }, [currentMonth, currentYear, currentDay, currentDate])

  return (
    <div className={className} data-vaul-no-drag>
      <WheelPickerWrapper className="shadow-transparent ring-0">
        <WheelPicker
          options={dayOptions}
          value={currentDay}
          onValueChange={(value: string) => handleDateChange("day", value)}
          infinite
        />
        <WheelPicker
          options={monthOptions}
          value={currentMonth}
          onValueChange={(value: string) => handleDateChange("month", value)}
          infinite
        />
        <WheelPicker
          options={yearOptions}
          value={currentYear}
          onValueChange={(value: string) => handleDateChange("year", value)}
          infinite
        />
      </WheelPickerWrapper>
    </div>
  )
}
