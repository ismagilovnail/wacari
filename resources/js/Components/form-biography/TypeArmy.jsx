import { useState } from "react";
import { Tooltip } from 'react-tooltip'

import { Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/ru";

import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import dayjs from "dayjs";

export default function TypeArmy() {
    const [army, setArmy] = useState([{ text: '', yearS: '', yearT: '' }]);

    const add = () => {
        setArmy(army => [...army, { text: '', yearS: '', yearT: '' }]);
    }

    const remove = (index) => {
        setArmy(army => army.filter((_, i) => index !== i));
    }

    const update = (index, value, name) => {
        setArmy(army => army.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }

    const getYear = (year) => {
        return year?.$y;
    }

    return (
        <>
            {
                army.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <p>
                                Род войск
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
                                label={'Сражения/войны'}
                                value={item.text}
                                onChange={(e) => update(index, e.target.value, 'text')}
                            />

                            <div className="date">
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                    <DatePicker
                                        label={'Год с'}
                                        views={['year']}
                                        onChange={newValue => update(index, getYear(newValue), 'yaerS')}
                                        defaultValue={item.yearS ? dayjs(item.yearS) : null}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                    <DatePicker
                                        label={'Год до'}
                                        views={['year']}
                                        onChange={newValue => update(index, getYear(newValue), 'yaerT')}
                                        defaultValue={item.yearT ? dayjs(item.yearT) : null}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </li>
                ))
            }
        </>
    )
}
