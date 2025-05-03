import * as React from "react";

// MUI components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

// External Libraries
import axios from "axios";
import moment from "moment/moment";
import "moment/locale/ar"; // Import Arabic locale for moment.js
import { useTranslation } from "react-i18next";

let cancelAxios = null;
moment.locale("ar"); // Set the locale to Arabic
export default function WeatherCard() {
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("");
  console.log(dateAndTime);
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });
  useEffect(() => {
    setDateAndTime(moment().format("dddd MMMM YYYY"));
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=29.95&lon=30.92&appid=bbae0717c6284f4d378abe132d7a77f2",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 272.15);
        const min = Math.round(response.data.main.temp_min - 272.15);
        const max = Math.round(response.data.main.temp_max - 272.15);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;

        setTemp({
          number: responseTemp,
          description: description,
          min: min,
          max: max,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
        console.log(response.data);
        console.log(min, max, description);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    return () => {
      cancelAxios();
    };
  }, []);

  return (
    <Container maxWidth="sm">
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
          dir="rtl"
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
                style={{ marginRight: "20px", fontWeight: "600" }}
              >
                الجيزة
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
                  {temp.description}
                </Typography>
                {/* MIN & MAX */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h5>الصغرى : {temp.min}</h5>
                  <h5 style={{ margin: "0px 5px" }}>|</h5>
                  <h5>الكبرى : {temp.max}</h5>
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
          dir="rtl"
          style={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <Button variant="text" style={{ color: "white" }}>
            انجليزى
          </Button>
        </div>
        {/* ===Translation Button=== */}
      </div>
      {/* ===Content Container=== */}
    </Container>
  );
}
