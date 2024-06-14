import defaultLogo from "./default-avatar.png";
import "./edit.scss";

import NamePage from "@/Components/name-page/NamePage";
import Layout from "@/Layouts/Layout";
import { Button, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "dayjs/locale/ru";
import { useMask } from "@react-input/mask";
import { useState } from "react";
import dayjs from "dayjs";
import AlertModal from "@/Components/alert-modal/AlertModal.jsx";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export default function Edit({ user, profile }) {
    const maskRef = useMask({ mask: '+7 (___) ___-__-__', replacement: { _: /\d/ } });
    const { auth } = usePage().props;

    const [data, setData] = useState({
        id: auth.user.id,
        name: profile.name ?? '',
        surname: profile.surname ?? '',
        patronymic: profile.patronymic ?? '',
        email: user.email ?? '',
        birth: profile.birth ?? '',
        phone: profile.phone ?? '',
        mailing_address: profile.mailing_address ?? '',
        notes: profile.notes ?? '',
        avatar: '',
        password: '',
        password_confirmation: ''
    })


    const [image, setImage] = useState(profile.avatar ?? null);
    const [errors, setErrors] = useState({});


    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            onChangeForm('avatar', file);
            setImage(URL.createObjectURL(file));
        }

    };

    const onChangeForm = (key, value) => {
        setData(data => ({
            ...data,
            [key]: value
        }));
    };

    const submit = function (e) {
        e.preventDefault();

        axios.post(route('profile.update'), data, {
            headers: {
                "Content-type": "multipart/form-data",
            }
        })
            .then(r => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: r.data.desc,
                    showConfirmButton: false,
                    timer: 1500
                });
            }).catch(error => setErrors(error.response.data.errors));
    }

    const zero = function (num) {
        if (num < 10) {
            return `0${num}`;
        }

        return num;
    }

    const date = function (date) {
        return `${date.$y}-${zero(date.$M)}-${zero(date.$D)}`;
    }

    return (
        <Layout>
            <AlertModal
                severity={alert.severity}
                title={alert.title}
                desc={alert.desc}
                active={alert.success}
            />

            <NamePage name={'Настройки'} desc={'Персональная информация'} />

            <section className="profile">
                <div className="profile__img">
                    <img src={image ?? defaultLogo} alt="Аватар пользователя" />
                </div>
                <form onSubmit={submit}>

                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Фотография

                        <VisuallyHiddenInput accept={'.jpg, .jpeg, .png, .webp'} onChange={handleImageChange} type="file" />
                    </Button>

                    <TextField
                        error={Boolean(errors.name)}
                        type="text"
                        variant="outlined"
                        label="Имя"
                        onChange={e => onChangeForm('name', e.target.value)}
                        helperText={errors.name}
                        value={data.name}
                    />

                    <TextField
                        error={Boolean(errors.surname)}
                        type="text"
                        variant="outlined"
                        label="Фамилия"
                        onChange={e => onChangeForm('surname', e.target.value)}
                        helperText={errors.surname}
                        value={data.surname}
                    />

                    <TextField
                        error={Boolean(errors.patronymic)}
                        type="text"
                        variant="outlined"
                        label="Отчество"
                        onChange={e => onChangeForm('patronymic', e.target.value)}
                        helperText={errors.patronymic}
                        value={data.patronymic}
                    />


                    <TextField
                        error={Boolean(errors.email)}
                        type="email"
                        variant="outlined"
                        label="E-Mail"
                        onChange={e => onChangeForm('email', e.target.value)}
                        helperText={errors.email}
                        value={data.email}
                    />

                    <TextField
                        error={Boolean(errors.password)}
                        type="password"
                        variant="outlined"
                        label="Пароль"
                        autoComplete="new-password"
                        onChange={e => onChangeForm('password', e.target.value)}
                        helperText={errors.password}
                    />

                    <TextField
                        error={Boolean(errors.password_confirmation)}
                        type="password"
                        variant="outlined"
                        label="Повторите пароль"
                        onChange={e => onChangeForm('password_confirmation', e.target.value)}
                        helperText={errors.password_confirmation}
                    />

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
                        <DatePicker
                            label={'Дата рождения'}
                            onChange={newValue => onChangeForm('birth', date(newValue))}
                            defaultValue={profile.birth ? dayjs(profile.birth) : null}
                        />
                    </LocalizationProvider>

                    <TextField
                        error={Boolean(errors.phone)}
                        variant="outlined"
                        label={'Номер телефона'}
                        inputRef={maskRef}
                        onChange={e => onChangeForm('phone', e.target.value)}
                        helperText={errors.phone}
                        value={data.phone}
                    />

                    <TextField
                        error={Boolean(errors.mailing_address)}
                        type="text"
                        variant="outlined"
                        label="Почтовый адрес"
                        onChange={e => onChangeForm('mailing_address', e.target.value)}
                        value={data.mailing_address}
                        helperText={errors.mailing_address}
                    />

                    <TextField
                        error={Boolean(errors.notes)}
                        type="text"
                        variant="outlined"
                        label="Дополнительные заметки"
                        onChange={e => onChangeForm('notes', e.target.value)}
                        value={data.notes}
                        helperText={errors.notes}
                    />

                    <Button type="submit" variant="contained">
                        Сохранить
                    </Button>
                </form>
            </section>
        </Layout>
    )
}
