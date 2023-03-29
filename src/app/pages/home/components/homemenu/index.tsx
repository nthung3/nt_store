import { SecondaryButton } from '@/core/components/buttons';
import ProductItems from '@/core/components/productItem';
import React from 'react';

function HomeMenu() {
    return (
        <section className="HomeMenu xl:mt-40 bg-primary1 w-full text-center pb-16">
            <div className="pt-9 md:pt-[75px]">
                <h1 className="md:text-4xl xl:text-6xl font-semibold text-textPrimary mb-5">Our Popular Menu</h1>
                <p className="mb-8 max-w-lg mx-auto font-normal text-textGray">
                    From your neighborhood sushi spot to the burger and fries you crave
                </p>
                <div className="flex justify-center items-center flex-wrap gap-4 mb-14">
                    <SecondaryButton>All</SecondaryButton>
                    <SecondaryButton>Breakfast</SecondaryButton>
                    <SecondaryButton>Launch</SecondaryButton>
                    <SecondaryButton>Dinner</SecondaryButton>
                    <SecondaryButton>Desserts</SecondaryButton>
                    <SecondaryButton>Beverage</SecondaryButton>
                </div>
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7 container mx-auto pb-3 p-3">
                    {Array(6)
                        .fill(0)
                        .map((value, index) => (
                            <ProductItems key={index} />
                        ))}
                </div>
            </div>
        </section>
    );
}

export default HomeMenu;
