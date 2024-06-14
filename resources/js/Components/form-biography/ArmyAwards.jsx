import { useState } from 'react';

import { Button, TextField } from '@mui/material';
import { Tooltip } from 'react-tooltip'

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

export default function ArmyAwards() {
    const [awards, setAwards] = useState([{ text: '' }]);

    const add = () => {
        setArmy(awards => [...setAwards, { text: '' }]);
    }

    const remove = (index) => {
        setArmy(awards => setAwards.filter((_, i) => index !== i));
    }

    const update = (index, value, name) => {
        setArmy(awards => setAwards.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }

    return (
        <>
            {
                awards.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <p>
                                Награды и премии
                            </p>
                            <div>
                                <a className="my-anchor-element" ><HelpOutlineRoundedIcon /></a>
                                <Tooltip anchorSelect=".my-anchor-element">
                                    :(
                                </Tooltip>
                                {index === 0 ? (
                                    <Button onClick={add}>
                                        <AddIcon />
                                    </Button>
                                ) : (
                                    <Button onClick={() => remove(index)}>
                                        <RemoveIcon />
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="biography__input">
                            <TextField
                                label={'Награды и премии'}
                                value={item.text}
                                onChange={(e) => update(index, e.target.value, 'text')}
                            />
                        </div>
                    </li>
                ))
            }
        </>
    )
}
