"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const t = useTranslations("contact");

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const headlineLines = t("headline").split("\n");

  return (
    <main style={{ background: "#F7F6F4", minHeight: "100vh" }}>

      {/* ── Hero header ── */}
      <div style={{
        padding: "clamp(8rem, 16vh, 12rem) clamp(1.25rem, 3.2vw, 2.5rem) clamp(3rem, 6vh, 5rem)",
        borderBottom: "1px solid #CFCDC9",
      }}>
        <span style={{
          fontFamily: "var(--font-ibm-plex-mono, monospace)",
          fontSize: 10,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          color: "#BC7856",
          display: "block",
          marginBottom: "1.5rem",
        }}>
          ◆ {t("label")}
        </span>

        <h1 style={{
          fontFamily: "var(--font-open-sauce-one, sans-serif)",
          fontWeight: 300,
          fontSize: "clamp(36px, 5.5vw, 80px)",
          letterSpacing: "-0.03em",
          lineHeight: 1.0,
          color: "#4D5257",
          maxWidth: "16ch",
        }}>
          {headlineLines.map((line, i) => (
            <span key={i} style={{ display: "block" }}>
              {i === headlineLines.length - 1
                ? <em style={{ fontFamily: "var(--font-forum, serif)", fontStyle: "italic", fontWeight: 400, color: "#8B816E" }}>{line}</em>
                : line}
            </span>
          ))}
        </h1>
      </div>

      {/* ── 2-column: form + info ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr",
        gap: "clamp(3rem, 8vw, 8rem)",
        padding: "clamp(3rem, 6vh, 5rem) clamp(1.25rem, 3.2vw, 2.5rem) clamp(5rem, 10vh, 9rem)",
        maxWidth: 1320,
      }}
        className="contact-grid"
      >

        {/* Form */}
        <div>
          {status === "success" ? (
            <div style={{
              padding: "3rem 0",
              fontFamily: "var(--font-forum, serif)",
              fontStyle: "italic",
              fontSize: "clamp(20px, 2vw, 28px)",
              lineHeight: 1.4,
              color: "#8B816E",
            }}>
              {t("success")}
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

              <div className="contact-field">
                <label style={labelStyle}>{t("name")}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={inputStyle}
                  className="contact-input"
                />
              </div>

              <div className="contact-field">
                <label style={labelStyle}>{t("email")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                  className="contact-input"
                />
              </div>

              <div className="contact-field">
                <label style={labelStyle}>{t("message")}</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  style={{ ...inputStyle, resize: "none" }}
                  className="contact-input"
                />
              </div>

              {status === "error" && (
                <p style={{
                  fontFamily: "var(--font-ibm-plex-mono, monospace)",
                  fontSize: 11,
                  letterSpacing: ".12em",
                  color: "#BC7856",
                }}>
                  {t("error")}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "1rem",
                  fontFamily: "var(--font-ibm-plex-mono, monospace)",
                  fontSize: 11,
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  color: "#F7F6F4",
                  background: "#4D5257",
                  border: "none",
                  padding: "1rem 2rem",
                  cursor: "none",
                  opacity: status === "sending" ? 0.6 : 1,
                  transition: "opacity .3s ease",
                }}
                className="contact-btn"
              >
                {status === "sending" ? t("sending") : t("send")}
                {status !== "sending" && (
                  <span style={{
                    display: "inline-block",
                    width: 22, height: 1,
                    background: "#F7F6F4",
                    position: "relative",
                  }}>
                    <span style={{
                      position: "absolute", right: 0, top: -3.5,
                      width: 8, height: 8,
                      borderTop: "1px solid #F7F6F4",
                      borderRight: "1px solid #F7F6F4",
                      transform: "rotate(45deg)",
                      display: "block",
                    }} />
                  </span>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Info column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem", paddingTop: "0.5rem" }}>

          <div>
            <p style={infoLabelStyle}>Atelier</p>
            <p style={infoTextStyle}>
              Calle Camino del Cielo 7<br />
              29602 Marbella · Málaga<br />
              España
            </p>
            <p style={{ ...infoTextStyle, marginTop: "0.75rem", color: "#A69885" }}>By appointment only.</p>
          </div>

          <div>
            <p style={infoLabelStyle}>Email</p>
            <a href="mailto:studio@giinadesign.com" style={{ ...infoTextStyle, textDecoration: "none" }}>
              studio@giinadesign.com
            </a>
          </div>

          <div>
            <p style={infoLabelStyle}>Hours</p>
            <p style={infoTextStyle}>
              Mon — Fri<br />
              10:00 — 18:30 CET
            </p>
          </div>

          <div style={{
            borderTop: "1px solid #CFCDC9",
            paddingTop: "2rem",
            fontFamily: "var(--font-forum, serif)",
            fontStyle: "italic",
            fontSize: "clamp(16px, 1.6vw, 20px)",
            lineHeight: 1.55,
            color: "#8B816E",
          }}>
            We respond within 48 hours.
          </div>
        </div>
      </div>

      <style>{`
        .contact-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #CFCDC9;
          padding: 0.75rem 0;
          font-family: var(--font-ibm-plex-sans, sans-serif);
          font-weight: 300;
          font-size: 15px;
          color: #4D5257;
          outline: none;
          transition: border-color .35s ease;
        }
        .contact-input:focus { border-bottom-color: #BC7856; }
        .contact-btn:hover { background: #BC7856 !important; }
        @media (max-width: 700px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-ibm-plex-mono, monospace)",
  fontSize: 10,
  letterSpacing: ".22em",
  textTransform: "uppercase",
  color: "#A69885",
  display: "block",
  marginBottom: "0.75rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid #CFCDC9",
  padding: "0.75rem 0",
  fontFamily: "var(--font-ibm-plex-sans, sans-serif)",
  fontWeight: 300,
  fontSize: 15,
  color: "#4D5257",
  outline: "none",
};

const infoLabelStyle: React.CSSProperties = {
  fontFamily: "var(--font-ibm-plex-mono, monospace)",
  fontSize: 10,
  letterSpacing: ".22em",
  textTransform: "uppercase",
  color: "#BC7856",
  marginBottom: "0.75rem",
};

const infoTextStyle: React.CSSProperties = {
  fontFamily: "var(--font-ibm-plex-sans, sans-serif)",
  fontWeight: 300,
  fontSize: 14,
  lineHeight: 1.7,
  color: "#4D5257",
  display: "block",
};
