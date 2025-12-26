import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ShowPasswordButton = ({ show, setShow }) => {
  return (
    <>
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
      >
        {show ? (
          <AiOutlineEyeInvisible className="text-xl" />
        ) : (
          <AiOutlineEye className="text-xl" />
        )}
      </button>
    </>
  );
};

export default ShowPasswordButton;
