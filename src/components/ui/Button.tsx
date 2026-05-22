type Props = {
    type?: "submit" | "reset" | "button";
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    title?:string;
};

function Button({ onClick, className, children, disabled, type, title }: Props) {
    return (
        <button onClick={onClick} className={className} disabled={disabled} type={type} title={title}>
            {children}
        </button>
    );
}

export default Button;