import { Link } from "@inertiajs/react";

import footerLogo from "./footer-logo.png";
import "./footer.scss";

export default function Footer() {
    return (
        <footer className="footer">
            <img src={footerLogo} alt="Логотип Wacari" className="footer__img" />

            <nav>
                <ul>
                    <li>
                        <Link>
                            О нас
                        </Link>
                    </li>
                    <li>
                        <Link>
                            Правила и руководство
                        </Link>
                    </li>
                    <li>
                        <Link>
                            Помогите нам стать лучше
                        </Link>
                    </li>
                    <li>
                        <Link>
                            Как добавить биографию
                        </Link>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}