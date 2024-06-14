import AdminLayout from "@/Layouts/AdminLayout";
import "./css/admin.scss";
import {
    Button,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Box,
    TextField, FormControl, Select, MenuItem
} from "@mui/material";
import axios from "axios";
import Swal from 'sweetalert2';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";

const style = {
    display: 'flex',
    gap: '5px',
    alignItems: 'center'
}

const box = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginTop: '10px'
}

export default function AdminCountry({ continents, countries }) {
    const [data, setData] = useState(countries);
    const [errors, setErrors] = useState({});
    const [select, setSelect] = useState('');
    const [name, setName] = useState('');
    const [latitude, setLatitube] = useState('');
    const [longitude, setLongitube] = useState('');
    const [id, setId] = useState('');
    const [index, setIndex] = useState('');
    const add = (id, continent, name, latitude, longitude) => {
        setData(data => [...data, { id: id, continent: {name: continent}, name: name, latitude: latitude, longitude: longitude }]);
    }

    const remove = (index) => {
        setData(data => data.filter((_, i) => index !== i));
    }

    const update = (index, id,  name, latitude, longitude) => {
        setData(data => data.map((q, i) => (i === index ? { ...q, id: id, name: name, latitude: latitude, longitude: longitude } : q)));
    }


    const onAdd = () => {
        axios.post(route('country.store'), {
            continent_id: select,
            name: name,
            latitude: Number(latitude),
            longitude: Number(longitude)
        }).then(result => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: result.data.result,
                showConfirmButton: false,
                timer: 1500
            });
            add(result.data.id, result.data.continent, name, latitude, longitude);
            onClear();

        }).catch(error => setErrors(error.response.data.errors))
    }

    const onUpdate = () => {
        Swal.fire({
            title: "Обновите страну?",
            icon: "info",
            showCancelButton: true,
            cancelButtonText: "Отмена",
            confirmButtonText: "Обновить",
        }).then(result => {
            if (result.isConfirmed) {
                axios.patch(route('country.update'), {
                    id: id,
                    continent_id: select,
                    name: name,
                    latitude: Number(latitude),
                    longitude: Number(longitude)
                }).then(result => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: result.data.result,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    onClear();
                    update(index, id , name, latitude, longitude, longitude);
                }).catch(error => {
                    const { message } = error.response.data;
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: message,
                        showConfirmButton: false,
                        timer: 4000
                    });
                })
            }
        });
    }

    const onDestroy = (id, index) => {
        Swal.fire({
            title: "Вы уверены что хотите удалить?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Отмена",
            confirmButtonText: "Уверен"
        }).then(result => {
            if (result.isConfirmed) {
                axios.post(route('country.destroy'), {
                    id: id,
                }).then(result => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: result.data.result,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    remove(index)
                }).catch(error => {
                    const { message } = error.response.data;
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: message,
                        showConfirmButton: false,
                        timer: 4000
                    });
                })
            }
        });
    }

    const onUpdateForm = (id, index) => {
        setSelect(data[index].continent_id);
        setName(data[index].name);
        setLatitube(data[index].latitude);
        setLongitube(data[index].latitude);
        setId(id);
        setIndex(index);
    }

    const onClear = () => {
        setSelect('');
        setName('');
        setLatitube('');
        setLongitube('');
        setId('');
    }

    return (
        <AdminLayout>
            <>
                <Typography variant={'h3'} >Добивать страну</Typography>
                <Box style={box}>
                    <FormControl sx={{width: '300px'}}>
                        <InputLabel id='country'>Континент</InputLabel>
                        <Select
                            labelId='country'
                            label={'Континент'}
                            value={select}
                            onChange={e => setSelect(e.target.value)}
                        >
                            {
                                continents.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        error={Boolean(errors.name)}
                        label={'Название страны'}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        helperText={errors.name}
                    />
                    <TextField
                        error={Boolean(errors.latitude)}
                        label={'Ширина'}
                        value={latitude}
                        onChange={e => setLatitube(e.target.value)}
                        helperText={errors.latitude}
                    />
                    <TextField
                        error={Boolean(errors.longitude)}
                        label={'Долгота'}
                        value={longitude}
                        onChange={e => setLongitube(e.target.value)}
                        helperText={errors.longitude}
                    />
                    <Button sx={{ margin: '20px 0 20px 0' }} onClick={onAdd} variant="contained" color="success">
                        Добавить страну
                    </Button>

                    <Button sx={{ margin: '20px 0 20px 0' }} onClick={onUpdate} variant="contained" color="success">
                        Обновить страну
                    </Button>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    №
                                </TableCell>
                                <TableCell>
                                    Континент
                                </TableCell>
                                <TableCell>
                                    Название страны
                                </TableCell>
                                <TableCell>
                                   Ширина
                                </TableCell>
                                <TableCell>
                                    Долгота
                                </TableCell>
                                <TableCell>
                                    Действие
                                </TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {
                                data.map((country, index) => (
                                    <TableRow key={country.id}>
                                        <TableCell component="th" >
                                            {index + 1}
                                        </TableCell>
                                        <TableCell component="th">
                                            {country.continent.name}
                                        </TableCell>
                                        <TableCell component="th">
                                            {country.name}
                                        </TableCell>
                                        <TableCell component="th">
                                            {country.latitude}
                                        </TableCell>
                                        <TableCell component="th">
                                            {country.longitude}
                                        </TableCell>
                                        <TableCell component="th">
                                            <Box sx={style}>
                                                <Button onClick={() => onUpdateForm(country.id, index)} variant="contained" color="success">
                                                    <EditIcon />
                                                </Button>
                                                <Button onClick={() => onDestroy(country.id, index)} variant="outlined" color="error">
                                                    <DeleteIcon />
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </>
        </AdminLayout>
    )
}
