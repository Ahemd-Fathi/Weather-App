import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  "weatherApi/fetchWeather",
  async () => {
    console.log("Calling Fetch Weather");

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=29.95&lon=30.92&appid=bbae0717c6284f4d378abe132d7a77f2"
      // {
      //   cancelToken: new axios.CancelToken((c) => {
      //     cancelAxios = c;
      //   }),
      // }
    );

    // handle success
    const responseTemp = Math.round(response.data.main.temp - 272.15);
    const min = Math.round(response.data.main.temp_min - 272.15);
    const max = Math.round(response.data.main.temp_max - 272.15);
    const description = response.data.weather[0].description;
    const responseIcon = response.data.weather[0].icon;

    console.log(response);

    // setTemp({
    //   number: responseTemp,
    //   description: description,
    //   min: min,
    //   max: max,
    //   icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
    // });
    return {
      number: responseTemp,
      min,
      max,
      description,
      icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
    };
  }
);

const weatherApiSlice = createSlice({
  name: "weather",
  initialState: {
    result: "empty",
    weather: {},
    isLoading: false,
  },
  reducers: {
    changeResult: (state, action) => {
      state.result = "changed";
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = true;
      });
  },
});

export const { changeResult } = weatherApiSlice.actions;
export default weatherApiSlice.reducer;
