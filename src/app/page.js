"use client";
import React from "react";
import About from "./about/page";
import Projects from "./projects/page.js"
// Function Implementation
export default function Home() {
  // HTML layout
  return (
    <div>
      Pakistan Zindabad
      <br/>
      <Projects/>
      <br/>
      <About/>


    </div>
  );
}
