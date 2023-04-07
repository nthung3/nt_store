import PrimaryButton from '@/core/components/buttons/primaryButton';
import React, { Suspense } from 'react';
import HomeImage from '@/utils/assets/images/Group 64.png';
import LoadedImage from '@/utils/helpers/imageLoading';
function HomeBanner() {
    return (
        <section className="relative pt-20 pb-10 home bg-primary1">
            <div className="container flex flex-col-reverse items-stretch justify-between mx-auto md:flex-row mt-7">
                <div className="ml-3 text-center md:text-left md:w-1/2 md:pr-14 py-14">
                    <h1 className="mb-8 font-semibold md:max-w-lg md:text-4xl xl:text-6xl text-textPrimary ">
                        Be The Fastest In Delivering Your Food
                    </h1>
                    <p className="mb-5 mr-10 text-xl text-gray-400">
                        From your neighbrhood sushi spot to the burger you crave, choose from over 3000k+ local and
                        national favorites
                    </p>
                    <PrimaryButton>Order Now</PrimaryButton>
                </div>
                <Suspense fallback={<>Loading...</>}>
                    <img src={LoadedImage(HomeImage)} alt="BestQtyImg" className=" h-[550px]" />
                </Suspense>
            </div>
        </section>
    );
}

export default HomeBanner;
