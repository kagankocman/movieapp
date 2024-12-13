import React from "react";
import Navi from "../components/navigation/NavigationBar";
import { Container } from "reactstrap";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "../components/common/src/NotFound";
import Movies from "../components/movie/Movies";
import Dashboard from "../components/dashboard/src/Dashboard";
import Series from "../components/serie/Series";
import WatchLater from "../components/watchlater/src/WatchLater";

function App() {
  return (
    <div className="app-background">
      <Container>
        <Navi />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/watchlater" element={<WatchLater />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
