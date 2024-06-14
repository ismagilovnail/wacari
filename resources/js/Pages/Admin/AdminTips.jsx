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
    TextField
} from "@mui/material";
import axios from "axios";
import Swal from 'sweetalert2';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";

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

export default function AdminTips({ name, tips }) {
    const [data, setData] = useState(tips);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const add = (id, title, description) => {
        setData(data => [...data, { id: id, title: title, description: description }]);
    }

    const remove = (index) => {
        setData(data => data.filter((_, i) => index !== i));
    }

    const update = (index, title, description) => {
        setData(data => data.map((q, i) => (i === index ? { ...q, title: title, description: description } : q)));
    }


    const onAdd = () => {
        axios.post(route('tips.store'), {
            title: title,
            description: description
        }).then(result => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: result.data.result,
                showConfirmButton: false,
                timer: 1500
            });
            add(result.data.id, title, description)
            setTitle('');
            setDescription('');

        }).catch(error => setErrors(error.response.data.errors))
    }

    const onUpdate = (id, index) => {
        Swal.fire({
            title: "Обновите подсказку",
            html: `
                <div class="sweet">
                    <input type="text" value="${data[index].title}" id="title" placeholder="Заголовок"/>
                    <textarea id="description"  placeholder="Описание">${data[index].description}</textarea>
                </div>
            `,
            icon: "info",
            showCancelButton: true,
            cancelButtonText: "Отмена",
            confirmButtonText: "Обновить",
            preConfirm: () => {
                return [
                    document.getElementById('title').value,
                    document.getElementById('description').value
                ]
            }
        }).then(result => {
            let value = result.value;
            console.log(result);
            if (result.isConfirmed) {
                axios.patch(route('tips.update'), {
                    id: id,
                    title: value[0],
                    description: value[1]
                }).then(result => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: result.data.result,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    update(index, value[0], value[1])
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
                axios.post(route('tips.destroy'), {
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

    return (
        <AdminLayout>
            <>
                <Typography variant={'h3'} >{name}</Typography>
                <Box style={box}>
                    <TextField
                        error={Boolean(errors.title)}
                        label={'Заголовок'}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        helperText={errors.title}
                    />
                    <TextField
                        error={Boolean(errors.description)}
                        label={'Описание'}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        helperText={errors.description}
                    />
                    <Button sx={{ margin: '20px 0 20px 0' }} onClick={onAdd} variant="contained" color="success">
                        Добавить подсказку
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
                                    Заголовок
                                </TableCell>
                                <TableCell>
                                    Описание
                                </TableCell>
                                <TableCell>
                                    Действие
                                </TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {
                                data.map((tip, index) => (
                                    <TableRow key={tip.id}>
                                        <TableCell component="th" >
                                            {index + 1}
                                        </TableCell>
                                        <TableCell component="th">
                                            {tip.title}
                                        </TableCell>
                                        <TableCell component="th">
                                            {tip.description}
                                        </TableCell>
                                        <TableCell component="th">
                                            <Box sx={style}>
                                                <Button onClick={() => onUpdate(tip.id, index)} variant="contained" color="success">
                                                    <EditIcon />
                                                </Button>
                                                <Button onClick={() => onDestroy(tip.id, index)} variant="outlined" color="error">
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
