import React from "react";
import { render } from "react-dom";
import { Div } from "glamorous";
import matchSorter from "match-sorter";
import starWarsNames from "starwars-names";
import MultiDownshift from "./MultiDownshift";

class App extends React.Component {
  allItems = starWarsNames.all;
  state = { items: this.allItems, selectedItems: [] };
  handleStateChange = (changes, downshiftState) => {
    if (changes.hasOwnProperty("inputValue")) {
      this.setState({ items: this.getItems(changes.inputValue) });
    }
    // handle stuff here if you need to
    // this is especially useful if you need
    // to controll some of the internal state yourself
  };

  handleChange = (selectedItem, downshiftState) => {
    this.setState({ items: this.allItems });
  };

  getItems = value => {
    return value ? matchSorter(this.allItems, value) : this.allItems;
  };

  onItemAdd = selectedItem => {
    this.setState({
      selectedItems: [...this.state.selectedItems, selectedItem]
    });
  };

  onRemoveItem = item => {
    const copy = [...this.state.selectedItems];
    copy.splice(item.index, 1);
    this.setState({ selectedItems: copy });
  };

  onItemChanged = item => {
    const copy = [...this.state.selectedItems];
    copy.splice(item.index, 1, item.value);
    this.setState({ selectedItems: copy });
  };

  itemToString(i) {
    return i ? i.name : "";
  }

  render() {
    return (
      <Div
        css={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center"
        }}
      >
        <h2>Multi select creatable example</h2>
        <MultiDownshift
          selectedItem={this.state.selectedItems}
          onChangedState={this.handleStateChange}
          onChange={this.onItemAdd}
          onItemChanged={this.onItemChanged}
          onRemoveItem={this.onRemoveItem}
          items={this.state.items}
          itemToString={this.itemToString}
        />
      </Div>
    );
  }
}

render(<App />, document.getElementById("root"));
