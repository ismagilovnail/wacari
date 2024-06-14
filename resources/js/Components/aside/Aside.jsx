import { Link } from "@inertiajs/react";

import "./aside.scss";

import LogoDesktop from "../logo/LogoDesktop";
import Navigation from "../navigation/Navigation";


export default function Aside() {
    return (
        <aside className="aside">
            <LogoDesktop />
            <Navigation />
        </aside>
    );
}
