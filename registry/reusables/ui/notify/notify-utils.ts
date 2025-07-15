import type { ToastParams, ToastPromiseOptions } from "./notify-provider"

export type ToastFunction = (
  text: React.ReactNode,
  options?: Partial<ToastParams>
) => string

export type PromiseHandler = <T>(
  promise: () => Promise<T>,
  options: ToastPromiseOptions<T>
) => string

export interface ToastMethods {
  success: ToastFunction
  error: ToastFunction
  warning: ToastFunction
  info: ToastFunction
  loading: ToastFunction
  default: ToastFunction
  push: (params: ToastParams) => string
  promise: PromiseHandler
  dismiss: (id: string | number) => void
}

class Toast implements ToastMethods {
  private emit: ((params: ToastParams) => string) | null = null
  private emitPromise: PromiseHandler | null = null
  private emitDismiss: ((id: string | number) => void) | null = null

  setHandlers(
    emit: (params: ToastParams) => string,
    promiseHandler: PromiseHandler,
    dismissHandler: (id: string | number) => void
  ) {
    this.emit = emit
    this.emitPromise = promiseHandler
    this.emitDismiss = dismissHandler
  }

  private createToastFn(status: ToastParams["status"]): ToastFunction {
    return (text, options = {}) => {
      if (!this.emit)
        throw new Error(
          "Toast not initialized: wrap your app with ToastProvider"
        )
      return this.emit({
        text,
        status,
        ...options,
      })
    }
  }

  /**
   * Display a success toast notification
   * @param text - The main message to display
   * @param options - Optional configuration for the toast
   * @example
   * toast.success('Profile updated successfully')
   * toast.success('Files uploaded', { duration: 5000, description: '3 files uploaded' })
   */
  success = this.createToastFn("success")

  /**
   * Display an error toast notification
   * @param text - The error message to display
   * @param options - Optional configuration for the toast
   * @example
   * toast.error('Failed to save changes')
   * toast.error('Upload failed', { description: 'Network error occurred' })
   */
  error = this.createToastFn("error")

  /**
   * Display a warning toast notification
   * @param text - The warning message to display
   * @param options - Optional configuration for the toast
   * @example
   * toast.warning('Low storage space')
   * toast.warning('Session expiring', { description: 'Please save your work' })
   */
  warning = this.createToastFn("warning")

  /**
   * Display an info toast notification
   * @param text - The information message to display
   * @param options - Optional configuration for the toast
   * @example
   * toast.info('New updates available')
   * toast.info('Tips', { description: 'Swipe left to delete' })
   */
  info = this.createToastFn("info")

  /**
   * Display a loading toast notification
   * @param text - The loading message to display
   * @param options - Optional configuration for the toast
   * @example
   * toast.loading('Uploading files...')
   * toast.loading('Processing', { duration: Infinity })
   */
  loading = this.createToastFn("loading")

  /**
   * Display a default toast notification
   * @param text - The message to display
   * @param options - Optional configuration for the toast
   * @example
   * toast.default('Something happened')
   */
  default = this.createToastFn("default")

  /**
   * Dismiss a toast notification by its ID
   * @param id - The ID of the toast to dismiss
   * @example
   * const toastId = toast.info('Loading...');
   * toast.dismiss(toastId);
   */
  dismiss = (id: string | number) => {
    if (this.emitDismiss) {
      this.emitDismiss(id)
    }
  }

  /**
   * Create a custom toast notification with full control over its properties
   * @param params - Complete toast parameters
   * @example
   * toast.push({
   *   title: 'Custom Toast',
   *   status: 'info',
   *   duration: 3000,
   *   description: 'This is a custom toast',
   *   position: 'top-right'
   * })
   */
  push = (params: ToastParams) => {
    if (!this.emit)
      throw new Error("Toast not initialized: wrap your app with ToastProvider")
    return this.emit(params)
  }

  /**
   * Handle async operations with loading, success, and error states
   * @param promise - Function that returns a promise
   * @param options - Configuration for different states of the promise
   * @example
   * toast.promise(
   *   () => fetchUserData(),
   *   {
   *     loading: 'Fetching user...',
   *     success: (data) => `Welcome ${data.name}!`,
   *     error: 'Failed to fetch user'
   *   }
   * )
   */
  promise = <T>(promise: () => Promise<T>, options: ToastPromiseOptions<T>) => {
    if (!this.emitPromise)
      throw new Error("Toast not initialized: wrap your app with ToastProvider")
    return this.emitPromise(promise, options)
  }
}

export const toast = new Toast()
