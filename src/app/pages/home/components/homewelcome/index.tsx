import React from 'react';
import WelcomeImg from '@/utils/assets/images/Group 62.png';
import LoadedImage from '@/utils/helpers/imageLoading';
function HomeWelcome() {
    return (
        <section className="pt-20 pb-4 HomeWelcome">
            <div className="container flex flex-col-reverse items-center justify-between mx-auto mt-0 md:mt-20 md:flex-row">
                <div className="text-center md:text-left md:w-1/2">
                    <h1 className="py-4 pr-10 font-semibold md:text-4xl xl:text-6xl text-textPrimary">
                        Every Flavour Welcome
                    </h1>
                    <p className="py-4 text-xl font-normal text-textGray">
                        From your neighborhood sushi spot to the burger and fries you crave, choose from over 300,000
                        local and national
                    </p>
                    <div className="inline-flex items-center px-5 py-3 rounded-2xl bg-primary1">
                        <div>
                            <span>...</span>
                        </div>
                        <div className="max-w-[300px]">
                            <h3 className="w">All in one app.</h3>
                            <span className="">Add a community to your course, helpp your students connect</span>
                        </div>
                    </div>
                </div>
                <img src={LoadedImage(WelcomeImg)} alt="welcome image" className="w-[500px]" />
            </div>
        </section>
    );
}

export default HomeWelcome;
