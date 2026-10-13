import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image
        loading="eager"
        width={100}
        height={100}
        src={"/logo.svg"}
        alt="logo"
        className="w-7"
      />
    </div>
  );
};

export default Logo;
