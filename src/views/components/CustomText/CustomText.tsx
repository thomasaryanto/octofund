import React from "react";
import "./CustomText.css";

type TextFieldProps = {
  focused?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: any;
  value?: any;
  type?: string;
};

class TextField extends React.Component<TextFieldProps> {
  render() {
    return (
      <input
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
        type={this.props.type || "text"}
        className={`custom-text-input ${this.props.className}`}
      />
    );
  }
}

export default TextField;
