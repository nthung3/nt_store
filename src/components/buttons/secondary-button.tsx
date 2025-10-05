'use client';

interface SecondaryButtonProps {
    children: JSX.Element | string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    [key: string]: any;
}

export function SecondaryButton({ children, onClick, ...props }: SecondaryButtonProps): JSX.Element {
    const className =
        'overflow-hidden font-semibold outline-none hover:border-primary border border-textGray cursor-pointer px-[22px] text-[18px] py-2 bg-transparent text-textGray hover:bg-primary hover:text-white rounded-[20px] text-center active:scale-95 active:bg-red-600';

    return (
        <button className={className} onClick={onClick} {...props}>
            {children}
        </button>
    );
}
