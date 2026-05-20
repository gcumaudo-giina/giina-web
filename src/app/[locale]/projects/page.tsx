"use client";

import ProjectsGrid from "@/components/home/ProjectsGrid";
import Footer from "@/components/ui/Footer";

export default function ProjectsPage() {
  return (
    <main>
      <div style={{
        paddingTop:    "7rem",
        paddingBottom: "2rem",
        paddingLeft:   "var(--col-edge, 5vw)",
        paddingRight:  "var(--col-edge, 5vw)",
        background:    "#F7F6F4",
      }}>
        <span style={{
          display:       "flex",
          alignItems:    "center",
          gap:           "12px",
          fontFamily:    "var(--font-mono, monospace)",
          fontSize:      "10px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         "#A69885",
          marginBottom:  "3rem",
        }}>
          <span style={{ width: 24, height: 1, background: "#BC7856", display: "block" }} />
          All Projects
        </span>
      </div>
      <ProjectsGrid />
      <Footer />
    </main>
  );
}
