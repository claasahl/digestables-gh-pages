import Downshift from "downshift";
import * as React from "react";

import { Ingredient, ingredients } from "./ingredients/Ingredients";

class DownshiftSample extends React.Component {
  public render() {
    return (
      <Downshift onChange={this.onChange} itemToString={this.itemToString}>
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div>
            <label {...getLabelProps()}>Enter an ingredient</label>
            <input {...getInputProps()} />
            {isOpen ? (
              <div>
                {ingredients
                  .filter(item => !inputValue || item.name.includes(inputValue))
                  .map((item, index) => (
                    <div
                      {...getItemProps({
                        index,
                        item,
                        key: item.name,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}
                    >
                      {item.name}
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }

  private onChange(selection: Ingredient) {
    alert(`You selected ${selection.name}`);
  }

  private itemToString(selection: Ingredient): string {
    return selection ? selection.name : "";
  }
}

export default DownshiftSample;
