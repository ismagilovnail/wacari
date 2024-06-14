import Editor from "@/Components/editor/Editor"
import AdminLayout from "@/Layouts/AdminLayout"
import { Button, Typography } from "@mui/material"
import Swal from 'sweetalert2';
import { useState } from "react"

export default function AdminAgreement({ name, setting, chapter}) {
    const [editor, setEditor] = useState(setting[0]?.text)

    const onUpdateEditor = (newText) => {
        setEditor(newText);
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
                axios.post(route('setting.store'), {
                    text: editor,
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
                <Editor  content={editor} onUpdateEditor={onUpdateEditor} />
            </AdminLayout>
        </>
    )
}
