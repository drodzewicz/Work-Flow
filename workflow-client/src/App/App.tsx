import React, { useContext } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";

import "@/config/api.conf";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

import "./App.scss";

const App: React.FC = () => {
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
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default App;
