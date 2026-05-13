type Props = {
    type?: "submit" | "reset" | "button";
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
};

function Button({ onClick, className, children, disabled, type }: Props) {
    return (
        <button onClick={onClick} className={className} disabled={disabled} type={type}>
            {children}
        </button>
    );
}

export default Button;