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
import { Link } from "@inertiajs/react";

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

export default function AdminRule({ name, rules }) {
    const [data, setData] = useState(rules);

    const remove = (index) => {
        setData(data => data.filter((_, i) => index !== i));
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
                axios.post(route('rule.destroy'), {
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
                    <Button sx={{ margin: '20px 0 20px 0' }} variant="contained" color="success">
                        <Link style={{ color: '#fff', textDecoration: 'none' }} href={route('rule.create')}>
                            Добавить религию
                        </Link>
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
                                data.map((rule, index) => (
                                    <TableRow key={rule.id}>
                                        <TableCell component="th" >
                                            {index + 1}
                                        </TableCell>
                                        <TableCell component="th">
                                            {rule.title}
                                        </TableCell>
                                        <TableCell component="th">
                                            {rule.description}
                                        </TableCell>
                                        <TableCell component="th">
                                            <Box sx={style}>
                                                <Button variant="contained" color="success">
                                                    <Link style={{width: '100%', height: '100%', color: '#fff', textDecoration: 'none' }} href={route('rule.edit', [rule.id])}>
                                                        <EditIcon />
                                                    </Link>
                                                </Button>
                                                <Button onClick={() => onDestroy(rule.id, index)} variant="outlined" color="error">
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
