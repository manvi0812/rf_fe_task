import React from "react";
import { IMaskInput } from "react-imask";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="#HHHHHH"
      definitions={{
        H: /[0-9a-fA-F]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
      placeholder="#FFFFFF"
    />
  );
});

// TextMaskCustom.propTypes = {
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };
export default TextMaskCustom;
