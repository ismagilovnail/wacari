import { Link } from "@inertiajs/react";
import "./header.scss";

export default function AdminHeader() {
    return (
        <header className="admin-header">
            <Link href={route('home')}>
                Вернуться на сайт
            </Link>
        </header>
    );
}