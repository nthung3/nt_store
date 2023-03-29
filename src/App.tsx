import { useState } from 'react';

import './App.css';

import Layout from '@/core/components/layouts';
import { BrowserRouter } from 'react-router-dom';
import Router from './configs/router';

function App() {
    const [count, setCount] = useState(0);

    return (
        // Create a navbar div
        <div className="w-full App font-inter">
            <BrowserRouter>
                <Layout>
                    <Router />
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;
