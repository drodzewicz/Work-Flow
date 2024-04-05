import React from "react";

import { ReactComponent as PersonMountains } from "@/assets/images/drawkit-nature-man-colour.svg";
import { FaArrowLeft } from "react-icons/fa";

import Box from "@/components/layout/Box";

import "./ErrorPage.scss";
import useRedirect from "@/hooks/useRedirect";

type ErrorPageProps = {
    message: string;
    status: string | number;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ status, message }) => {
    const { goTo } = useRedirect();

    return (
        <Box>
            <div className="error-page">
                <div className="error-page__header">
                    <button className="btn" onClick={() => goTo.custom(-1)}>
                        <FaArrowLeft />
                        Go back
                    </button>
                </div>
                <div className="error-page__main">
                    <h2 className="error-page__title">{`ERROR: ${status}`}</h2>
                    <p className="error-page__message">{message}</p>
                </div>
                <PersonMountains className="error-page__image" />
            </div>
        </Box>
    );
};

export default ErrorPage;
