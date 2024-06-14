import "./auth.scss";

import { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Checkbox, FormControl, Tab, Tabs, TextField, FormHelperText } from '@mui/material';

import ReCAPTCHA from "react-google-recaptcha";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        paddingTop: theme.spacing(1),
        width: '500px'
    },
    '& .MuiBox-root': {
        padding: 0,
        paddingTop: '1.2rem'
    }
}));

const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    )
}

export default function CustomizedDialogs() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);
    const { data, setData, post, errors } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
        check: false,
        recaptcha: ''
    })

    const { data: loginData, setData: setLoginData, post: postLogin, errors: loginErrors } = useForm({
        email: '',
        password: ''
    });

    const errorsCheck = errors.check ? <FormHelperText>Примите условие соглашения.</FormHelperText> : '';
    const errorsRecaptcha = errors.recaptcha ? <Typography sx={{ color: 'red', textAlign: 'center' }}>Подтвердите, что вы не бот.</Typography> : '';

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const onRecaptha = async (value) => {
        setData('recaptcha', value)
    }

    const onRegister = (e) => {
        e.preventDefault();

        post(route('register'));
    }

    const onLogin = (e) => {
        e.preventDefault();

        postLogin(route('login'));
    }

    return (
        <>
            <button className="button-auth"
                type="button"
                onClick={handleClickOpen}
            >
                Войти</button>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Box>
                        <Box>
                            <Tabs value={value} onChange={handleChange} aria-label='Переключение табов'>
                                <Tab label="Регистрация" />

                                <Tab label="Вход" />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0}>

                            <form onSubmit={onRegister} className="auth__form" autoComplete="off">

                                <TextField
                                    error={Boolean(errors.email)}
                                    type="email"
                                    label="Email почта"
                                    name="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    helperText={errors.email}
                                />

                                <TextField
                                    error={Boolean(errors.password)}
                                    type="password"
                                    label="Пароль"
                                    name="password"
                                    autoComplete="off"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    helperText={errors.password}
                                />

                                <TextField
                                    error={Boolean(errors.password)}
                                    type="password"
                                    label="Повторить пароль"
                                    name="password_confirmation"
                                    autoComplete="off"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                />

                                <FormControl error={Boolean(errors.check)}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingTop: 0
                                    }}>
                                        <Checkbox onChange={(e) => setData('check', e.target.checked)} name="check" />
                                        <Typography>
                                            Нажимая на кнопку, я принимаю
                                            <Link

                                                className="auth__link"
                                            >   условия соглашения.
                                            </Link>
                                        </Typography>
                                    </Box>
                                    {errorsCheck}
                                </FormControl>

                                <ReCAPTCHA
                                    sitekey="6LfVu-0pAAAAAPyzug9olgMfkmIx6JlCO7Ci45UB"
                                    style={{ margin: '0 auto' }}
                                    onChange={onRecaptha}
                                />
                                {errorsRecaptcha}
                                <Button type="submit" sx={{ backgroundColor: '#268ABB' }} variant="contained">Регистрация</Button>
                            </form>

                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>

                            <form onSubmit={onLogin} className="auth__form" autoComplete="off">
                                <TextField
                                    error={Boolean(loginErrors.email)}
                                    type="email"
                                    label="Email почта"
                                    value={loginData.email}
                                    onChange={e => setLoginData('email', e.target.value)}
                                    helperText={loginErrors.email}

                                />

                                <TextField
                                    error={Boolean(loginErrors.password)}
                                    type="password"
                                    label="Пароль"
                                    value={loginData.password}
                                    onChange={e => setLoginData('password', e.target.value)}
                                    helperText={loginErrors.password}
                                />

                                <Typography>
                                    <Link className="auth__link"> Забыли свой пароль?</Link>
                                </Typography>

                                <Button type="submit" sx={{ backgroundColor: '#268ABB' }} variant="contained">Вход</Button>
                            </form>

                        </CustomTabPanel>
                    </Box>
                </DialogContent>

            </BootstrapDialog>
        </>
    );
}
