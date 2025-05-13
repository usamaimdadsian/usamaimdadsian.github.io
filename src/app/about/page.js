import Image from "next/image"
import Social from "@/components/Social"

export default function About () {
  return (
    <div style={{textAlign:"justify"}}>
      <h1>About Me</h1>
      <Image src={"/images/profile.webp"} style={{borderRadius:"5%", float:"left", marginRight:"20px"}} width={130} height={130} alt="Usama Imdad"/>
      <p>
        Hello! my name is Usama Imdad. I am from a village in Hafizabad, Pakistan. I have Bachelor's in Computer Engineering and Master's in Data Science.
      </p>
      <p style={{textIndent:"3em"}}>
        As a skilled developer with more than 4 years of experience, I am proficient in Machine Learning, Full Stack Development, IOT development and DevOps. My professional journey is distinguished by the development of analytical tools, IOT device's firmware and management dashboards, driving improvements in operational efficiency of different firms.
      </p>
      <p style={{textIndent:"3em"}}>
        What sets me apart is my keen interest and passion in solving difficult problems, building state of the art platforms and automating systems with the right set of skills and expertise. My experience ensures that the development I do is not only efficient but also intuitive, aligning with the needs of modern trends.
      </p>
      <p>I occasionaly write blogs at <a style={{color:"#2892fc"}} href="https://tlueaftab.com/" target="_blank">TlueAftab</a>.</p>

      <Social/>
    </div>
  )
}
