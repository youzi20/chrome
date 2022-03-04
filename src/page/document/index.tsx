import React from "react";
import { render } from "react-dom";

import Content from "./Content";

import "../global.scss";

const App = () => {

    return (
        <React.StrictMode>
            <Content />
        </React.StrictMode>
    );
};

render(<App />, document.querySelector("#root"));
