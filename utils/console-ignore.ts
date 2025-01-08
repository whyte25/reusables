export const consoleIgnore = (ignoredMessages: string[]) => {
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    if (!ignoredMessages.some((msg) => args[0]?.includes(msg))) {
      originalConsoleWarn(...args);
    }
  };

  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (!ignoredMessages.some((msg) => args[0]?.includes(msg))) {
      originalConsoleError(...args);
    }
  };
};
