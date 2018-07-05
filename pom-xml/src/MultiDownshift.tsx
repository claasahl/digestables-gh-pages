import * as React from "react";

import Downshift from "downshift";
import * as starwarsNames from "starwars-names";

class MultiDownshift extends React.Component {
  public render() {
    const items = starwarsNames.all;
    return (
      <Downshift onChange={this.onChange}>
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div>
            <label {...getLabelProps()}>Enter a fruit</label>
            <input {...getInputProps()} />
            <ul {...getMenuProps()}>
              {isOpen
                ? items
                    .filter(item => !inputValue || item.includes(inputValue))
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          index,
                          item,
                          key: item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index
                                ? "lightgray"
                                : "white",
                            fontWeight:
                              selectedItem === item ? "bold" : "normal"
                          }
                        })}
                      >
                        {item}
                      </li>
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    );
  }

  private onChange = (selection: any) => alert(`You selected ${selection}`);
}

export default MultiDownshift;
