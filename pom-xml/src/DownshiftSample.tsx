import Downshift from "downshift";
import * as React from "react";

interface IFruit {
  value: string;
}
const items = [
  { value: "apple" },
  { value: "pear" },
  { value: "orange" },
  { value: "grape" },
  { value: "banana" }
];

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
            <label {...getLabelProps()}>Enter a fruit</label>
            <input {...getInputProps()} />
            {isOpen ? (
              <div>
                {items
                  .filter(
                    item => !inputValue || item.value.includes(inputValue)
                  )
                  .map((item, index) => (
                    <div
                      {...getItemProps({
                        index,
                        item,
                        key: item.value,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal"
                        }
                      })}
                    >
                      {item.value}
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }

  private onChange(selection: IFruit) {
    alert(`You selected ${selection.value}`);
  }

  private itemToString(selection: IFruit): string {
    return selection ? selection.value : "";
  }
}

export default DownshiftSample;
