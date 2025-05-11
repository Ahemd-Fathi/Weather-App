import { configureStore } from "@reduxjs/toolkit";
import weatherApiSliceReduser from "./weatherApiSlice";

export default configureStore({
  reducer: { weather: weatherApiSliceReduser },
});
