import * as React from "react";

import { components } from "react-select";
import { IndicatorContainerProps } from "react-select/lib/components/containers";
import { Option } from "react-select/lib/filters";

class CustomIndicatorsContainer extends React.Component<
  IndicatorContainerProps<Option>
> {
  public render() {
    return (
      <div style={{ background: "green" }}>
        <components.IndicatorsContainer {...this.props} />
        <button
          type="button"
          className="btn btn-outline-lite"
          // onClick={this.save}
          // disabled={props.selectOption.length === 0}
        >
          Save
        </button>
      </div>
    );
  }
}

export default CustomIndicatorsContainer;
