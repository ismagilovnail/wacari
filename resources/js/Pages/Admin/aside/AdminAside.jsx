import { Link } from "@inertiajs/react";
import "./aside.scss";

import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import WebIcon from '@mui/icons-material/Web';
import HandshakeIcon from '@mui/icons-material/Handshake';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ChurchIcon from '@mui/icons-material/Church';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import InfoIcon from '@mui/icons-material/Info';
import GavelIcon from '@mui/icons-material/Gavel';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import PublicIcon from '@mui/icons-material/Public';
export default function AdminAside() {
    return (
        <aside className="admin-aside">
            <ul>
                <li>
                    <Link>
                        <SpaceDashboardIcon/>
                        Панель управления
                    </Link>
                </li>
                <li>
                    <Link href={route('user.index')}>
                        <PersonOutlineIcon/>
                        Пользователи
                    </Link>
                </li>
                <li>
                    <Link href={route('continents.index')}>
                        <SouthAmericaIcon/>
                        Континенты
                    </Link>
                </li>
                <li>
                    <Link href={route('country.index')}>
                        <PublicIcon/>
                        Страны
                    </Link>
                </li>
                <li>
                    <Link href={route('rule.index')}>
                        <GavelIcon/>
                        Правила
                    </Link>
                </li>
                <li>
                    <Link>
                        <InfoIcon/>
                        Обращение
                    </Link>
                </li>
                <li>
                    <Link href={route('about.index')}>
                        <InfoIcon/>
                        О нас
                    </Link>
                </li>
                <li>
                    <Link href={route('tips.index')}>
                        <TipsAndUpdatesIcon/>
                        Подсказки
                    </Link>
                </li>
                <li>
                    <Link href={route('religion.index')}>
                        <ChurchIcon/>
                        Религия
                    </Link>
                </li>
                <li>
                    <Link href={route('dashboard.video.index', 'instructions')}>
                        <IntegrationInstructionsIcon/>
                        Инструкции
                    </Link>
                </li>
                <li>
                    <Link href={route('setting.index', ['agreement'])}>
                        <HandshakeIcon/>
                        Соглашение
                    </Link>
                </li>
                <li>
                    <Link>
                        <WebIcon/>
                        Настройки SEO
                    </Link>
                </li>
                <li>
                    <Link href={route('dashboard.video.index', 'about')}>
                        <SlowMotionVideoIcon/>
                        Видео о нас
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
