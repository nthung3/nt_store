import Image from 'next/image';
import WelcomeImg from '@/assets/images/Group 62.png';

export default function HomeWelcome(): JSX.Element {
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
                        <div className="max-w-[300px]">
                            <h3 className="font-semibold">All in one app.</h3>
                            <span className="text-sm">Add a community to your course, help your students connect</span>
                        </div>
                    </div>
                </div>
                <Image src={WelcomeImg} alt="Welcome" className="w-[500px]" width={500} height={500} />
            </div>
        </section>
    );
}
