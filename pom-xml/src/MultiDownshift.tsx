import * as React from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Downshift from "downshift";
import matchSorter from "match-sorter";
import * as starwarsNames from "starwars-names";

interface IProps {
  openMenuIcon: IconProp;
  closeMenuIcon: IconProp;
}

class MultiDownshift extends React.Component<IProps> {
  public render() {
    return (
      <Downshift onChange={this.onChange}>
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          getToggleButtonProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div>
            <label {...getLabelProps()}>Enter a fruit</label>
            <input {...getInputProps()} />
            <button {...getToggleButtonProps()}>
              <FontAwesomeIcon
                icon={
                  isOpen ? this.props.closeMenuIcon : this.props.openMenuIcon
                }
              />{" "}
            </button>
            <ul {...getMenuProps()}>
              {isOpen
                ? this.items(inputValue).map((item, index) => (
                    <li
                      {...getItemProps({
                        index,
                        item,
                        key: item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
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

  private items = (value: string | null) => {
    const names = starwarsNames.all;
    return value ? matchSorter(names, value) : names;
  };
}

export default MultiDownshift;
