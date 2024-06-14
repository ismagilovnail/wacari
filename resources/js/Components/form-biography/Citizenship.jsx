import { useState } from "react"
import { Tooltip } from 'react-tooltip'

import { Button, FormControl, Select, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';

import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Citizenship() {
    const [citizenship, setCitizenship] = useState([{ citizenship: ''}]);

    const add = () => {
        setCitizenship(citizenship => [...citizenship, { text: '', yearS: '', yearT: '' }]);
    }

    const remove = (index) => {
        setCitizenship(citizenship => citizenship.filter((_, i) => index !== i));
    }

    const update = (index, value, name) => {
        setCitizenship(citizenship => citizenship.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }

    return (
        <>
            {
                citizenship.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <p>
                                Гражданство
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
                            <FormControl>
                                <InputLabel >Гражданство</InputLabel>
                                <Select
                                >
                                    <MenuItem>Первый</MenuItem>
                                    <MenuItem>Второй</MenuItem>
                                    <MenuItem>Третий</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </li>
                ))
            }
        </>
    )
}
