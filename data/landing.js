import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "1K+",
    label: "Active Users",
  },
  {
    value: "₹2M+",
    label: "Transactions Tracked",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.8/5",
    label: "User Rating",
  },
];

// Features Data
export const featuresData = [
  {
      icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
      title: "Comprehensive Analytics",
      description:
        "Dive deep into your spending behavior and uncover trends with powerful AI analytics.",
    },
    {
      icon: <Receipt className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Receipt Scanner",
      description:
        "Automate the process of scanning receipts and extracting important data with cutting-edge AI.",
    },
    {
      icon: <PieChart className="h-8 w-8 text-blue-600" />,
      title: "Smart Budget Management",
      description: "Easily create budgets and get intelligent recommendations based on your spending.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      title: "Unified Account Management",
      description: "Manage all your accounts and credit cards from a single platform with ease.",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Global Currency Support",
      description: "Track and convert multiple currencies in real-time for a truly global financial experience.",
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "Instant Financial Insights",
      description: "Receive automatic, personalized financial insights that help you make smarter decisions.",
    },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "1. Create Your Account",
    description:
      "Get started in minutes with our simple and secure sign-up process",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "2. Track Your Spending",
    description:
      "Automatically categorize and track your transactions in real-time",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "3. Get Insights",
    description:
      "Receive AI-powered insights and recommendations to optimize your finances",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Aarav Mehta",
    role: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    quote:
      "This app has completely changed how I manage my finances. The automated insights have helped me make better investment decisions effortlessly.",
  },
  {
    name: "Neha Sharma",
    role: "Freelance Designer",
    image: "https://randomuser.me/api/portraits/women/76.jpg",
    quote:
      "Tracking expenses has never been this easy! The AI-powered budget planning tool ensures I never overspend while working on multiple projects.",
  },
  {
    name: "Rohan Kapoor",
    role: "Finance Consultant",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    quote:
      "I highly recommend this app to professionals and businesses. Its real-time analytics and smart tracking make financial planning seamless.",
  },
];