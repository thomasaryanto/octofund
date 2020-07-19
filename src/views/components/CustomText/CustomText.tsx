import React from "react";
import "./CustomText.css";

type TextFieldProps = {
  focused?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: any;
  value?: any;
  type?: string;
  pattern?: string;
};

class TextField extends React.Component<TextFieldProps> {
  render() {
    return (
      <input
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
        pattern={this.props.pattern}
        type={this.props.type || "text"}
        className={`custom-text-input ${this.props.className}`}
        disabled={this.props.disabled}
      />
    );
  }
}

export default TextField;
