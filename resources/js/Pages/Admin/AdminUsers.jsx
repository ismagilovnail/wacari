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


import EditIcon from '@mui/icons-material/Edit';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import { useState } from "react";
import {Link} from "@inertiajs/react";

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

export default function AdminUsers({ users }) {
    const [data, setData] = useState(users);
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
                }).catch(error => setErrors(error.response.data.errors));
            }
        });
    }

    return (
        <AdminLayout>
            <>
                <Typography variant={'h3'} >Пользователи</Typography>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    №
                                </TableCell>
                                <TableCell>
                                    Фамилия
                                </TableCell>
                                <TableCell>
                                    Имя
                                </TableCell>
                                <TableCell>
                                    Отчество
                                </TableCell>
                                <TableCell>
                                    Дата рождения
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    Биографии
                                </TableCell>
                                <TableCell>
                                    Действие
                                </TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {
                                data.map((user, index) => (
                                    <TableRow key={user.id}>
                                        <TableCell component="th" >
                                            {index + 1}
                                        </TableCell>
                                        <TableCell component="th">
                                            {user.profile.surname ?? 'Не задано'}
                                        </TableCell>
                                        <TableCell component="th">
                                            { user.profile.name ?? 'Не задано'}
                                        </TableCell>
                                        <TableCell component="th">
                                            { user.profile.patronymic ?? 'Не задано'}
                                        </TableCell>
                                        <TableCell component="th">
                                            { user.profile.birth ?? 'Не задано'}
                                        </TableCell>
                                        <TableCell component="th">
                                            {user.email ?? 'Не задано'}
                                        </TableCell>
                                        <TableCell component="th">
                                           <Link>
                                               <SupervisedUserCircleIcon />
                                           </Link>
                                        </TableCell>
                                        <TableCell component="th">
                                            <Box sx={style}>
                                                <Link href={route('user.edit', [ user.id ])}>
                                                    <EditIcon />
                                                </Link>
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
