import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo2 from "../../../assets/logo.png";
import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import { createSelector } from "reselect";

const selectWatchLaterMovies = createSelector(
  (state) => state.wlMovies.movies,
  (movies) => Object.values(movies)
);

const selectWatchLaterSeries = createSelector(
  (state) => state.wlSeries.series,
  (series) => Object.values(series)
);

function NavigationBar() {
  const wlmovies = useSelector(selectWatchLaterMovies);
  const wlseries = useSelector(selectWatchLaterSeries);
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <img
              src={logo2}
              alt="Site Logo"
              width="100"
              height="100"
              className="d-inline-block align-top"
              data-tooltip-id={"logo-tooltip"}
            />
            <Tooltip
              id={"logo-tooltip"}
              place="right"
              content="Go to main page"
              variant="light"
            />
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <span className="navbar-title">kMDB</span>
          <Nav className="ms-auto">
            <Link
              to="/movies"
              data-tooltip-id={"search-movie-tooltip"}
              className="nav-link"
            >
              Movies
            </Link>
            <Tooltip
              id={"search-movie-tooltip"}
              place="bottom"
              content="Search movie"
              variant="warning"
            />
            <Link
              to="/series"
              data-tooltip-id={"search-serie-tooltip"}
              className="nav-link"
            >
              Series
            </Link>
            <Tooltip
              id={"search-serie-tooltip"}
              place="bottom"
              content="Search serie"
              variant="warning"
            />
            {(wlmovies?.length > 0 || wlseries?.length > 0) && (
              <>
                <NavDropdown
                  title="Watch Later"
                  data-tooltip-id={"watchlater-tooltip"}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.ItemText
                    style={{ color: "#ffd700", fontWeight: "bold" }}
                  >
                    Movies
                  </NavDropdown.ItemText>
                  {wlmovies?.length > 0 ? (
                    <>
                      {wlmovies.slice(0, 5).map((item) => (
                        <NavDropdown.Item
                          style={{
                            fontSize: "14px",
                            color: "black",
                          }}
                          key={item.id}
                          disabled
                        >
                          {item.title.length > 24
                            ? `${item.title.slice(0, 21)}...`
                            : item.title}
                        </NavDropdown.Item>
                      ))}
                      {wlmovies?.length > 5 && (
                        <NavDropdown.Item
                          style={{
                            fontSize: "14px",
                            color: "gray",
                          }}
                          disabled
                        >
                          ...
                        </NavDropdown.Item>
                      )}
                    </>
                  ) : (
                    <NavDropdown.Item
                      style={{ fontSize: "14px", color: "gray" }}
                      disabled
                    >
                      No movies in Watch Later
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Divider />
                  <NavDropdown.ItemText
                    style={{ color: "#ffd700", fontWeight: "bold" }}
                  >
                    Series
                  </NavDropdown.ItemText>
                  {wlseries?.length > 0 ? (
                    <>
                      {wlseries.slice(0, 5).map((item) => (
                        <NavDropdown.Item
                          style={{ fontSize: "14px", color: "black" }}
                          key={item.id}
                          disabled
                        >
                          {item.name.length > 24
                            ? `${item.name.slice(0, 21)}...`
                            : item.name}
                        </NavDropdown.Item>
                      ))}
                      {wlseries?.length > 5 && (
                        <NavDropdown.Item
                          style={{ fontSize: "14px", color: "gray" }}
                          disabled
                        >
                          ...
                        </NavDropdown.Item>
                      )}
                    </>
                  ) : (
                    <NavDropdown.Item
                      style={{ fontSize: "14px", color: "gray" }}
                      disabled
                    >
                      No series in Watch Later
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Divider />
                  <Link
                    style={{ fontSize: "14px", color: "#ff5733" }}
                    to="/watchlater"
                    className="nav-link"
                  >
                    View full list...
                  </Link>
                </NavDropdown>
                <Tooltip
                  id={"watchlater-tooltip"}
                  place="bottom"
                  content="Open Watch later list"
                  variant="warning"
                />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
