export const env = {
  environment: import.meta.env.MODE as "development" | "production",
  api: {
    url: import.meta.env.VITE_API_URL as string,
  },
  demoUser: {
    username: import.meta.env.VITE_DEMO_USER_USERNAME as string | undefined,
    password: import.meta.env.VITE_DEMO_USER_PASSWORD as string | undefined,
  },
  links: {
    authorPage: "https://github.com/drodzewicz",
    sourceCode: "https://github.com/drodzewicz/Work-Flow",
  },
};
