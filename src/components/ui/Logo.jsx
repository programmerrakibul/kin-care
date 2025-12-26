import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href={"/"}>
        <h1 className="text-2xl font-bold text-primary">KinCare</h1>
      </Link>
    </>
  );
};

export default Logo;
