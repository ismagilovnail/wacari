import AdminLayout from "@/Layouts/AdminLayout";
import { Button, Typography, TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Box } from "@mui/material";
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

export default function AdminContinents({ continents }) {
    const [data, setData] = useState(continents);

    const add = (id, name) => {
        setData(data => [...data, { id: id, name: name }]);
    }

    const remove = (index) => {
        setData(data => data.filter((_, i) => index !== i));
    }

    const update = (index, value, name) => {
        setData(data => data.map((q, i) => (i === index ? { ...q, [name]: value } : q)));
    }


    const onAdd = () => {
        Swal.fire({
            title: "Напишите континент",
            input: "text",
            icon: "info",
            showCancelButton: true,
            cancelButtonText: "Отмена",
            confirmButtonText: "Сохранить"
        }).then(result => {
            let value = result.value;

            if (result.isConfirmed) {
                axios.post(route('continents.store'), {
                    name: value
                }).then(result => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: result.data.result,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    add(result.data.id, value)
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

    const onUpdate = (id, index) => {
        Swal.fire({
            title: "Напишите новый континент",
            input: "text",
            icon: "info",
            showCancelButton: true,
            cancelButtonText: "Отмена",
            confirmButtonText: "Обновить"
        }).then(result => {
            let value = result.value;

            if (result.isConfirmed) {
                axios.patch(route('continents.update'), {
                    id: id,
                    name: value
                }).then(result => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: result.data.result,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    update(index, value, 'name')
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
                axios.post(route('continents.destroy'), {
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
                <Typography variant={'h3'} >Добавить континент</Typography>
                <Button sx={{ margin: '20px 0 20px 0' }} onClick={onAdd} variant="contained" color="success">
                    Добавить континент
                </Button>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    №
                                </TableCell>
                                <TableCell>
                                    Название
                                </TableCell>
                                <TableCell>
                                    Действие
                                </TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {
                                data.map((continent, index) => (
                                    <TableRow key={continent.id}>
                                        <TableCell component="th" >
                                            {index + 1}
                                        </TableCell>
                                        <TableCell component="th">
                                            {continent.name}
                                        </TableCell>
                                        <TableCell component="th">
                                            <Box sx={style}>
                                                <Button onClick={() => onUpdate(continent.id, index)} variant="contained" color="success">
                                                    <EditIcon />
                                                </Button>
                                                <Button onClick={() => onDestroy(continent.id, index)} variant="outlined" color="error">
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
