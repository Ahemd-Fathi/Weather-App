import * as React from "react";

// MUI components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function WeatherCard() {
  return (
    <Container maxWidth="md">
      {/* Content Container */}
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* CARD */}
        <div className="">
          {/* Content */}
          <div className="">
            {/* City & Time */}
            <div
              dir="rtl"
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "end",
              }}
            >
              <Typography
                variant="h2"
                component="h2"
                style={{ marginRight: "20px" }}
              >
                مصر
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                style={{ marginRight: "20px" }}
              >
                السبت 3-5-2025
              </Typography>
            </div>
            {/* ===City & Time=== */}
            <hr />
            {/* Degree & Description */}
            <div className=""></div>
            {/* ===Degree & Description=== */}
          </div>
          {/* ===Content=== */}
        </div>
        {/* ===CARD=== */}
      </div>
      {/* ===Content Container=== */}
    </Container>
  );
}
