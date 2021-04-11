import React from "react";
import ReactDOM from "react-dom";
import Router from "./Router";
import * as bootstrap from 'bootstrap';
import './styles/global.scss';

const mountNode = document.getElementById("app");
ReactDOM.render(<Router />, mountNode);