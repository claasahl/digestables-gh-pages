import * as React from "react";

import { components } from "react-select";
import { IndicatorContainerProps } from "react-select/lib/components/containers";
import { Option } from "react-select/lib/filters";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CustomIndicatorsContainer extends React.Component<
  IndicatorContainerProps<Option>
> {
  constructor(props: IndicatorContainerProps<Option>) {
    super(props);
    this.disabled = this.disabled.bind(this);
  }
  public render() {
    return (
      <div>
        <components.IndicatorsContainer {...this.props}>
          {!this.disabled() && (
            <div onMouseDown={this.onMouseDown} onTouchEnd={this.onTouchEnd}>
              <FontAwesomeIcon icon="file-archive" />
            </div>
          )}
          {this.props.children}
        </components.IndicatorsContainer>
      </div>
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

export default CustomIndicatorsContainer;
