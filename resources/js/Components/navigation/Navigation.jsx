import {useEffect, useState} from 'react';
import axios from "axios";
import NavigationList from './NavigationList';
import {Link} from '@inertiajs/react';

export default function Navigation() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('navigate')
            .then(response => {
                const {continents} = response.data;
                setCategories(continents)
            });
    }, []);

    return (
        <ul className={'navigation'}>
            {
                categories.map(item => (
                    <li key={item.id} >
                        <Link>
                            {item.name}
                        </Link>
                        <NavigationList data={item.country}/>
                    </li>
                ))
            }
        </ul>
    )
}
