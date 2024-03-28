import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      xs: ["0.625rem", { lineHeight: "1rem" }],
      sm: ["0.75rem", { lineHeight: "1rem" }],
      md: ["0.875rem", { lineHeight: "1.25rem" }],
      lg: ["1rem", { lineHeight: "1.5rem" }],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: {
        "01": "var(--gray-01)",
        "02": "var(--gray-02)",
        "03": "var(--gray-03)",
        "04": "var(--gray-04)",
        "05": "var(--gray-05)",
        "06": "var(--gray-06)",
        "07": "var(--gray-07)",
        "08": "var(--gray-08)",
        "09": "var(--gray-09)",
        10: "var(--gray-10)",
        11: "var(--gray-11)",
        12: "var(--gray-12)",
      },
      "gray-a": {
        "01": "var(--gray-a1)",
        "02": "var(--gray-a2)",
        "03": "var(--gray-a3)",
        "04": "var(--gray-a4)",
        "05": "var(--gray-a5)",
        "06": "var(--gray-a6)",
        "07": "var(--gray-a7)",
        "08": "var(--gray-a8)",
        "09": "var(--gray-a9)",
        "10": "var(--gray-a10)",
        "11": "var(--gray-a11)",
        "12": "var(--gray-a12)",
      },
    },
    extend: {},
  },
};
export default config;
