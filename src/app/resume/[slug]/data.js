import ml from "./data/ml"
import web from "./data/web"
import embedded from "./data/embedded"
import all from "./data/all"


const data = {
  name: "USAMA IMDAD",
  location: "Lahore, Pakistan",
  email: "usamaimdadsian@gmail.com",
  number: "(+92)346-0576456",
  linkedinName: "linkedin.com/in/usama-imdad",
  linkedinLink: "https://www.linkedin.com/in/usama-imdad/",
  sections: []
}

const getData = (item) => {
  switch (item) {
    case "ml":
      data["sections"] = ml
      return data;
    case "web":
      data["sections"] = web
      return data;
    case "embedded":
      data["sections"] = embedded
      return data;
    default:
      data["sections"] = all
      return data;
  }
}

const styles = {
  resumeContent: {
    maxWidth: 'calc(min(760px,100%))',
    margin: "50px auto",
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
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%"
  },
  tableCell: {
    //flex: 1,
  },
  downloadBtn: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  downloadIcon: {
    fill: "white",
    width: "24px",
    height: "24px"
  }
}

export { getData, styles }
