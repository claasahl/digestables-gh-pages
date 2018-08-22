import * as React from "react";

import { css } from "emotion";
import { components } from "react-select";
import { ControlProps } from "react-select/lib/components/Control";
import { Option } from "react-select/lib/filters";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomIndicatorSeparator from "./CustomIndicatorSeparator";

interface ICallbacks {
  onMouseDown: (event: React.MouseEvent) => void;
  onTouchEnd: (event: React.TouchEvent) => void;
  isDisabled: () => boolean;
}
export function makeControl(
  callbacks: ICallbacks
): React.ComponentType<ControlProps<Option>> {
  return (props: ControlProps<Option>) => {
    const { cx, getStyles, className } = props;
    return (
      <components.Control {...props}>
        {props.children}
        {!callbacks.isDisabled() && <CustomIndicatorSeparator />}
        {!callbacks.isDisabled() && (
          <div
            className={cx(
              css(getStyles("dropdownIndicator", props)),
              {
                "dropdown-indicator": true,
                indicator: true
              },
              className
            )}
            onMouseDown={callbacks.onMouseDown}
            onTouchEnd={callbacks.onTouchEnd}
          >
            <FontAwesomeIcon icon="file-archive" />
          </div>
        )}
      </components.Control>
    );
  };
}
