import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import "./App.css";

import RecipeComposer from "./RecipeComposer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Test from "./Test";

library.add(fas);

class App extends React.Component {
  public render() {
    return (
      <div className="container grid-wrapper">
        <RecipeComposer />
        <Test />
      </div>
    );
  }
}

export default App;
