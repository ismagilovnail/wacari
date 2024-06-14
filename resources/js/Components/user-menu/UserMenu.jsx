import "./user-menu.scss";
import defaultAvatar from "./default-avatar.png";

import {Link, router, usePage} from "@inertiajs/react";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useState } from "react";
import { Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root ': {
        position: 'absolute',
        margin: 0,
        top: 0,
        right: 0,
    },
    '& .css-1t4vnk2-MuiDialogContent-root': {
        padding: '5rem 6.25rem 10rem 6.25rem'
    },
    '& .MuiBox-root img': {
        maxWidth: '18.75rem',
        height: '18.75rem',
        objectFit: 'cover'
    }
}));

export default function UserMenu() {
    const [open, setOpen] = useState(false);
    const avatar = usePage().props.auth.avatar;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onLogout = (e) => {
        e.preventDefault();

        router.post(route('logout'))
    }

    return (
        <nav className="user-menu">
            <ul>
                <li>
                    <Link>
                        Избранное
                    </Link>
                </li>
                <li>
                    <img src={avatar ?? defaultAvatar} alt="Аватар пользователя" />
                </li>
                <li>
                    <button onClick={handleClickOpen}>
                        <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="10" y1="9.5" x2="40" y2="9.5" stroke="black"></line>
                            <line x1="10" y1="19.5" x2="40" y2="19.5" stroke="black"></line>
                            <line x1="10" y1="29.5" x2="40" y2="29.5" stroke="black"></line>
                        </svg>
                    </button>

                    <BootstrapDialog
                        onClose={handleClose}
                        open={open}
                    >
                        <DialogContent dividers>
                            <Box>
                                <img src={avatar ?? defaultAvatar} alt="Аватар пользователя" />
                            </Box>
                            <ul className="user-menu__nav">
                                <li>
                                    <Link>
                                        Мои биографии
                                    </Link>
                                </li>
                                <li>
                                    <Link>
                                        Правила и руководства
                                    </Link>
                                </li>
                                <li>
                                    <Link>
                                        Помогите нам стать лучше
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('profile.edit')}>
                                        Настройки
                                    </Link>
                                </li>
                                <li>
                                    <form onSubmit={onLogout}>
                                        <button type="submit">Выйти</button>
                                    </form>
                                </li>
                            </ul>
                        </DialogContent>

                    </BootstrapDialog>
                </li>
            </ul>
        </nav>
    )
}
