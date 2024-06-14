import { useState } from "react"
import { Tooltip } from 'react-tooltip'

import { Button, FormControl, Select, MenuItem, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import dayjs from "dayjs";

export default function Children() {
    const [children, setChildren] = useState([{
        surname: '',
        name: '',
        patronymic: '',
        date: '',
        birth: '',
    }]);

    const add = () => {
        setChildren(children => [...children, { text: '', yearS: '', yearT: '' }]);
    }

    const remove = (index) => {
        setChildren(children => children.filter((_, i) => index !== i));
    }

    const update = (index, value, name) => {
        setChildren(children => children.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }

    const getYear = (year) => {
        return year?.$y;
    }

    const date = function (date) {
        return `${date.$y}-${zero(date.$M)}-${zero(date.$D)}`;
    }

    return (
        <>
            {
                children.map((item, index) => (
                    <li key={index}>
                        <div className="biography__name">
                            <p>
                                Дети
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
                            <div className="biography__input-wrap">
                                <TextField
                                    label={'Фамилия'}
                                    value={item.name}
                                    onChange={e => update(index, e.target.value, 'surname')}
                                />

                                <TextField
                                    label={'Имя'}
                                    value={item.surname}
                                    onChange={e => update(index, e.target.value, 'name')}
                                />

                                <TextField
                                    label={'Отчество'}
                                    value={item.patronymic}
                                    onChange={e => update(index, e.target.value, 'patronymic')}
                                />

                                <div className="date">
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                                        <DatePicker
                                            label={'Дата рождения'}
                                            onChange={newValue => update('birth', date(newValue))}
                                            defaultValue={item.birth ? dayjs(item.birth) : null}
                                        />
                                    </LocalizationProvider>
                                </div>

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
                                    <InputLabel > Выбрать континент</InputLabel>
                                    <Select


                                    >
                                        <MenuItem>Первый</MenuItem>
                                        <MenuItem>Второй</MenuItem>
                                        <MenuItem>Третий</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel> Выбрать континент</InputLabel>
                                    <Select

                                    >
                                        <MenuItem>Первый</MenuItem>
                                        <MenuItem>Второй</MenuItem>
                                        <MenuItem>Третий</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>
                        </div>
                    </li>
                ))
            }
        </>
    )
}
