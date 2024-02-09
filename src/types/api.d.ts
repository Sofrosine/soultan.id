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
