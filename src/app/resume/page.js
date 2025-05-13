"use client";
import Link from "next/link";
import React from "react";
// Function Implementation
export default function Home() {
  // HTML layout
  return (
    <div>
      Resume Page
      <br />
      <Link href="/resume/ml">ML</Link> | <Link href="/resume/web">Web</Link> | <Link href="/resume/embedded">Embedded</Link> | <Link href="/resume/all">All</Link>
    </div>
  );
}
