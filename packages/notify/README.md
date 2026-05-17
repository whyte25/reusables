# reusables-notify

A composable toast notification package for React.

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
