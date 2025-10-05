import { RootState } from '@/app/store';

import { getProduct } from '@/core/services/product';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Product() {
    const product = useSelector((state: RootState) => state.product);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProduct());
    }, [getProduct]);

    return (
        <div className="mt-18">
            <div className="container mx-auto">
                <h1 className="my-5 text-3xl font-semibold"> Product</h1>
                <div className="">
                    <div className="overflow-hidden overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full text-sm divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left bg-gray-100">
                                        <label className="sr-only" htmlFor="SelectAll">
                                            Select All
                                        </label>
                                        <input
                                            className="w-5 h-5 border-gray-200 rounded"
                                            type="checkbox"
                                            id="SelectAll"
                                        />
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                                        Image
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                                        Name
                                    </th>

                                    <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                                        Description
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                                        Price
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {product.result?.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td className="px-4 py-2 bg-white">
                                                <label className="sr-only" htmlFor="Row1">
                                                    Row 1
                                                </label>
                                                <input
                                                    className="w-5 h-5 border-gray-200 rounded"
                                                    type="checkbox"
                                                    id="Row1"
                                                />
                                            </td>{' '}
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                                                <img src={item.img} alt="" className="w-10 h-10 rounded" />
                                            </td>
                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                {item.name}
                                            </td>
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">{item.dsc}</td>
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">${item.price}</td>
                                            <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                                                <Link to={`/admin/editProduct/${item._id}`}>Update</Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
