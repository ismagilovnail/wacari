import {Alert, AlertTitle} from "@mui/material";
import "./alert-modal.scss";
import {useEffect, useState} from "react";
export default function AlertModal({severity, title, desc, active}) {
    const [alertActive, setAlertActive] = useState('alert');

    useEffect(() => {
        if (active) {
            setAlertActive('alert alert-active');
            setTimeout(() => {
                setAlertActive('alert');
            }, 3000)
        } else {
            setAlertActive('alert');
        }
    }, [active])

    return (
        <>
            <div className={alertActive}>
                <Alert severity={severity}>
                    <AlertTitle>{title}</AlertTitle>
                    {desc}
                </Alert>
            </div>
        </>
    )
}
