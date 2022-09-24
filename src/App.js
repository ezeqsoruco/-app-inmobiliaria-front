import "./App.css";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Info from "./components/Info/Info";

import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";

function App() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  function onClickHome() {
    navigate("/Home");
  }

  function onClickInfo() {
    navigate("/Info");
  }

  return (
    <div className="App">
      <div>
        <Box sx={{ width: 500 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Home"
              icon={<HomeIcon />}
              onClick={onClickHome}
            />
            <BottomNavigationAction
              label="Info"
              icon={<InfoIcon />}
              onClick={onClickInfo}
            />
          </BottomNavigation>
        </Box>
      </div>
      <div>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Info" element={<Info />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
