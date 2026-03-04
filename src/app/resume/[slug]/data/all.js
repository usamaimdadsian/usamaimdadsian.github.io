
const all = [
  {
    name: "Professional Experience",
    headings: [
      {
        name: "AI Engineer",
        institute: "Maincode, Remote",
        date: "Aug 2025 - Present",
        items: [
          "Designed and implemented an end-to-end data pipeline for large-scale Australian web data collection for LLM training, integrating custom crawlers, Apache Nutch, Wikipedia/Wikibooks APIs, Solr indexing, AWS S3 storage, Airflow orchestration, and ETL workflows for scalable data ingestion and processing.",
          "Developed domain-filtered web crawling infrastructure using Apache Nutch and Solr, implementing regex URL filters (.au prioritization), large-scale blocklists (20K+ harmful/news domains, 100+ social domains), deduplication via content hashing, and S3-based distributed storage to ensure high-quality, relevant training corpora.",
          "Engineered post-processing pipelines for synthetic coding datasets, including semantic code similarity removal and automated difficulty scoring for programming problems, improving dataset diversity, quality control, and model training effectiveness.",
        ]

      },
      {
        name: "Full Stack Developer",
        institute: "CITY, LUMS, Lahore",
        date: "Feb 2023 - Aug 2025",
        items: [
          "Developed a computer vision pipeline to infer geological parameters in borehole data to create PDF reports",
          "Developed React-based front-end dashboard for vending machine management, encompassing user-friendly interfaces, backend API integration, and real-time data insights for streamlined management, enhanced efficiency, and improved decision-making.",
          "Leveraged self-supervised learning based methods to train foundation models on domain-specific geological image data, improving model performance without requiring large labeled datasets.",
          "Built a cloud-based solution utilizing MQTT for machine heartbeats, deploying it successfully on the cloud platform, resulting in improved operational efficiency for the company.",
          "Applied state-of-the-art methods to detect and classify key geological features including defect spacing, inferred strength, color and weathering",
        ]
      },
      {
        name: "ML Engineer",
        institute: "iNeuronltd, Lahore",
        date: "Feb 2022 - Oct 2022",
        items: [
          "Accomplished a 50% reduction in analysis time, by designing a PyQt software for sugar crystal analysis that utilizes a pre-trained UNET model further trained (Transfer Learning) on a custom dataset for crystal segmentation.",
          "Developed a person detection system with tracking features for video streams using the TensorFlow JS library and Kalman filter. The system calculates the number of people passing through the camera's view with 80% accuracy.",
          "Coded a gaze detection algorithm for a hardware device, capable of detecting eye movement in four different directions: left, right, up, and middle. The algorithm achieved high accuracy and was integrated into the hardware.",
          "Constructed a face recognition system using three models (MTCNN, FaceNet, and SVM) for higher accuracy and faster processing, resulting in a 95%+ accuracy with an inference time of 250ms.",
          "Accomplished a 10x reduction in false positive rate, as measured by precision, by designing and training a deep learning model to detect fraudulent transactions.",
          "Fashioned a deep learning model on a project to automate the grading of exams for 1st grade, that achieved 97% accuracy on the test set. As a result, the users were able to grade the exams with less effort and time."
        ]
      },
      {
        name: "Full Stack Developer",
        institute: "Slimlogix, Lahore",
        date: "Dec 2020 - Feb 2022",
        items: [
          "Built a Python-based web scraper using Selenium and BeautifulSoup to extract, parse, and store product data from an e-commerce platform, enabling automated data collection for analysis.",
          "Drafted front-end and back-end code for a website using React and Node.js, implementing a recommendation system based on collaborative filtering to deliver personalized music recommendations to users.",
          "Designed a 3D face construction website using Vue JS and Node JS that uses direct volumetric CNN regression on face images to convert them to 3D objects and can return each result in less than 3 minutes.",
          "Constructed a dashboard using Vue JS and Laravel, cooperating with the team of computer vision developers, for the company's product (a video surveillance system), that managed 3 different purpose computer vision models.",
          "Engineered and tested a streaming server based on FFmpeg to minimize the load on IP cameras running in a loop, allowing infinite users to see live streams on demand with an 80% success rate measured by users' feedback.",
          "Deployed production-ready Laravel and Vue applications on a Debian-based Linux system with NGINX, resulting in a 99.9% uptime.",
          "Dockerized proprietary deep learning models for cloud deployment and implemented a version control system, increasing development efficiency by 40%.",
          "Engineered a scalable data pipeline with Scrapy to crawl and aggregate product pricing, availability, and review data from multiple competitor websites, enabling real-time market trend analysis and dynamic pricing strategies."
        ]

      }
    ]
  },
  {
    name: "Projects",
    headings: [
      {
        name: "Developer",
        institue: "SELF",
        date: "Aug 2020 - Present",
        items: [
          "Implemented a Python scraper integrating the YouTube Data API and BeautifulSoup to collect targeted video metadata and content, automating publication workflows for website updates.",
          "Optimized YOLO and ReID models for Jetson Nano and Jetson Orin platforms by implementing FP16 and INT8 quantization, achieving enhanced inference speed and reduced resource consumption without significant accuracy loss.",
          "Contributed to the BoxMOT repository by fixing a batch size incompatibility in TensorRT-based ReID model inference.",
          "Developed an n8n workflow integrating LLMs (Gemini) with the WordPress to automate SEO optimization, including dynamic rewriting of titles and meta descriptions to improve search engine visibility and engagement."
        ]
      }
    ]
  },
  {
    name: "Skills",
    skills: [
      {
        key: "Programming Languages",
        value: "C++, Python, JavaScript"
      },
      {
        key: "Data Science Libraries",
        value: "n8n, Nutch, Airflow, Spark, Selenium"
        // value: "n8n, Ollama, Pandas, NumPy, Scikit-learn, TensorFlow, Matplotlib, Seaborn, BeautifulSoup, Selenium"
      },
      {
        key: "Database & Cloud",
        value: "AWS, SQLite, Linux VPS, Docker, Redis, Azure"
      },
      {
        key: "Frameworks & Tools",
        value: "PyTorch, Flask, NodeJS, React JS, Git"
        // value: "PyTorch, Laravel, NodeJS, React JS, Vue JS, Git"
      },
    ]
  },
  {
    name: "Education",
    headings: [
      {
        name: "Master's in Data Science",
        institute: "Information Technology University, Lahore",
        date: "Graduation Date: Jan 2026"
      },
      {
        name: "Bachelor's in Computer Engineering",
        institute: "COMSATS University, Lahore",
        date: "Graduation Date: Aug 2020"
      }
    ]
  },
  {
    name: "Certifications",
    certifications: [
      {
        name: "Deep Neural Networks with PyTorch",
        link: "https://www.coursera.org/account/accomplishments/verify/U3EKJ74NZKG9",
        linkName: "IBM (Coursera)",
        date: "Jan 2023"
      },
      {
        name: "Machine Learning Engineering for Production (MLOps)",
        link: "https://coursera.org/verify/specialization/WRV6YBNUY6J4",
        linkName: "DeepLearning.AI (Coursera)",
        date: "Jan 2022"
      },
      {
        name: "SQL (Basics)",
        link: "https://www.hackerrank.com/certificates/74f51a1465c9",
        linkName: "HackerRank",
        date: "Nov 2022"
      }
    ]
  }
]

export default all
