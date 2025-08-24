import styles from "./Input.module.scss";
import React from "react";

type InputProps = {
  name: string;
  placeholder?: string;
  value: string;
  error: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  value,
  error,
  onChange = () => {},
  onBlur = () => {},
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        name={name}
        type="text"
        className={styles.inputField}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className={styles.inputError}>{error && <span>{error}</span>}</div>
    </div>
  );
};

export default Input;
