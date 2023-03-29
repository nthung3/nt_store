import React from 'react';

function Footer() {
    return (
        <div className="container mx-auto mt-10">
            <div className="py-10 grid grid-cols-1 md:grid-cols-2 justify-between gap-10">
                <div className="text-lg text-gray-300 pr-10 text-left mr-10">
                    <span className="text-textPrimary font-semibold text-xl">Food Craft\ </span>From your neighber sushi
                    spot to the food you crave, choose from over 300k+ local and national favourites acroa the U.S
                    Canada and Australia.
                </div>
                <div className="flex justify-between">
                    <div className="text-left">
                        <p className="text-xl text-textPrimary font-semibold">Support</p>
                        <div className="mt-4">
                            Acoount
                            <br />
                            Support center <br />
                            Feedback <br />
                            Accecibility <br />
                        </div>
                    </div>
                    <div className="text-left">
                        <p className="text-xl text-textPrimary font-semibold">Our Menu</p>
                        <div className="mt-4">
                            Special
                            <br />
                            Popular <br />
                            Categories <br />
                        </div>
                    </div>
                    <div className="text-left">
                        <p className="text-xl text-textPrimary font-semibold">Useful Links</p>
                        <div className="mt-4">
                            Payment & Tax
                            <br />
                            Terms of Service <br />
                            Privacy Policy <br />
                            About Us <br />
                        </div>
                    </div>
                </div>
            </div>
            <p className="font-semibold text-textPrimary text-xl p-3">
                &copy; 2023 <span className="italic">nthung3@tma.com.vn</span>
            </p>
        </div>
    );
}

export default Footer;
