import * as React from "react";

import { css } from "emotion";
import { components } from "react-select";
import { ControlProps } from "react-select/lib/components/Control";
import { Option } from "react-select/lib/filters";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomIndicatorSeparator from "./CustomIndicatorSeparator";

class CustomControl extends React.Component<ControlProps<Option>> {
  constructor(props: ControlProps<Option>) {
    super(props);
    this.disabled = this.disabled.bind(this);
  }
  public render() {
    const { cx, getStyles, className } = this.props;
    return (
      <components.Control {...this.props}>
        {this.props.children}
        {!this.disabled() && <CustomIndicatorSeparator />}
        {!this.disabled() && (
          <div
            className={cx(
              css(getStyles("dropdownIndicator", this.props)),
              {
                "dropdown-indicator": true,
                indicator: true
              },
              className
            )}
            onMouseDown={this.onMouseDown}
            onTouchEnd={this.onTouchEnd}
          >
            <FontAwesomeIcon icon="file-archive" />
          </div>
        )}
      </components.Control>
    );
  }

  private onMouseDown(event: React.MouseEvent) {
    // tslint:disable-next-line:no-console
    console.log("clicked!");
    event.preventDefault();
    event.stopPropagation();
  }

  private onTouchEnd(event: React.TouchEvent) {
    // tslint:disable-next-line:no-console
    console.log("touched!");
    event.preventDefault();
    event.stopPropagation();
  }

  private disabled() {
    return (this.props.selectProps.value || []).length === 0;
  }
}

export default CustomControl;
