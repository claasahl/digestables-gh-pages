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
      <div style={{ background: "pink" }}>
        <components.IndicatorsContainer {...this.props}>
          <button
            className="btn"
            type="submit"
            onClick={this.onClick}
            disabled={this.disabled()}
          >
            <FontAwesomeIcon icon="file-archive" />
          </button>
          {this.props.children}
        </components.IndicatorsContainer>
      </div>
    );
  }
  private onClick() {
    // tslint:disable-next-line:no-console
    console.log("clicked!");
  }

  private disabled() {
    return (this.props.selectProps.value || []).length === 0;
  }
}

export default CustomIndicatorsContainer;
