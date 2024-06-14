import { useState } from "react"
import { Tooltip } from 'react-tooltip'

import { Button, FormControl, Select, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import dayjs from "dayjs";

export default function Residence() {
    const [residence, setResidence] = useState([{ continent: '', country: '', city: '' }]);

    const add = () => {
        setResidence(residence => [...residence, { text: '', yearS: '', yearT: '' }]);
    }

    const remove = (index) => {
        setResidence(residence => residence.filter((_, i) => index !== i));
    }

    const update = (index, value, name) => {
        setResidence(residence => residence.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }

    const getYear = (year) => {
        return year?.$y;
    }

    return (
        <>
            {
                residence.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <p>
                                Место жительство
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
                                <InputLabel > Выбрать континент</InputLabel>
                                <Select
                                >
                                    <MenuItem>Первый</MenuItem>
                                    <MenuItem>Второй</MenuItem>
                                    <MenuItem>Третий</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel > Выбрать страну</InputLabel>
                                <Select
                                >
                                    <MenuItem>Первый</MenuItem>
                                    <MenuItem>Второй</MenuItem>
                                    <MenuItem>Третий</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <InputLabel> Выбрать город</InputLabel>
                                <Select
                                >
                                    <MenuItem>Первый</MenuItem>
                                    <MenuItem>Второй</MenuItem>
                                    <MenuItem>Третий</MenuItem>
                                </Select>
                            </FormControl>

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
