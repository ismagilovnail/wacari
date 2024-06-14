import "./header.scss";
import Auth from '../auth/Auth';
import { usePage } from "@inertiajs/react";
import UserMenu from "../user-menu/UserMenu";

export default function CustomizedDialogs() {
    const { auth } = usePage().props;
    const navigation = auth.user ? <UserMenu /> : <Auth />;

    return (
        <>
            <header className="header">
                {navigation}
            </header>
        </>
    );
}
