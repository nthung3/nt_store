import React from 'react';

interface Props {
    children: JSX.Element | string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | any;
    props?: any;
}
function PrimaryButton({ children, onClick, ...props }: Props) {
    return (
        <button
            className="overflow-hidden cursor-pointer px-[27px] text-[18px] py-2  bg-primary text-white rounded-full text-center active:scale-95 active:bg-red-600"
            {...props}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default PrimaryButton;
