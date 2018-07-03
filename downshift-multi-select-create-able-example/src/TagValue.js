import React from "react";
import AutosizeInput from "react-input-autosize";

import "./MultiDownshift.css";

class TagValue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      value: props.tag.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tag !== this.props.tag) {
      this.setState({ value: nextProps.tag.value });
    }
  }

  onDoubleClick = () => {
    this.setState({ editing: true });
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onRemove = e => {
    const { onRemove, tag } = this.props;
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) {
      onRemove({ ...tag, value: this.state.value });
    }
  };

  inputRef = c => {
    this._input = c;
  };

  render() {
    const { value, editing } = this.state;

    const inputProps = {
      type: "text",
      value,
      ref: this.inputRef,
      inputClassName: "inputBoxCss",
      onChange: this.onChange
    };

    return editing ? (
      <AutosizeInput {...inputProps} />
    ) : (
      <div className="mmmmm" onDoubleClick={this.onDoubleClick}>
        {value}{" "}
        <span className="hhhhhhhhhhhhhhhhh" onClick={this.onRemove}>
          x
        </span>
      </div>
    );
  }
}

export default TagValue;
