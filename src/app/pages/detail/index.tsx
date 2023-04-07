import { RootState } from '@/app/store';
import Button from '@/core/components/buttons/Button';
import Footer from '@/core/components/footer';
import Navbar from '@/core/components/navbar';
import { getProductbyid } from '@/core/services/product';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Detail() {
    const { id } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductbyid(id));
    }, [id])
    const product = useSelector((state: RootState) => state.productDetail);


    const { result } = product;


    return (<>
        <header className='max-w-screen-xl mx-auto'><Navbar /></header>
        <section>
            <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
                <div>
                    <h1 className="text-2xl font-bold lg:text-3xl">{result?.name}</h1>
                    <p className="mt-1 text-sm text-gray-500">SKU: #012345</p>
                </div>
                <div className="grid gap-8 lg:grid-cols-4 lg:items-start">
                    <div className="lg:col-span-3">
                        <div className='mt-4'>
                            <img src={result?.img} alt={result?.name} className="h-72 w-full rounded-xl object-cover lg:h-[540px]" />
                        </div>

                    </div>
                    <div className="lg:sticky lg:top-0">
                        <form className="space-y-4 lg:pt-8">
                            <fieldset>
                                <legend className="text-lg font-bold">Color</legend>
                                <div className="flex gap-1 mt-2">

                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="text-lg font-bold">Material</legend>
                                <div className="flex gap-1 mt-2">
                                    <label htmlFor="material_cotton" className="cursor-pointer">
                                        <input type="radio" id="material_cotton" name="material" className="sr-only peer" defaultChecked />
                                        <span className="block px-3 py-1 text-xs border border-gray-200 rounded-full peer-checked:bg-gray-100">
                                            Cotton
                                        </span>
                                    </label>
                                    <label htmlFor="material_wool" className="cursor-pointer">
                                        <input type="radio" id="material_wool" name="material" className="sr-only peer" defaultChecked />
                                        <span className="block px-3 py-1 text-xs border border-gray-200 rounded-full peer-checked:bg-gray-100">
                                            Wool
                                        </span>
                                    </label>
                                </div>
                            </fieldset>
                            <div className="p-4 bg-gray-100 border rounded">
                                <p className="text-sm">
                                    <span className="block"> Pay as low as $3/mo with 0% APR. </span>
                                    <a className="inline-block mt-1 underline"> Find out more </a>
                                </p>
                            </div>
                            <div>
                                <p className="text-xl font-bold">${result?.price}</p>
                            </div>
                            <button type="submit" className="w-full px-6 py-3 text-sm font-bold tracking-wide text-white uppercase rounded bg-primary">
                                Add to cart
                            </button>
                            <button type="button" className="w-full px-6 py-3 text-sm font-bold tracking-wide uppercase bg-gray-100 border border-gray-300 rounded">
                                Notify when on sale
                            </button>
                        </form>
                    </div>
                    <div className="lg:col-span-3">
                        <div className="prose max-w-none [&>iframe]:mt-6 [&>iframe]:aspect-video [&>iframe]:w-full [&>iframe]:rounded-xl">
                            <p>
                                {result?.dsc}
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                                eveniet ipsam mollitia nesciunt illo! Suscipit, corrupti!
                            </p>
                            <h2>Features</h2>
                            <ul>
                                <li>Smooth neck design</li>
                                <li>Breathable fabric</li>
                                <li>Odour prevention</li>
                                <li>Made from recycled materials</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer className='max-w-screen-xl mx-auto'><Footer /></footer>
    </>


    )
}

export default Detail;
