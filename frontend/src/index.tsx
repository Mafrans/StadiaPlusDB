import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router";
import './styles/root.css';
import './styles/global.css';
import '@fontsource/overpass/200.css'
import '@fontsource/overpass/300.css'
import '@fontsource/overpass/400.css'
import '@fontsource/overpass/600.css'
import '@fontsource/overpass/700.css'

const mountNode = document.getElementById("app");
ReactDOM.render(<Router />, mountNode);