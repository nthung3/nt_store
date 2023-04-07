import { CreateProduct, UpdateProduct } from '@/core/services/product';
import React, { useDeferredValue, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function FormProducts() {

    const [fields, setFields] = useState({
        name: '',
        dsc: '',
        price: '',
    });

    const debounce = useDeferredValue(fields)
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;
        setFields((prev: any) => ({
            ...prev,
            ...{
                [id]: value,
            },
        }));
    };
    const { productId } = useParams()
    console.log(productId);
    const imageFile = useRef(null)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleOnsubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("imageFile", imageFile.current.files[0]);
        formData.append("data", JSON.stringify(debounce));
        if (productId) return dispatch(UpdateProduct(productId, debounce))
        dispatch(CreateProduct(formData))
        setFields({ name: '', dsc: '', price: '' });
        navigate('/admin/product')
    };
    return (
        <div>
            <div className="container p-4 mx-auto bg-white">
                <div className="w-full mx-auto my-12 md:w-1/2 lg:w-1/3">
                    <h1 className="text-lg font-bold">Form Product</h1>
                    <form onSubmit={handleOnsubmit} className="flex flex-col mt-4">
                        <input type="text" name="categoryId" className="w-full px-4 py-3 text-sm bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="category" />
                        <input type="text" id="name" onChange={handleOnChange} className="w-full px-4 py-3 mt-4 text-sm bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Name Product" />
                        <input type="file" name="imageFile" ref={imageFile} className="w-full px-4 py-3 mt-4 text-sm bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0" />
                        <input type="text" id="dsc" onChange={handleOnChange} className="w-full px-4 py-3 mt-4 text-sm bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="Description" />
                        <input type="text" id="price" onChange={handleOnChange} className="w-full px-4 py-3 mt-4 text-sm bg-gray-100 border-transparent rounded-md focus:border-gray-500 focus:bg-white focus:ring-0" placeholder="$120" />
                        <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-3 mt-4 text-base font-medium leading-6 text-white border border-transparent rounded-md cursor-pointer bg-primary focus:outline-none hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Submit
                        </button>
                        <div className="flex flex-col items-center mt-5">
                            <p className="mt-1 text-xs font-light text-gray-500">
                                You don't want to change<a className="ml-1 font-medium text-blue-400">Back now</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
