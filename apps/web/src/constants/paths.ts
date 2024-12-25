export const paths = {
  auth: {
    login: "/login",
    signup: "/signup",
    forget_password: "/forget-password",
    reset_password: "/reset-password",
  },
  public: {
    home: "/",
    about: "/about",
    blog: "/blog",
    blog_details: (id: string) => `/blog/${id}`,
    faq: "/faq",
    privacy_policy: "/privacy-policy",
    terms_and_condition: "terms-and-condition",
  },
  private: {
    dashboard: "/dashboard",
  },
};

export type PathsTypes = typeof paths;
