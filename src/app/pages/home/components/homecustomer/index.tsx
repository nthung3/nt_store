import React from 'react';
import CustomerImg from '@/utils/assets/images/Group 57.png';
function HomeCustomer() {
    return (
        <section className="HomeWelcome pt-20 pb-4 bg-white">
            <div className="flex-col-reverse md:flex-row mt-0 md:mt-20 container mx-auto flex justify-between items-center">
                <div className="text-center pt-4 md:text-left max-w-xl">
                    <h1 className="text-5xl font-semibold text-textPrimary">
                        Our Lovely Customer Loves Our Food
                    </h1>
                    <p className=" text-lg text-textGray py-4 mr-10 ">
                        “Nemo Enim Ipsam Voluptatem Quia Voluptas Sit Aspernatur Aut Odit Aut Fugit, Sed Quia
                        Condectetur magni dolores eos qui ratione voluptatejn sequi nestuist, Lorem ipsum dolor sit
                        amet, Consectetur adipopscing elit, Sed do eisum temoor incididunt ut labore et dolore magna
                        aliquo!.
                    </p>
                    <div className="flex justify-center md:justify-start items-center">Star...</div>
                    <div className="py-3 flex md:flex-col items-center md:items-start justify-between">
                        <div>
                            <h3 className="font-semibold text-textPrimary text-2xl">Courtney Henry</h3>
                            <p className="text-lg text-textGray">Sylhet, Bangladesh</p>
                        </div>

                        <div className="flex gap-2">
                            <a href="">Prev</a>
                            <a href="">Next</a>
                        </div>
                    </div>
                </div>
                <img src={CustomerImg} alt="welcome image" className="max-w-xl max-h-[600px]" />
            </div>
        </section>
    );
}

export default HomeCustomer;
