import React, { useContext } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";

import { AlertContext } from "@/context/AlertContext";

import "@/config/api.conf";

import WarningNotification from "@/components/general/Alert";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import "./App.scss";

const App: React.FC = () => {
  const { alertState } = useContext(AlertContext);

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
      <div className="App scrollbar">
        <WarningNotification
          show={alertState.show}
          message={alertState.message}
          type={alertState.type}
        />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default App;
