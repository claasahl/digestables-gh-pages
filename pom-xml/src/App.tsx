import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import "./App.css";

import DownshiftSample from "./DownshiftSample";
import merger from "./ingredients/IngredientsMerger";
import RecipeComposer from "./RecipeComposer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

class App extends React.Component {
  public render() {
    const sample = merger();

    return (
      <div className="container grid-wrapper">
        <DownshiftSample />
        <RecipeComposer />
        {JSON.stringify(sample)}
      </div>
    );
  }
}

export default App;
