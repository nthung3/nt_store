import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Stacked({ data, width, height }) {
    return (
        <>
            <BarChart width={width} height={height} data={data}>
                <XAxis dataKey="name" />

                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="a" fill="#F54748" />
                <Bar dataKey="uv" stackId="a" fill="#6f5ede" />
            </BarChart>
        </>
    );
}
