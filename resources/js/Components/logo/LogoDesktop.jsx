import { Link } from "@inertiajs/react";
import logo from "@/Components/logo/logo-desktop.png"

export default function LogoDesktop() {
    return (
        <>
            <Link href={route('home')}>
                <img src={logo} alt="Логотип Wacari" />
            </Link>
        </>
    )
}
