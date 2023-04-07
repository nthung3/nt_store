import LoadedImage from '@/utils/helpers/imageLoading';
import React from 'react';
import { Link } from 'react-router-dom';
import { SecondaryButton } from '../buttons';

function ProductItems({ data }) {


    return (
        <article
            className="relative p-4 w-full bg-white rounded-[21px] overflow-hidden shadow hover:shadow-md card"
            style={{ minHeight: 160 }}
        >


            <div>
                <div className="absolute top-0 right-0 z-20 flex justify-between p-4 mt-2 mr-2">
                    <div className="inline-flex items-center justify-center w-8 h-8 p-2 bg-white rounded-full shadow-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 h-auto text-red-500 fill-current"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                <div className="relative block h-full">
                    {data._id ? <Link to={`${data._id}`} className="absolute top-0 left-0 w-full h-full" /> : <></>}
                    <img src={LoadedImage(data.img)} className="object-cover w-full h-64 bg-gray-100 rounded-3xl" />
                </div>
            </div>
            <h2 className="mt-5 text-lg font-semibold text-left truncate pr-14 text-textPrimary line-clamp-1">{data.name}</h2>
            <div className="flex items-center justify-between py-2">
                <p className="mt-2 text-2xl text-textSecondary">${data.price}</p>
                <SecondaryButton>Add To Cart</SecondaryButton>
            </div>

        </article>
    );
}

export default ProductItems;
