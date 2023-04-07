import Button from '@/core/components/buttons/Button';
import { ThemeProvider } from '@/utils/contexts/ThemeProvider';
import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';

import {
    earningData,
    medicalproBranding,
    weeklyStats,
    StackedData,
    SparkData,
    ecomPieChartData,
    PieData,
} from '@/constants/admin';
import { Pie, SparkLine, Stacked } from '../components';

const HomeAdmin = () => {
    const { currentColor, currentMode } = ThemeProvider();

    return (
        <div className="mt-24">
            <div className="flex flex-wrap justify-center lg:flex-nowrap ">
                <div className="w-full p-8 m-3 bg-white bg-center bg-no-repeat bg-cover dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl lg:w-80 pt-9 bg-hero-pattern">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-gray-400">Earnings</p>
                            <p className="text-2xl">$63,448.78</p>
                        </div>
                        <button
                            type="button"
                            style={{ backgroundColor: currentColor }}
                            className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
                        >
                            <BsCurrencyDollar />
                        </button>
                    </div>
                    <div className="mt-6">
                        <Button color="white" bgColor={currentColor} text="Download" borderRadius="10px" />
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1 m-3">
                    {earningData.map((item) => (
                        <div
                            key={item.title}
                            className="p-4 bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 pt-9 rounded-2xl "
                        >
                            <button
                                type="button"
                                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                            >
                                {item.icon}
                            </button>
                            <p className="mt-3">
                                <span className="text-lg font-semibold">{item.amount}</span>
                                <span className={`text-sm text-${item.pcColor} ml-2`}>{item.percentage}</span>
                            </p>
                            <p className="mt-1 text-sm text-gray-400">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-10">
                <div className="p-4 m-3 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-780 ">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">Revenue Updates</p>
                        <div className="flex items-center gap-4">
                            <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                                <span>
                                    <GoPrimitiveDot />
                                </span>
                                <span>Expense</span>
                            </p>
                            <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                                <span>
                                    <GoPrimitiveDot />
                                </span>
                                <span>Budget</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-10 mt-10">
                        <div className="pr-10 m-4 border-r-1 border-color">
                            <div>
                                <p>
                                    <span className="text-3xl font-semibold">$93,438</span>
                                    <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                                        23%
                                    </span>
                                </p>
                                <p className="mt-1 text-gray-500">Budget</p>
                            </div>
                            <div className="mt-8">
                                <p className="text-3xl font-semibold">$48,487</p>

                                <p className="mt-1 text-gray-500">Expense</p>
                            </div>

                            <div className="mt-5">
                                {/*line chart*/}
                                <SparkLine height={80} width={250} data={SparkData} />
                            </div>
                            <div className="mt-10">
                                <Button
                                    color="white"
                                    bgColor={currentColor}
                                    text="Download Report"
                                    borderRadius="10px"
                                />
                            </div>
                        </div>
                        <div>
                            {/*stack chart*/}
                            <Stacked width={320} height={360} data={StackedData} />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="p-4 m-3 rounded-2xl md:w-400" style={{ backgroundColor: currentColor }}>
                        <div className="flex items-center justify-between ">
                            <p className="text-2xl font-semibold text-white">Earnings</p>

                            <div>
                                <p className="mt-8 text-2xl font-semibold text-white">$63,448.78</p>
                                <p className="text-gray-200">Monthly revenue</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            {/*line chart*/}
                            <SparkLine height={100} data={StackedData} width={320} />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-10 p-8 m-3 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400">
                        <div>
                            <p className="text-2xl font-semibold ">$43,246</p>
                            <p className="text-gray-400">Yearly sales</p>
                        </div>

                        <div className="w-40">
                            {/*pie chart*/}
                            <Pie id="pie-chart" data={PieData} legendVisiblity={false} height={160} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center">
                <div className="p-6 m-3 bg-white md:w-400 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">Weekly Stats</p>
                        <button type="button" className="text-xl font-semibold text-gray-500">
                            <IoIosMore />
                        </button>
                    </div>

                    <div className="mt-10 ">
                        {weeklyStats.map((item) => (
                            <div key={item.title} className="flex justify-between w-full mt-4">
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        style={{ background: item.iconBg }}
                                        className="p-3 text-2xl text-white rounded-full hover:drop-shadow-xl"
                                    >
                                        {item.icon}
                                    </button>
                                    <div>
                                        <p className="font-semibold text-md">{item.title}</p>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                </div>

                                <p className={`text-${item.pcColor}`}>{item.amount}</p>
                            </div>
                        ))}
                        <div className="mt-4">{/*line chart*/}</div>
                    </div>
                </div>
                <div className="p-6 m-3 bg-white w-400 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">MedicalPro Branding</p>
                        <button type="button" className="text-xl font-semibold text-gray-400">
                            <IoIosMore />
                        </button>
                    </div>
                    <p className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-24 bg-orange-400 py-0.5 px-2 text-gray-200 mt-10">
                        16 APR, 2021
                    </p>

                    <div className="flex gap-4 mt-6 border-b-1 border-color">
                        {medicalproBranding.data.map((item) => (
                            <div key={item.title} className="pb-2 pr-4 border-r-1 border-color">
                                <p className="text-xs text-gray-400">{item.title}</p>
                                <p className="text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="pb-4 mt-2 border-b-1 border-color">
                        <p className="mb-2 font-semibold text-md">Teams</p>

                        <div className="flex gap-4">
                            {medicalproBranding.teams.map((item) => (
                                <p
                                    key={item.name}
                                    style={{ background: item.color }}
                                    className="cursor-pointer hover:drop-shadow-xl text-white py-0.5 px-3 rounded-lg text-xs"
                                >
                                    {item.name}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-5 border-t-1 border-color">
                        <div className="mt-3">
                            <Button color="white" bgColor={currentColor} text="Add" borderRadius="10px" />
                        </div>

                        <p className="text-sm text-gray-400">36 Recent Transactions</p>
                    </div>
                </div>
                <div className="p-6 m-3 bg-white w-400 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl">
                    <div className="flex justify-between">
                        <p className="text-xl font-semibold">Daily Activities</p>
                        <button type="button" className="text-xl font-semibold text-gray-500">
                            <IoIosMore />
                        </button>
                    </div>
                    <div className="mt-10">
                        <div className="md:w-96 h-50 " />
                        <div className="mt-8">
                            <p className="text-lg font-semibold">React 18 coming soon!</p>
                            <p className="text-gray-400 ">By Johnathan Doe</p>
                            <p className="mt-8 text-sm text-gray-400">
                                This will be the small description for the news you have shown here. There could be some
                                great info.
                            </p>
                            <div className="mt-3">
                                <Button color="white" bgColor={currentColor} text="Read More" borderRadius="10px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeAdmin;
