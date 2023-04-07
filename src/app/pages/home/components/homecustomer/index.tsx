import React from 'react';
import CustomerImg from '@/utils/assets/images/Group 57.png';
import LoadedImage from '@/utils/helpers/imageLoading';
function HomeCustomer() {
    return (
        <section className="pt-20 pb-4 HomeWelcome">
            <div className="container flex flex-col-reverse items-center justify-between mx-auto mt-0 md:flex-row md:mt-20">
                <div className="max-w-xl pt-4 text-center md:text-left">
                    <h1 className="text-5xl font-semibold text-textPrimary">Our Lovely Customer Loves Our Food</h1>
                    <p className="py-4 mr-10 text-lg text-textGray">
                        “Nemo Enim Ipsam Voluptatem Quia Voluptas Sit Aspernatur Aut Odit Aut Fugit, Sed Quia
                        Condectetur magni dolores eos qui ratione voluptatejn sequi nestuist, Lorem ipsum dolor sit
                        amet, Consectetur adipopscing elit, Sed do eisum temoor incididunt ut labore et dolore magna
                        aliquo!.
                    </p>
                    <div className="flex items-center justify-center md:justify-start">Star...</div>
                    <div className="flex items-center justify-between py-3 md:flex-col md:items-start">
                        <div>
                            <h3 className="text-2xl font-semibold text-textPrimary">Courtney Henry</h3>
                            <p className="text-lg text-textGray">Sylhet, Bangladesh</p>
                        </div>

                        <div className="flex gap-2">
                            <a href="">Prev</a>
                            <a href="">Next</a>
                        </div>
                    </div>
                </div>
                <img src={LoadedImage(CustomerImg)} alt="welcome image" className="max-w-xl max-h-[600px]" />
            </div>
        </section>
    );
}

export default HomeCustomer;
