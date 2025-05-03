import "./App.css";
import WeatherCard from "./components/WeatherCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <WeatherCard />
      </div>
    </ThemeProvider>
  );
}

export default App;
