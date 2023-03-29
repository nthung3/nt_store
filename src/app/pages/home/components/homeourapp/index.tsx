import React from 'react';

function HomeOurApp() {
    return (
        <section className="HomeBestQty pt-20 bg-white">
            <div className="mt-20">
                <div className="container mx-auto bg-primary p-9 md:rounded-[47px] text-center">
                    <h1 className="md:text-4xl xl:text-6xl text-white font-semibold max-w-3xl mx-auto my-9">
                        Get Up To 50% Off When Making Transactions On Our App
                    </h1>
                    <p className="text-lg text-gray-100 mb-12">
                        Only available on the ios platform for now, or download demo android app?
                    </p>
                    <button className="rounded-[29px] bg-white text-primary text-lg font-semibold text-center px-[22px] py-2 active:scale-95">
                        Download App
                    </button>
                </div>
            </div>
        </section>
    );
}

export default HomeOurApp;
