import { useState } from 'react';

import { Button, TextField } from '@mui/material';
import { Tooltip } from 'react-tooltip'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/ru";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';


export default function Rank() {
    const [rank, setRank] = useState([{ text: '', year: '' }]);

    const add = () => {
        setRank(rank => [...rank, { text: '', year: '' }]);
    }

    const remove = (index) => {
        setRank(rank => rank.filter((_, i) => index !== i));
    }

    const update = (index, value, name) => {
        setRank(rank => rank.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }

    const getYear = (year) => {
        return year?.$y;
    }

    return (
        <>
            {
                rank.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <p>
                                Звания
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
                                label={'Звание'}
                                value={item.text}
                                onChange={(e) => update(index, e.target.value, 'text')}
                            />

                            <div className="date">
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                    <DatePicker
                                        label={'Год с'}
                                        views={['year']}
                                        onChange={newValue => update(index, getYear(newValue), 'year')}
                                        defaultValue={item.year ? dayjs(item.year) : null}
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
