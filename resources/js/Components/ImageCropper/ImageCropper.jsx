import React, { useState, createRef } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from '@mui/material/Modal';
import { Button } from "@mui/material";

import defaultImg from "./default-avatar.png";
import DeleteIcon from '@mui/icons-material/Delete';

import "./imageCropper.scss";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1000',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export default function ImageCropper() {
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [cropData, setCropData] = useState(null);
    const cropperRef = createRef();

    const handleClose = () => {
        setOpen(false);
    };

    const onInput = (e) => {
        const input = e.currentTarget.querySelector('input[type="file"]');
        if (input) {
            input.click();
        }
    }

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            setOpen(true);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            handleClose();
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
        }
    };

    const deleteImg = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCropData(null);
    }

    return (
        <>
            <div className="image-cropper" onClick={onInput}>
                <Button onClick={deleteImg} style={{ display: cropData ? 'block' : '' }} type="button">
                    <DeleteIcon />
                </Button>
                <img className={cropData ? 'image-cropper-img' : ''} src={cropData ?? defaultImg} />
                <input accept={'.jpg, .jpeg, .png, .webp'} type="file" onChange={onChange} />
                <p>Загрузите новое изооброжение</p>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                style={{ zIndex: 3000 }}
            >
                <div>
                    <Cropper
                        ref={cropperRef}
                        style={{ height: 400, width: "100%", zIndex: 3000, position: 'relative' }}
                        zoomTo={0.5}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={225}
                        minCropBoxWidth={180}
                        cropBoxResizable={false}
                        background={false}
                        responsive={true}
                        autoCropArea={180 / 225}
                        checkOrientation={false}
                        guides={true}
                    />
                    <div className="image-cropper__wrap">
                        <Button onClick={handleClose} type="button">Отменить</Button>
                        <Button onClick={getCropData} type="button">Обрезать</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
