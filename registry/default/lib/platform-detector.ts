type PlatformInfo = {
  browser: {
    chrome: boolean;
    firefox: boolean;
    safari: boolean;
    edge: boolean;
    name: "chrome" | "firefox" | "safari" | "edge" | "unknown";
  };
  os: {
    ios: boolean;
    android: boolean;
    windows: boolean;
    macos: boolean;
    name: "android" | "windows" | "ios" | "macos" | "unknown";
  };
};

const getPlatform = (): PlatformInfo => {
  if (typeof window === "undefined") {
    return {
      browser: {
        chrome: false,
        firefox: false,
        safari: false,
        edge: false,
        name: "unknown",
      },
      os: {
        ios: false,
        android: false,
        windows: false,
        macos: false,
        name: "unknown",
      },
    };
  }

  const ua = window.navigator.userAgent.toLowerCase();

  const browser = {
    chrome: ua.includes("chrome") && !ua.includes("edg"),
    firefox: ua.includes("firefox"),
    safari: ua.includes("safari") && !ua.includes("chrome"),
    edge: ua.includes("edg"),
    get name() {
      if (this.chrome) return "chrome";
      if (this.firefox) return "firefox";
      if (this.safari) return "safari";
      if (this.edge) return "edge";
      return "unknown";
    },
  };

  const os = {
    ios: ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod"),
    android: ua.includes("android"),
    windows: ua.includes("windows"),
    macos: ua.includes("mac"),
    get name() {
      if (this.ios) return "ios";
      if (this.android) return "android";
      if (this.windows) return "windows";
      if (this.macos) return "macos";
      return "unknown";
    },
  };

  return { browser, os };
};

export const platform = getPlatform();
