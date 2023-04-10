import './App.css';
import Layout from '@/core/components/layouts';
import { BrowserRouter } from 'react-router-dom';
import Router from './configs/router';
import { ContextProvider } from './utils/contexts/ThemeProvider';
import { UseAuthentication } from './core/hooks/useAuth';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const { getProfileAPI } = UseAuthentication();
    useEffect(() => {
        getProfileAPI();
    }, [getProfileAPI]);
    return (
        <div className="w-full h-full App font-inter bg-zinc-50">
            <BrowserRouter>
                <ContextProvider>
                    <Layout>
                        <Router />
                    </Layout>
                </ContextProvider>
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
}

export default App;
