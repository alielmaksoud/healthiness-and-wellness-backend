/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import NavbarHome from "../Header/NavbarHome/NavbarHome";
import Video from "./Video";
import Overlay from "./Overlay";
import Info from "./Info";

const Main = () => (
  <section css={styles} className="main" id="home">
    {/* <Overlay /> */}
   {/*  <NavbarHome /> */}
    <Info />
    <Video />
  </section>
);

const styles = css`
  width: 100%;
  height: 100vh;
`;

export default Main;
