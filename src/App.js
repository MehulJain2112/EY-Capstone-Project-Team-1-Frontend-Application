import logo from "./logo.svg";
//import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./layout/NavBar";
import "./styles.css";
import Home from "./pages/Home";
import { Employee1 } from "./Charts/EmpPieChart/Employee1";
import { TabView } from "./layout/TabView";
import OrganizationEvent from "./pages/OrganizatonEvents";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AttendenceCalendar from "./Components/AttendenceCalendar";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="nav"style={{width:800,height: 800, marginTop: "5px" }}>
          {/* <NavBar> */}
            <body>
              <Routes>
                <Route
                  path="/"
                  element={<Home />}
                />
                <Route
                  path="/AttendenceCalendar"
                  element={<AttendenceCalendar />}
                />
              </Routes>
            </body>
          {/* </NavBar> */}
        </div>
      </Router>
      {/* <div className="right-half-box">
        <TabView />
      </div>
      <div className="top-left-box">
        <Home />
      </div>
      <div className="bottom-left-box">
        <OrganizationEvent />
      </div> */}
    </div>
  );
}

export default App;
