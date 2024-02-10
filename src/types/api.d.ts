interface TopBarProps {
  label: string;
  value: string;
}

interface PortofolioProps {
  name: string;
  image?: string;
  logo?: string;
  created_at: string;
  description: string;
  stacks: string[];
  link?: string;
  main_stack: "react-native" | "react-next" | "flutter";
}

interface JourneyProps {
  logo: string;
  duration: string;
  company: string;
  role: string;
  description: string[];
  link: string;
}
