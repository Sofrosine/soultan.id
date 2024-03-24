import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "spin-slow": "spin 4s linear infinite",
      },
      colors: {
        "black-text": "#403631",
        primary: "#2F404F",
        secondary: "#3F7C88",
        tertiary: '#C7DAD3',

        success: "#179C70",
        info: "#2CB5DB",
        warning: "#DBA416",
        error: "#C23613",
      },
      fontSize: {
        "display-large": [
          "4.1429rem",
          {
            lineHeight: "5.1429rem",
            fontWeight: "700",
          },
        ],
        "display-medium": [
          "3.2143rem",
          {
            lineHeight: "3.7143rem",
            fontWeight: "700",
          },
        ],
        "display-small": [
          "2.5714rem",
          {
            lineHeight: "3.1429rem",
            fontWeight: "400",
          },
        ],
        "headline-large": [
          "2.2857rem",
          {
            lineHeight: "2.8571rem",
            fontWeight: "400",
          },
        ],
        "headline-medium": [
          "2rem",
          {
            lineHeight: "2.5714rem",
            fontWeight: "400",
          },
        ],
        "headline-small": [
          "1.7857rem",
          {
            lineHeight: "2.2857rem",
            fontWeight: "400",
          },
        ],
        "title-large": [
          "1.5714rem",
          {
            lineHeight: "2.2857rem",
            fontWeight: "400",
          },
        ],
        "title-medium": [
          "1.1429rem",
          {
            lineHeight: "1.7143rem",
            letterSpacing: "0.15px",
          },
        ],
        "title-small": [
          "1rem",
          {
            lineHeight: "1.4286rem",
            letterSpacing: "0.1px",
          },
        ],
        "body-large": [
          "1.1429rem",
          {
            lineHeight: "1.7143rem",
            letterSpacing: "0.0357rem",
            fontWeight: "700",
          },
        ],
        "body-medium": [
          "1rem",
          {
            lineHeight: "1.4286rem",
            letterSpacing: "0.0179rem",
            fontWeight: "500",
          },
        ],
        "body-small": [
          "0.8571rem",
          {
            lineHeight: "1.1429rem",
            letterSpacing: "0.0286rem",
            fontWeight: "400",
          },
        ],
        "label-large": [
          "1rem",
          {
            lineHeight: "1.4286rem",
            letterSpacing: "0.0071rem",
            fontWeight: "700",
          },
        ],
        "label-medium": [
          "0.8571rem",
          {
            lineHeight: "1.1429rem",
            letterSpacing: "0.0357rem",
            fontWeight: "700",
          },
        ],
        "label-small": [
          "0.7857rem",
          {
            lineHeight: "1.1429rem",
            letterSpacing: "0.0357rem",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
