import React from 'react';

type InputProps = {
    type?: string;
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ type, className, placeholder, value, onChange, name, onKeyDown }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChange}
                className={className}
                placeholder={placeholder}
                name={name}
                onKeyDown={onKeyDown}
            />
        );
    }
);

Input.displayName = 'Input';

export default Input;