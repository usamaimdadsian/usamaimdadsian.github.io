const data =  {
  name : "USAMA IMDAD",
  location: "Lahore, Pakistan",
  email: "usamaimdadsian@gmail.com",
  number: "(+92)346-0576456",
  linkedinName: "linkedin.com/in/usama-imdad",
  linkedinLink: "https://www.linkedin.com/in/usama-imdad/",
  sections: [
    {
      name: "Education",
      headings: [
        {
          name: "Master's in Data Science",
          institute: "Information Technology University, Lahore",
          date: "Expected Graduation Date: Oct 2024"
        },
        {
          name: "Bachelor's in Computer Engineering",
          institute: "COMSATS University, Lahore",
          date: "Graduation Date: Aug 2020"
        }
      ]
    },
    {
      name: "Work Experience",
      headings: [
        {
          name: "Research Assistant",
          institute: "Lahore University of Management Sciences, Lahore",
          date: "Feb 2023 - Present",
          items: [
            "Developed React-based front-end dashboard for vending machine management, encompassing user-friendly interfaces, backend API integration, and real-time data insights for streamlined management, enhanced efficiency, and improved decision-making.",
          "Built a cloud-based solution utilizing MQTT for machine heartbeats, deploying it successfully on the cloud platform, resulting in improved operational efficiency for the company."
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
            "Drafted front-end and back-end code for a website using React and Node.js, implementing a recommendation system based on collaborative filtering to deliver personalized music recommendations to users.",
            "Designed a 3D face construction website using Vue JS and Node JS that uses direct volumetric CNN regression on face images to convert them to 3D objects and can return each result in less than 3 minutes.",
            "Constructed a dashboard using Vue JS and Laravel, cooperating with the team of computer vision developers, for the company's product (a video surveillance system), that managed 3 different purpose computer vision models.",
            "Engineered and tested a streaming server based on FFmpeg to minimize the load on IP cameras running in a loop, allowing infinite users to see live streams on demand with an 80% success rate measured by users' feedback.",
            "Deployed production-ready Laravel and Vue applications on a Debian-based Linux system with NGINX, resulting in a 99.9% uptime.",
            "Dockerized proprietary deep learning models for cloud deployment and implemented a version control system, increasing development efficiency by 40%."
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
          value: "Pandas, NumPy, Scikit-learn, TensorFlow, Matplotlib, Seaborn, BeautifulSoup, Selenium"
        },
        {
          key: "Database & Cloud",
          value: "MySQL, PostgreSQL, SQLite, Linux VPS, Docker, Redis, Azure"
        },
        {
          key: "Frameworks & Tools",
          value: "PyTorch, Laravel, NodeJS, React JS, Vue JS, Git"
        },
      ]
    },
    {
      name: "Certifications",
      certifications: [
        {
          name:"Deep Neural Networks with PyTorch",
          link: "https://www.coursera.org/account/accomplishments/verify/U3EKJ74NZKG9",
          linkName: "IBM (Coursera)",
          date: "Jan 2023"
        },
        {
          name:"Machine Learning Engineering for Production (MLOps)",
          link: "https://coursera.org/verify/specialization/WRV6YBNUY6J4",
          linkName: "DeepLearning.AI (Coursera)",
          date: "Jan 2022"
        },
        {
          name:"SQL (Basics)",
          link: "https://www.hackerrank.com/certificates/74f51a1465c9",
          linkName: "HackerRank",
          date: "Nov 2022"
        }
      ]
    }
  ]
}

const styles = {
  resumeContent: {
    maxWidth: 'calc(min(760px,100%))',
    margin: "0 auto",
  },
  title: {
    textAlign: 'center',
    marginBottom: "10px"
  },
  h2Heading: {
    textTransform: 'uppercase'
  },
  horizontalLine: {
    marginTop: "0px",
    display: 'block',
    height: '1px',
    background: 'transparent',
    width: '100%',
    border: 'none',
    borderTop: '1px solid'
  },
  headingItem: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0',
  },
  headingDate: {
    display: 'flex',
    alignItems: 'center'
  },
  listParent: {
    marginLeft: "20px"
  },
  listItem: {
    marginBottom: "10px",
    textAlign: "justify"
  },
  skillsParent: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10px"
  },
  skillsKeys: {
  },
  skillsValues: {
    marginLeft: "25px"
  },
  table: {
    display:"flex",
    flexDirection: "column",
    width:"100%"
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%"
  },
  tableCell: {
    //flex: 1,
  }
}

export {data, styles}
