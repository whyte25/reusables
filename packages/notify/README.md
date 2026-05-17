# reusables-notify

A composable toast notification package for React.

## Links

- Docs: https://reusables.vercel.app/docs/components/notify
- GitHub: https://github.com/whyte25/reusables/tree/main/packages/notify
- Issues: https://github.com/whyte25/reusables/issues

## Install

```bash
npm install reusables-notify
```

## Usage

```tsx
import { toast, ToastProvider } from "reusables-notify"

export function App() {
  return (
    <ToastProvider>
      <button onClick={() => toast.success("Saved")}>Show toast</button>
    </ToastProvider>
  )
}
```

## API

```tsx
import {
  ToastProvider,
  toast,
  Toast,
  statusStyles,
  toastVariants,
  toastPositionVariants,
  toastActionVariants,
  progressBarVariants,
} from "reusables-notify"
```

## Examples

### Basic Toast

```tsx
toast.info("Event has been created")
toast.success("Saved")
toast.error("Something went wrong")
```

### Toast Provider

```tsx
import { ToastProvider } from "reusables-notify"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
```

### Promise Toast

```tsx
import { toast } from "reusables-notify"

toast.promise(
  async () => {
    const response = await fetch("/api/save")
    return response.json()
  },
  {
    loading: "Saving...",
    success: () => "Saved",
    error: "Save failed",
  }
)
```

## shadcn

Prefer source files in your app? Install the shadcn registry version instead:

```bash
npx shadcn@latest add "https://reusables.vercel.app/r/notify"
```

## License

MIT
