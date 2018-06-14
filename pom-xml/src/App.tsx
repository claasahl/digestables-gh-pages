import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import "./App.css";

import DownshiftSample from "./DownshiftSample";
import { mergeAsync } from "./ingredients/IngredientsMerger";
import RecipeComposer from "./RecipeComposer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      sample: ""
    };
  }

  public componentWillMount() {
    const sample = mergeAsync();
    sample.then(result => {
      this.setState((state: any) => ({
        sample: result
      }));
    });
  }
  public render() {
    return (
      <div className="container grid-wrapper">
        <DownshiftSample />
        <RecipeComposer />
        {JSON.stringify(this.state.sample)}
      </div>
    );
  }
}

export default App;
