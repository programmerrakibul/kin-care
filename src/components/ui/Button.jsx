"use client";

const Button = ({
  children,
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn bg-linear-to-br from-primary/60 hover:from-primary/75 to-secondary/60 hover:to-secondary/75 duration-300 transition-all text-neutral rounded-lg ${className} border-none shadow-none`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
