import React from "react";

import { ErrorBoundryPage } from "@/views/ErrorPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAppTheme from "@/hooks/useAppTheme";

import "@/service/utils/client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import "./App.scss";

const App: React.FC = () => {
    useAppTheme();

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="light"
            />
            <div id="app" className="scrollbar">
                <Navbar />
                <ErrorBoundryPage>
                    <Outlet />
                </ErrorBoundryPage>
                <Footer />
            </div>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
};

export default App;
