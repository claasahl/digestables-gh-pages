import * as React from "react";

import Downshift from "downshift";

class MultiDownshift extends React.Component {
  public render() {
    const items = [
      { value: "apple" },
      { value: "pear" },
      { value: "orange" },
      { value: "grape" },
      { value: "banana" }
    ];
    return (
      <Downshift onChange={this.onChange} itemToString={this.itemToString}>
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
                    .filter(
                      item => !inputValue || item.value.includes(inputValue)
                    )
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          index,
                          item,
                          key: item.value,
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
                        {item.value}
                      </li>
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
    );
  }

  private onChange = (selection: any) =>
    alert(`You selected ${selection.value}`);
  private itemToString = (item: any) => (item ? item.value : "");
}

export default MultiDownshift;
