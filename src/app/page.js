"use client";
import React,{ useRef } from "react";
//import styles from "./page.module.css";
import { data, styles } from "./data";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import {Svg,Line, Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink, pdf, Link } from "@react-pdf/renderer";
// Function Implementation
export default function Home() {
  const elementRef = useRef()
  const pageStyles = StyleSheet.create({
    ...styles,
    page:{
      fontSize: "10px",
      padding: "30px"
    },
    title: {
      ...styles.title,
      marginBottom: "0px"
    },
    h2Heading: {
      ...styles.h2Heading,
      fontWeight: "bold",
      fontSize: '12px',
      marginTop: "10px"
    },
    headingItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: "5px"
    },
    listItem: {
      ...styles.listItem,
      display: "flex",
      marginBottom: "5px",
      flexDirection: "row",
    },
  })
  const ResumeDocument = () => (
    <Document>
      <Page size="A4" style={pageStyles.page}>
        <View style={pageStyles.title}>
          <Text style={{fontSize: '16px', fontWeight: "bolder"}}>{data.name}</Text>
          <Text>{data.location} | {data.number} | <Link src={"mailto:"+data.email}>{data.email}</Link> | <Link src={data.linkedinLink}> {data.linkedinName}</Link></Text>
        </View>
        <View>
          {data.sections.map((sec, index) => (
            <React.Fragment key={index}>
              <Text style={pageStyles.h2Heading}>{sec.name}</Text>
              <View style={{borderBottom: '1px solid black'}}></View>
              {sec.headings?.map((head, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  <View style={pageStyles.headingItem}>
                    <View style={{display:"flex" }}>
                      <Text style={{fontWeight: "bold", fontSize: "11px"}}>{head.name}</Text>
                      <Text style={{fontStyle: "italic", fontSize: "11px"}}>{head.institute}</Text>
                    </View>
                    <View style={pageStyles.headingDate}>
                      <Text>{head.date}</Text>
                    </View>
                  </View>
                  {(head.items && head.items.length > 0 ) &&
                    <View style={{marginTop: "5px"}}>
                      {head.items.map((li,lind) => (
                        <View key={lind} style={pageStyles.listItem}>
                          <View style={{display:"flex",padding:"0 5px", fontSize: "15px"}}><Text >•</Text></View>
                          <View style={{flex:1}}><Text style={{textAlign:"justify",flexWrap:"wrap"}}>{li}</Text></View>
                        </View>
                      ))}
                    </View>
                  }
                </React.Fragment>
              ))}
              {sec.skills && (
                <View style={{...pageStyles.table, margin:"5px 0px"}}>
                  {sec?.skills?.map((skill,skillInd) => (
                    <View key={skillInd} style={pageStyles.tableRow}>
                      <View style={{...pageStyles.tableCell, flex:0.3}}><Text>{skill.key}</Text></View>
                      <View style={{...pageStyles.tableCell, flex:0.7}}><Text>{skill.value}</Text></View>
                    </View>
                  ))}
                </View>
              )}
              {sec.certifications &&
                <View style={{...pageStyles.table, margin: "5px 0px", width:"100%"}}>
                {sec.certifications?.map((cert,certId) => (
                  <View style={pageStyles.tableRow} key={certId}>
                    <View style={{...pageStyles.tableCell, flex: 0.4}}><Text>{cert.name}</Text></View>
                    <View style={{...pageStyles.tableCell, flex: 0.3}}><Link src={cert.link}>{cert.linkName}</Link></View>
                    <View style={{...pageStyles.tableCell, flex: 0.3, textAlign:"right"}}><Text>{cert.date}</Text></View>
                  </View>
                ))}
                </View>
              }
            </React.Fragment>
          ))}
        </View>
      </Page>
    </Document>
  )  
  //const generatePdf = useReactToPrint({
  //  documentTitle: "Usama Imdad",
  //  contentRef: elementRef,
  //  pageStyle: `
  //    @media print{
  //      .${styles.resumeContent}{
  //        margin: 10mm;
  //      }
  //    }
  //  `
  //})
  const generatePdf = async () => {
    const blob = await pdf(<ResumeDocument/>).toBlob();
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = "Usama Imdad's Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  // HTML layout
  return (
    <div>
      <div ref={elementRef} style={styles.resumeContent}>
        <div style={styles.title}>
          <h1>{data.name}</h1>
          <p>{data.location} | {data.number} | <a href={data.email}>{data.email}</a> | <a href={data.linkedinLink}>{data.linkedinName}</a></p>
        </div>
        <main>
          {data.sections.map((sec,index) => (
            <React.Fragment key={index}>
              <h2 style={styles.h2Heading}>{sec.name}</h2>
              <span style={styles.horizontalLine}/>
              {sec.headings?.map((item,ind) => (
                <React.Fragment key={ind}>
                  <div style={styles.headingItem}>
                    <div>
                      <b>{item.name}</b>
                      <br/>
                      <i>{item.institute}</i>
                    </div>
                    <div style={styles.headingDate}>
                      {item.date}
                    </div>
                  </div>
                  {(item.items && item.items.length > 0 ) &&
                    <ul style={styles.listParent}>
                      {item.items.map((li,lind) => (
                        <li style={styles.listItem} key={lind}>{li}</li>
                      ))}
                    </ul>
                  }
                </React.Fragment>
              ))}
              {sec.skills &&
                <div style={{...styles.table, margin:"10px 0px"}}>
                  {sec.skills?.map((skill,skillInd) => (
                    <div key={skillInd} style={styles.tableRow}>
                      <div style={{...styles.tableCell, flex: 0.3}}><b>{skill.key}:</b></div>
                      <div style={{...styles.tableCell,flex: 0.7}}>{skill.value}</div>
                    </div>
                  ))}
                </div>
              }
              {sec.certifications &&
                <div style={{...styles.table, margin: "10px 0px", width:"100%"}}>
                {sec.certifications?.map((cert,certId) => (
                  <div style={styles.tableRow} key={certId}>
                    <div style={{...styles.tableCell, flex: 0.4}}><b>{cert.name}</b></div>
                    <div style={{...styles.tableCell, flex: 0.3}}><a style={{textDecoration:"underline"}} href={cert.link}>{cert.linkName}</a></div>
                    <div style={{...styles.tableCell, flex: 0.3, textAlign:"right"}}>{cert.date}</div>
                  </div>
                ))}
                </div>
              }
            </React.Fragment>
          ))}
        </main>
      </div>
      <button onClick={generatePdf}>Download</button>
      <PDFViewer>
        <ResumeDocument/>
      </PDFViewer>
    </div>
  );
}
