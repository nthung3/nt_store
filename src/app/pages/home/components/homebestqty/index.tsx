import React from 'react';
import BestQtyImg from '@/utils/assets/images/Group 18.png';
function HomeBestQty() {
    return (
        <section className="HomeBestQty pt-20 pb-4 bg-white">
            <div className="mt-0  md:mt-20 container mx-auto flex flex-col md:flex-row justify-between items-center">
                <img src={BestQtyImg} alt="" className="max-w-xl flex-1 h-[550px]" />
                <div className="text-center md:text-left md:w-1/2">
                    <h1 className="md:text-4xl xl:text-6xl xl:pr-10 py-4 font-semibold text-textPrimary">
                        Best Quality Food Just For You
                    </h1>
                    <p className="font-normal text-xl text-textGray py-4">
                        We prioritize quality in each of our foods, below are the advantages of our food
                    </p>
                    <div className="py-4 flex flex-col items-center md:items-start">
                        <div className="flex py-2">
                            <span></span>
                            <span>Best service than others</span>
                        </div>
                        <div className="flex py-2">
                            <span></span>
                            <span>Use experience staff than others</span>
                        </div>
                        <div className="flex py-2">
                            <span></span>
                            <span>User friendly app</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeBestQty;
