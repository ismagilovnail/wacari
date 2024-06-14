import Editor from "@/Components/editor/Editor"
import AdminLayout from "@/Layouts/AdminLayout"
import { Button, Typography } from "@mui/material"
import Swal from 'sweetalert2';
import { useState } from "react"

export default function AdminAbout({ name, setting, chapter}) {
    const [left, setLeft] = useState(setting[0]?.text);
    const [right, setRight] = useState(setting[0]?.text_two)

    const onUpdateLeft = (newText) => {
        setLeft(newText);
    }

    const onUpdateRight = (newText) => {
        setRight(newText);
    }

    const onAdd = () => {
        Swal.fire({
            title: "Сохранить ?",
            icon: "info",
            showCancelButton: true,
            cancelButtonText: "Отмена",
            confirmButtonText: "Сохранить"
        }).then(result => {

            if (result.isConfirmed) {
                axios.post(route('about.store'), {
                    text: left,
                    text_two: right,
                    chapter: chapter
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
        <>
            <AdminLayout>
                <Typography sx={{marginBottom: '20px'}} variant={'h3'} >{name}</Typography>
                <Button sx={{ margin: '20px 0 20px 0' }} onClick={onAdd} variant="contained" color="success">
                    Сохранить
                </Button>
                <Typography variant={'h4'}>Левая колонка</Typography>
                <Editor  content={left} onUpdateEditor={onUpdateLeft} />

                <Typography sx={{ margin: '20px 0 20px 0' }} variant={'h4'}>Правая колонка</Typography>
                <Editor  content={right} onUpdateEditor={onUpdateRight} />
            </AdminLayout>
        </>
    )
}
