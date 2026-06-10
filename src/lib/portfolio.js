// ============================================================================
// portfolio.js — single source of truth for everything the terminal displays.
// Ported from the design prototype (design/data.js). Edit here to update.
// ============================================================================

// Career began December 2020 — years of experience are derived, never hardcoded.
const CAREER_START = new Date(2020, 11, 1); // months are 0-indexed → 11 = Dec
function fullYearsSince(start) {
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  const beforeAnniversary =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());
  if (beforeAnniversary) years -= 1;
  return years;
}
export const EXPERIENCE_YEARS = fullYearsSince(CAREER_START);

export const portfolio = {
  user: "usama",
  host: "archlinux",
  shellPath: "~/portfolio",

  // ---- neofetch / system info card -------------------------------------
  system: {
    name: "Usama Imdad",
    title: "Senior Full-Stack ML Engineer | Embedded Systems + Web + AI Integrations",
    photo: "/images/profile.webp",
    os: "Hafizabad, Pakistan",
    uptime: `${EXPERIENCE_YEARS}+ years building`,
  },

  // ---- whoami / about --------------------------------------------------
  about: [
    `I'm a Full-Stack ML Engineer with ${EXPERIENCE_YEARS}+ years of experience building intelligent systems at the intersection of machine learning, embedded systems, and full-stack web development.`,
    "",
    "I specialize in designing and deploying machine learning models for edge and IoT environments, integrating real-time analytics with low-level hardware and high-level interfaces. Whether it's using PyTorch for model training, Arduino for hardware control, or React/Django for web interfaces, I bring a systems-level view to solving complex problems.",
    "",
    "My previous roles include building a smart vending machine backend, deploying ML models for video analytics, and working on research projects in computer vision and NLP.",
    "",
    "I'm currently open to freelance work and research-driven roles in intelligent systems, embedded ML, or full-stack AI platforms.",
  ],

  // ---- skills ----------------------------------------------------------
  skills: [
    {
      cat: "Machine Learning",
      items: ["PyTorch", "TensorFlow", "scikit-learn", "pandas / NumPy", "OpenCV", "Forecasting"],
    },
    {
      cat: "Full-Stack",
      items: ["React / Next.js", "Node / FastAPI", "PostgreSQL", "TypeScript", "REST / WebSockets"],
    },
    {
      cat: "IoT",
      items: ["ESP32 / Arduino", "Embedded C/C++", "MQTT", "OTA updates", "Sensor fusion"],
    },
    {
      cat: "DevOps",
      items: ["Docker", "GitHub Actions", "Terraform", "AWS", "Linux / Bash", "Nginx"],
    },
  ],

  // ---- work experience -------------------------------------------------
  experience: [
    {
      role: "Full Stack Developer",
      org: "Vending Central",
      type: "Part-time",
      period: "Feb 2023 – Present",
      duration: "3 yrs 5 mos",
      location: "Lahore, Pakistan · On-site",
      skills: ["C++", "Embedded Devices"],
      more: 2,
    },
    {
      role: "Research Assistant",
      org: "Lahore University of Management Sciences",
      type: "Part-time",
      period: "Feb 2023 – Present",
      duration: "3 yrs 5 mos",
      location: "Lahore, Pakistan · On-site",
      skills: ["Python", "Machine Learning"],
      more: 1,
    },
    {
      role: "Data Scientist / AI Engineer",
      org: "Maincode",
      type: "Contract",
      period: "Aug 2025 – Jun 2026",
      duration: "11 mos",
      location: "Remote",
      skills: ["Data Science"],
      more: 0,
    },
    {
      role: "Machine Learning Engineer",
      org: "iNeuron",
      type: "Full-time",
      period: "Feb 2022 – Oct 2022",
      duration: "9 mos",
      location: "Lahore, Pakistan · Remote",
      skills: ["Data Engineering", "Computer Vision"],
      more: 0,
    },
    {
      role: "Full Stack Developer",
      org: "SlimLogix",
      type: "Full-time",
      period: "Dec 2020 – Feb 2022",
      duration: "1 yr 3 mos",
      location: "Lahore, Pakistan · On-site",
      skills: ["JavaScript", "ETL"],
      more: 1,
    },
  ],

  // ---- education -------------------------------------------------------
  education: [
    {
      school: "Information Technology University",
      degree: "Master's Degree, Data Science",
      period: "Aug 2022 – Aug 2025",
    },
    {
      school: "COMSATS University Islamabad",
      degree: "Bachelor's Degree, Computer Engineering",
      period: "2016 – 2020",
    },
  ],

  // ---- certifications --------------------------------------------------
  certifications: [
    { name: "Learn GitHub Actions for CI/CD DevOps Pipelines", issuer: "Udemy", date: "Nov 2023", skills: ["DevOps"] },
    { name: "Introduction to C++", issuer: "Simplilearn", date: "Nov 2023", skills: ["C++"] },
    { name: "Machine Learning Engineering for Production (MLOps)", issuer: "DeepLearning.AI", date: "Jan 2023", credId: "WRV6YBNUY6J4", skills: ["ETL", "Pipelines"] },
    { name: "Machine Learning Modeling Pipelines in Production", issuer: "DeepLearning.AI", date: "Jan 2023", credId: "MUDQSM5ZUY5G" },
    { name: "Deep Neural Networks with PyTorch", issuer: "IBM", date: "Jan 2023", credId: "U3EKJ74NZKG9", skills: ["PyTorch"] },
    { name: "Machine Learning Data Lifecycle in Production", issuer: "DeepLearning.AI", date: "Dec 2022", credId: "EWZT8ZE9GJ2M" },
    { name: "SQL (Basic)", issuer: "HackerRank", date: "Nov 2022", credId: "74f51a1465c9" },
    { name: "Introduction to Machine Learning in Production", issuer: "DeepLearning.AI", date: "Nov 2022", credId: "RZG4ZV7SDBWT" },
    { name: "Registered Computer Engineer", issuer: "Pakistan Engineering Council", date: "Oct 2021" },
  ],

  // ---- contact / socials ----------------------------------------------
  socials: [
    { key: "github", label: "GitHub", handle: "usamaimdadsian", url: "https://github.com/usamaimdadsian/" },
    { key: "linkedin", label: "LinkedIn", handle: "usama-imdad", url: "https://www.linkedin.com/in/usama-imdad/" },
    { key: "x", label: "X / Twitter", handle: "@UsamaImdadSian", url: "https://x.com/UsamaImdadSian/" },
    { key: "youtube", label: "YouTube", handle: "@UsamaImdad", url: "https://www.youtube.com/@UsamaImdad" },
    { key: "upwork", label: "Upwork", handle: "Usama Imdad", url: "https://www.upwork.com/freelancers/~011205f723950c7f04" },
    { key: "blog", label: "Blog", handle: "TlueAftab", url: "https://tlueaftab.com/" },
  ],
};
