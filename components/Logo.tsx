import Image from "next/image";
import Link from "next/link";

const Logo = (props: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div className="logo" {...props}>
      <Link href="/">
        <Image src="/images/logo.jpeg" width={85} height={30} alt="logo" />
      </Link>
    </div>
  );
};

export default Logo;
