import React from 'react';
import WelcomeImg from '@/utils/assets/images/Group 62.png';
function HomeWelcome() {
    return (
        <section className="HomeWelcome pt-20 pb-4 bg-white">
            <div className="mt-0 md:mt-20 container mx-auto flex flex-col-reverse md:flex-row justify-between items-center">
                <div className="text-center md:text-left md:w-1/2">
                    <h1 className="md:text-4xl xl:text-6xl pr-10 py-4 font-semibold text-textPrimary">
                        Every Flavour Welcome
                    </h1>
                    <p className="font-normal text-xl text-textGray py-4">
                        From your neighborhood sushi spot to the burger and fries you crave, choose from over 300,000
                        local and national
                    </p>
                    <div className="inline-flex py-3 px-5 items-center rounded-2xl bg-primary1">
                        <div>
                            <span>...</span>
                        </div>
                        <div className="max-w-[300px]">
                            <h3 className="w">All in one app.</h3>
                            <span className="">Add a community to your course, helpp your students connect</span>
                        </div>
                    </div>
                </div>
                <img src={WelcomeImg} alt="welcome image" className="w-[500px]" />
            </div>
        </section>
    );
}

export default HomeWelcome;
