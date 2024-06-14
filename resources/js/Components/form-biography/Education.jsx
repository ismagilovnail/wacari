import { useState } from "react"
import { Tooltip } from 'react-tooltip'

import {Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import dayjs from "dayjs";

export default function Education() {
    const [education, setEducation] = useState([{ text: '', yearS: '', yearT: '' }]);

    const add = () => {
        setEducation(education => [...education, { text: '', yearS: '', yearT: '' }]);
    }

    const remove = (index) => {
        setEducation(education => education.filter((_, i) => index !== i));
    }

    const update = (index, value, name) => {
        setEducation(education => education.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }

    const getYear = (year) => {
        return year?.$y;
    }

    return (
        <>
            {
                education.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <p>
                                Образование
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
                                label={'Образование'}
                                value={item.text}
                                onChange={e => update(index, e.target.value, 'text')}
                            />

                            <div className="date">
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                    <DatePicker
                                        label={'Год с'}
                                        views={['year']}
                                        onChange={newValue => update(index, getYear(newValue), 'yearS')}
                                        defaultValue={item.yearS ? dayjs(item.yearS) : null}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                    <DatePicker
                                        label={'Год до'}
                                        views={['year']}
                                        onChange={newValue => update(index, getYear(newValue), 'yearT')}
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
