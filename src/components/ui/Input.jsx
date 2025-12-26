const Input = ({
  id = "",
  type = "text",
  placeholder = "",
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`input rounded-lg ${className}`}
        disabled={disabled}
        {...props}
      />
    </>
  );
};

export default Input;
