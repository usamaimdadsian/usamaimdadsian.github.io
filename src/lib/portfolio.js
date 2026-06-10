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

  // ---- resume / experience timeline ------------------------------------
  resume: [
    {
      role: "Software Engineer",
      org: "Freelance · Upwork",
      period: "2022 — present",
      points: [
        "Built IoT firmware + management dashboards for international clients.",
        "Delivered ML analytical tools improving operational efficiency.",
      ],
    },
    {
      role: "Full-Stack / IoT Developer",
      org: "Industry",
      period: "2020 — 2022",
      points: [
        "Developed device firmware and the platforms that manage them end-to-end.",
        "Automated deployment and infrastructure with CI/CD pipelines.",
      ],
    },
    {
      role: "MS, Data Science",
      org: "University",
      period: "Graduate",
      points: ["Specialised in machine learning and applied data analysis."],
    },
    {
      role: "BS, Computer Engineering",
      org: "University",
      period: "Undergraduate",
      points: ["Foundations in embedded systems, software and hardware."],
    },
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
