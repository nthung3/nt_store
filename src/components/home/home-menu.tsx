'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getRecommendProducts } from '@/lib/features/product/product-slice';
import { SecondaryButton } from '@/components/buttons/secondary-button';
import ProductItems from '@/components/product/product-item';

export default function HomeMenu(): JSX.Element {
    const dispatch = useAppDispatch();
    const product = useAppSelector((state) => state.product);

    useEffect(() => {
        dispatch(getRecommendProducts());
    }, [dispatch]);

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
                    {product.loading ? (
                        <p>Loading...</p>
                    ) : (
                        product.result.map((value, index) => <ProductItems key={index} data={value} />)
                    )}
                </div>
            </div>
        </section>
    );
}
