// ============================================================================
// portfolio.js — single source of truth for everything the terminal displays.
// Ported from the design prototype (design/data.js). Edit here to update.
// ============================================================================

export const portfolio = {
  user: "usama",
  host: "archlinux",
  shellPath: "~/portfolio",

  // ---- neofetch / system info card -------------------------------------
  system: {
    name: "Usama Imdad",
    title: "Software Engineer · ML / Full-Stack / IoT / DevOps",
    photo: "/images/profile.webp",
    os: "Hafizabad, Pakistan",
    uptime: "4+ years building",
    de: "Computer Engineering (BS)",
    wm: "Data Science (MS)",
    shell: "problem-solver",
    terminal: "ships intuitive systems",
    cpu: "Machine Learning",
    gpu: "Full-Stack Development",
    memory: "IoT Firmware · DevOps",
  },

  // ---- whoami / about --------------------------------------------------
  about: [
    "Hello! My name is Usama Imdad. I'm from a village in Hafizabad,",
    "Pakistan. I hold a Bachelor's in Computer Engineering and a",
    "Master's in Data Science.",
    "",
    "As a developer with 4+ years of experience, I'm proficient in",
    "Machine Learning, Full-Stack Development, IoT development and",
    "DevOps. My journey is distinguished by building analytical tools,",
    "IoT firmware and management dashboards that drive operational",
    "efficiency across firms.",
    "",
    "What sets me apart is a passion for solving difficult problems,",
    "building state-of-the-art platforms, and automating systems with",
    "the right set of skills. I occasionally write blogs at TlueAftab.",
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
