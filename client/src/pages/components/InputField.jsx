import React from "react";

const InputField = ({ label, type, name, value, onChange, isRequired = true,styles = {} }) => {

  const defaultStyles = {
    label: "block text-gray-700 text-sm font-bold mb-2",
    input: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  }
  const labelClass = styles.label || defaultStyles.label;
  const inputClass = styles.input || defaultStyles.input;

  return (
    <div className="mb-4">
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={inputClass}
        required={isRequired}
        styles={styles}
      />
    </div>
  )};

export default InputField;
