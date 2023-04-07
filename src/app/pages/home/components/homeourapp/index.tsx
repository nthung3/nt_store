import { AppleIcons } from '@/constants/icon';
import React from 'react';

function HomeOurApp() {
    return (
        <section className="pt-20 HomeBestQty">
            <div className="mt-20">
                <div className="container mx-auto bg-primary p-9 md:rounded-[47px] text-center">
                    <h1 className="max-w-3xl mx-auto font-semibold text-white md:text-4xl xl:text-6xl my-9">
                        Get Up To 50% Off When Making Transactions On Our App
                    </h1>
                    <p className="mb-12 text-lg text-gray-100">
                        Only available on the ios platform for now, or download demo android app?
                    </p>
                    <div className="flex justify-center">
                        <button className="flex items-center gap-3 rounded-[29px] bg-white text-primary text-lg font-semibold  px-[22px] py-2 active:scale-95">
                            <span>
                                <AppleIcons />
                            </span>{' '}
                            Download App
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeOurApp;
