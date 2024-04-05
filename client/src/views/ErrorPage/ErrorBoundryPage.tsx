import React from "react";

import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { useLocation } from "react-router-dom";

import ErrorPage from "./ErrorPage";

const FallBackComponent: React.FC<FallbackProps> = ({ error }) => {
    const status = error.response?.status;
    const message = error.response.data?.message;
    return <ErrorPage status={status} message={message} />;
};

const ErrorBoundryPage: React.FC<React.PropsWithChildren> = ({ children }) => {
    const location = useLocation();

    return (
        <ErrorBoundary FallbackComponent={FallBackComponent} resetKeys={[location.pathname]}>
            {children}
        </ErrorBoundary>
    );
};

export default ErrorBoundryPage;
