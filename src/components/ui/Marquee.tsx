const items = [
  { text: "Warm minimalism",     italic: false },
  { text: "Silent luxury",       italic: true  },
  { text: "Technical precision", italic: false },
  { text: "Travertine",          italic: false },
  { text: "Linen",               italic: true  },
  { text: "Light oak",           italic: false },
  { text: "Matt brass",          italic: false },
];

export default function Marquee() {
  const all = [...items, ...items]; // duplicate for seamless loop

  return (
    <div
      aria-hidden="true"
      style={{
        overflow: "hidden",
        borderTop: "1px solid #CFCDC9",
        borderBottom: "1px solid #CFCDC9",
        padding: "1.1rem 0",
        background: "#F7F6F4",
      }}
    >
      <div style={{
        display: "flex",
        gap: "3.5rem",
        width: "max-content",
        animation: "marquee-scroll 40s linear infinite",
        whiteSpace: "nowrap",
      }}>
        {all.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: item.italic
                ? "var(--font-forum, serif)"
                : "var(--font-ibm-plex-sans, sans-serif)",
              fontStyle: item.italic ? "italic" : "normal",
              fontWeight: 300,
              fontSize: "clamp(18px, 2.8vw, 34px)",
              color: "#4D5257",
              letterSpacing: item.italic ? "-0.01em" : "0",
              display: "inline-flex",
              alignItems: "center",
              gap: "3.5rem",
            }}
          >
            {item.text}
            <span style={{
              display: "inline-block",
              width: 4,
              height: 4,
              background: "#BC7856",
              borderRadius: "50%",
              flexShrink: 0,
            }} />
          </span>
        ))}
      </div>
    </div>
  );
}