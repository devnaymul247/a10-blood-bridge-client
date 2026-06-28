import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <div>
                <Image src="/blood-bridge-logo.webp" alt="BloodBridge logo" width={42} height={42} className="object-contain" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                BloodBridge
            </span>
        </Link>
    );
};

export default Logo;