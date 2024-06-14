import {useState} from "react";
import "./navigation.scss";
import {Link} from "@inertiajs/react";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function NavigationList({data}) {
    const hasSubcategories = data && data.length > 0;
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        if (hasSubcategories) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <>
            <button className={'navigation-btn'} type={'button'} onClick={handleToggle}>
                <ArrowDropUpIcon className={(isOpen ? ' icon-rotate' : '')}/>
            </button>

            {hasSubcategories && (
                <ul className={(isOpen ? ' open' : '')}>
                    {
                        data.map(country => (
                            <li key={country.id}>
                                <Link href={country.slug}>{country.name}</Link>
                            </li>
                        ))
                    }
                </ul>
            )}
        </>
    )
}
