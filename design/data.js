// ============================================================================
// data.js — portfolio content. EDIT THIS FILE to update your portfolio.
// Everything the terminal displays comes from here.
// ============================================================================

window.PORTFOLIO = {
  user: "usama",
  host: "archlinux",
  shellPath: "~/portfolio",

  // ---- neofetch / system info card -------------------------------------
  system: {
    name: "Usama Imdad",
    title: "Software Engineer · ML / Full-Stack / IoT / DevOps",
    photo: "https://usamaimdadsian.github.io/images/profile.webp",
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

  // ---- projects (ls-style). Replace with your real projects. -----------
  // NOTE: placeholders inferred from bio — swap in your actual projects.
  projects: [
    {
      slug: "iot-fleet",
      name: "iot-fleet-manager",
      perm: "drwxr-xr-x",
      lang: "C++ / Python",
      blurb: "Firmware + dashboard to provision, monitor and OTA-update a fleet of IoT devices in real time.",
      stack: ["ESP32", "MQTT", "FastAPI", "React", "TimescaleDB"],
      year: "2024",
      url: "https://github.com/usamaimdadsian/",
    },
    {
      slug: "ml-analytics",
      name: "ml-analytics-suite",
      perm: "drwxr-xr-x",
      lang: "Python",
      blurb: "Analytical toolkit turning raw operational data into forecasts and anomaly alerts for ops teams.",
      stack: ["PyTorch", "pandas", "scikit-learn", "Streamlit"],
      year: "2023",
      url: "https://github.com/usamaimdadsian/",
    },
    {
      slug: "ops-dashboard",
      name: "ops-management-dashboard",
      perm: "drwxr-xr-x",
      lang: "TypeScript",
      blurb: "Full-stack management dashboard unifying device telemetry, billing and team workflows.",
      stack: ["Next.js", "Node", "PostgreSQL", "Docker"],
      year: "2023",
      url: "https://github.com/usamaimdadsian/",
    },
    {
      slug: "deploy-bot",
      name: "ci-deploy-automation",
      perm: "drwxr-xr-x",
      lang: "Shell / YAML",
      blurb: "Zero-touch CI/CD pipelines and infra-as-code that cut deploy time from hours to minutes.",
      stack: ["GitHub Actions", "Terraform", "Docker", "AWS"],
      year: "2022",
      url: "https://github.com/usamaimdadsian/",
    },
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

  // ---- resume / experience timeline. Replace with real roles. ----------
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
