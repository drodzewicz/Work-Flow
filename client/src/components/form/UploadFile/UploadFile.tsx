import React, { useRef } from "react";

import { formatBytes } from "@/utils/unitConverter";
import { useField } from "formik";

import "./UploadFile.scss";

type UploadFileProps = {
    name: string;
    label?: string;
};

const UploadFile: React.FC<UploadFileProps> = ({ name, label = "Choose a file" }) => {
    const [, { error, value }, { setValue, setTouched }] = useField<File>(name);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const onUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setTouched(true);
        if (e.target.files) {
            setValue(e.target.files[0]);
        }
    };

    const onButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="upload-file">
            <button onClick={onButtonClick} className="btn" type="button">
                {label}
            </button>
            <input
                ref={fileInputRef}
                className="upload-file__input"
                type="file"
                name="image"
                accept="image/*"
                onChange={onUploadChange}
            />
            {value && (
                <div className="upload-file__selected-file">
                    <span className="upload-file__selected-file__name">{value.name}</span>
                    <span className="upload-file__selected-file__size">{`(Size) ${formatBytes(
                        value.size
                    )}`}</span>
                </div>
            )}
            <div className="upload-file__error">{error}</div>
        </div>
    );
};

export default UploadFile;
