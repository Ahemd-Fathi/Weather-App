import * as React from "react";
import { useEffect, useState } from "react";

// MUI components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// External Libraries
import axios from "axios";
import moment from "moment/moment";
import "moment/locale/ar"; // Import Arabic locale for moment.js
import { useTranslation } from "react-i18next";

// Redux Import

import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../weatherApiSlice";

moment.locale("ar"); // Set the locale to Arabic
export default function WeatherCard() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => {
    return state.weather.isLoading;
  });

  const temp = useSelector((state) => {
    return state.weather.weather;
  });

  const { t, i18n } = useTranslation();

  // ========== States ==========
  const [dateAndTime, setDateAndTime] = useState("");
  const [locale, setLocale] = useState("ar"); // Default locale is Arabic

  // ==========Event Handlers==========

  function handleLanguageChange() {
    if (locale === "en") {
      setLocale("ar"); // Change to Arabic
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en"); // Change to English
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDateAndTime(moment().format("dddd Do MMMM YYYY"));
  }

  useEffect(() => {
    // Trying Redux
    dispatch(fetchWeather());
    i18n.changeLanguage(locale); // Set the language to Arabic
    setDateAndTime(moment().format("dddd MMMM YYYY"));
  }, []);

  return (
    <Container maxWidth="md">
      {/* Content Container */}
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* CARD */}
        <div
          dir={locale === "ar" ? "rtl" : "ltr"}
          style={{
            width: "100%",
            padding: "20px",
            backgroundColor: "rgb(28 52 91 / 36%)",
            color: "white",
            borderRadius: "15px",
            boxShadow: "0 11px 1px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Content */}
          <div style={{}}>
            {/* City & Time */}
            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "end",
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                style={{ marginRight: "20px", fontWeight: "500" }}
              >
                {t("6 October City")}
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                style={{ marginRight: "20px" }}
              >
                {dateAndTime}
              </Typography>
            </div>
            {/* ===City & Time=== */}
            <hr />
            {/* Container For Degree + Cloud Icon */}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {/* Degree & Description */}
              <div className="">
                {/* TEMP */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isLoading ? (
                    <CircularProgress style={{ color: "white" }} />
                  ) : (
                    ""
                  )}

                  <Typography
                    variant="h1"
                    component="h1"
                    style={{ textAlign: "right" }}
                  >
                    {temp.number}°
                  </Typography>
                  <img src={temp.icon} alt="sky" />
                </div>
                {/* ===TEMP=== */}
                <Typography variant="h6" component="h1">
                  {t(temp.description)}
                </Typography>
                {/* MIN & MAX */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h5>
                    {t("Min")} : {temp.min}
                  </h5>
                  <h5 style={{ margin: "0px 5px" }}>|</h5>
                  <h5>
                    {t("Max")} : {temp.max}
                  </h5>
                </div>
              </div>
              {/* ===Degree & Description=== */}
              <CloudIcon style={{ fontSize: "200px", color: "white" }} />
            </div>
          </div>
          {/* ===Content=== */}
        </div>
        {/* ===CARD=== */}
        {/* Translation Button */}
        <div
          dir={locale === "ar" ? "rtl" : "ltr"}
          style={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <Button
            variant="text"
            style={{ color: "white" }}
            onClick={handleLanguageChange}
          >
            {locale === "en" ? t("Arabic") : t("انجليزي")}
          </Button>
        </div>
        {/* ===Translation Button=== */}
      </div>
      {/* ===Content Container=== */}
    </Container>
  );
}
