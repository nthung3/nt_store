import Image from 'next/image';
import CustomerImg from '@/assets/images/Group 57.png';

export default function HomeCustomer(): JSX.Element {
    return (
        <section className="pt-20 pb-4 HomeWelcome">
            <div className="container flex flex-col-reverse items-center justify-between mx-auto mt-0 md:flex-row md:mt-20">
                <div className="max-w-xl pt-4 text-center md:text-left">
                    <h1 className="text-5xl font-semibold text-textPrimary">Our Lovely Customer Loves Our Food</h1>
                    <p className="py-4 mr-10 text-lg text-textGray">
                        &quot;Nemo Enim Ipsam Voluptatem Quia Voluptas Sit Aspernatur Aut Odit Aut Fugit, Sed Quia
                        Condectetur magni dolores eos qui ratione voluptatejn sequi nestuist, Lorem ipsum dolor sit
                        amet, Consectetur adipopscing elit, Sed do eisum temoor incididunt ut labore et dolore magna
                        aliquo!.&quot;
                    </p>
                    <div className="flex items-center justify-center md:justify-start">⭐⭐⭐⭐⭐</div>
                    <div className="flex items-center justify-between py-3 md:flex-col md:items-start">
                        <div>
                            <h3 className="text-2xl font-semibold text-textPrimary">Courtney Henry</h3>
                            <p className="text-lg text-textGray">Sylhet, Bangladesh</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button className="px-4 py-2 border rounded">Prev</button>
                            <button className="px-4 py-2 border rounded">Next</button>
                        </div>
                    </div>
                </div>
                <Image src={CustomerImg} alt="Customer" className="max-w-xl max-h-[600px]" width={600} height={600} />
            </div>
        </section>
    );
}
