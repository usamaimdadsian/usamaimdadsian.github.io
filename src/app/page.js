"use client";
import React,{ useState, useRef } from "react";
import { data, styles } from "./data";
import {Svg,Line, Document, Page, Text, View, StyleSheet, PDFDownloadLink, pdf, Link } from "@react-pdf/renderer";
// Function Implementation
export default function Home() {
  const elementRef = useRef()
  const [downloading, setDownloading] = useState(false)
  // PDF document styles
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
  // PDF document defination
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
  // Function to trigger downloading
  const generatePdf = async () => {
    //setDownloading(true)
    const blob = await pdf(<ResumeDocument/>).toBlob();
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    //link.target="_blank"
    //link.rel="noopener noreffer"
    link.download = "Usama Imdad's Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    //setDownloading(false)
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
      <button className="download-btn" disabled={downloading} onClick={generatePdf}>
        <svg style={styles.downloadIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
      </button>
      <style jsx>{`
        .download-btn{
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .download-btn:hover {
          background-color: #2980b9;
        }
      `}</style>
      {/*<PDFViewer>
        <ResumeDocument/>
      </PDFViewer>
      */}
    </div>
  );
}
