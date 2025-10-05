'use client';

interface PrimaryButtonProps {
    children: JSX.Element | string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    [key: string]: any;
}

export default function PrimaryButton({ children, onClick, ...props }: PrimaryButtonProps): JSX.Element {
    return (
        <button
            className="overflow-hidden cursor-pointer px-[27px] text-[18px] py-2 bg-primary text-white rounded-full text-center active:scale-95 active:bg-red-600"
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
}
