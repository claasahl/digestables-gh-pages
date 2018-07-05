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

interface IState {
  selectedItems: string[];
}

class MultiDownshift extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedItems: []
    };
  }

  public render() {
    return (
      <Downshift
        selectedItem={this.state.selectedItems}
        onChange={this.onItemAdd}
      >
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
        }) => {
          const tagItems = selectedItem.map((item: string, index: number) => {
            return { item, index };
          });
          return (
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
              {tagItems.map((tag: any) => <div>{JSON.stringify(tag)}</div>)}
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
          );
        }}
      </Downshift>
    );
  }

  private items = (value: string | null) => {
    const names = starwarsNames.all;
    return value ? matchSorter(names, value) : names;
  };

  private onItemAdd = (item: any) => {
    this.setState({
      selectedItems: [...this.state.selectedItems, item]
    });
  };
}

export default MultiDownshift;
