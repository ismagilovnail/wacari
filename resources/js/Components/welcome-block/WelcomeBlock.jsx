import "./welcome.scss";

import { Link } from "@inertiajs/react";

export default function WelcomeBlock({ countBiography }) {
    return (
        <div className='welcome'>
            <div>
                <h1>Добро пожаловать в Вакарию.</h1>
                <p>
                    Свободный каталог биографий, каждый может создать биографию.
                </p>
            </div>
            <div>
                <p>
                    Cейчас в Вакарии {countBiography} статей на русском языке
                </p>
                <Link href={route('biography.create')}>
                    Создать биографию
                </Link>
            </div>
        </div>
    )
}
