import PrimaryButton from '@/core/components/buttons/primaryButton';
import React from 'react';
import HomeImage from '@/utils/assets/images/Group 64.png';
function HomeBanner() {
    return (
        <section className="home relative pt-20 pb-10 bg-primary1">
            <div className="flex flex-col-reverse md:flex-row mt-7 items-stretch container mx-auto">
                <div className="text-center md:text-left md:w-1/2 md:pr-14 py-14">
                    <h1 className="md:max-w-lg font-semibold md:text-4xl xl:text-6xl mb-8 text-textPrimary ">
                        Be The Fastest In Delivering Your Food
                    </h1>
                    <p className="text-xl text-gray-400 mr-10 mb-5">
                        From your neighbrhood sushi spot to the burger you crave, choose from over 3000k+ local and
                        national favorites
                    </p>
                    <PrimaryButton>Order Now</PrimaryButton>
                </div>
                <img src={HomeImage} alt="" className="max-w-xl h-[550px]" />
            </div>
        </section>
    );
}

export default HomeBanner;
