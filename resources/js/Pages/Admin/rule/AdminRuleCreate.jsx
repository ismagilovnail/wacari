import AdminLayout from "@/Layouts/AdminLayout";
import "../css/admin.scss";
import {
    Button,
    Typography,
    Box,
    TextField
} from "@mui/material";

import axios from "axios";
import Swal from 'sweetalert2';

import { useState } from "react";
import Editor from "@/Components/editor/Editor";

const box = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginTop: '10px'
}

export default function AdminRuleCreate({name, rules }) {
    const [title, setTitle] = useState(rules?.title ?? '');
    const [description, setDescription] = useState(rules?.description ?? '');

    const onUpdateEditor = (newText) => {
        setDescription(newText);
    }

    const onAdd = () => {
        Swal.fire({
            icon: "info",
            title: name,
            showCancelButton: true,
            cancelButtonText: 'Отмена',
            confirmButtonText: 'Ок'
        }).then(result => {
            if (result.isConfirmed) {
                axios.post(route('rule.store'), {
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
                    setTitle('');
                    setDescription('');
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
        })
    }

    const onUpdate = (id, index) => {
        Swal.fire({
            title: name,
            icon: "info",
            showCancelButton: true,
            cancelButtonText: "Отмена",
            confirmButtonText: "Обновить",
        }).then(result => {
            if (result.isConfirmed) {
                axios.patch(route('rule.update'), {
                    id: rules.id,
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
                <Typography variant={'h3'} >Создать правило</Typography>
                <Box style={box}>
                    {
                        !(Boolean(rules?.title) && Boolean(rules?.description)) ?
                            <Button sx={{ margin: '20px 0 20px 0' }} onClick={onAdd} variant="contained" color="success">
                                Добавить правило
                            </Button>
                            :
                            <Button sx={{ margin: '20px 0 20px 0' }} onClick={onUpdate} variant="contained" color="success">
                                Обновить правило
                            </Button>
                    }
                </Box>
                <TextField
                    label={'Заголовок'}
                    sx={{ width: '100%', marginBottom: '20px' }}
                    value={title}
                    onChange={e => setTitle(e.target.value)}

                />
                <Editor content={description} onUpdateEditor={onUpdateEditor} />
            </>
        </AdminLayout>
    )
}
