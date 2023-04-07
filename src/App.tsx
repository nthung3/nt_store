import './App.css';
import Layout from '@/core/components/layouts';
import { BrowserRouter } from 'react-router-dom';
import Router from './configs/router';
import { ContextProvider } from './utils/contexts/ThemeProvider';
import { UseAuthentication } from './core/hooks/useAuth';
import React, { useEffect } from 'react';

function App() {
    const { getProfileAPI } = UseAuthentication();
    useEffect(() => {
        getProfileAPI();
    }, [getProfileAPI]);
    let arr = [[1, 2, 54, 4], [2, 3, 2, 5], [3, 4, 2, 6]];
    let newArr = arr.map(subArr => {
        console.log(subArr[0]);

        subArr[0] = 1;
        subArr[1] = 3;
        subArr[2] = subArr[2] === 54 ? 54 : 25;
        return subArr;
    });
    console.log(newArr); // [[1,3,54,4], [1,3,25], [1,4,2,6]]

    return (
        <div className="w-full h-full App font-inter bg-zinc-50">
            <BrowserRouter>
                <ContextProvider>
                    <Layout>
                        <Router />
                    </Layout>
                </ContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
