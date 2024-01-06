import { LabelHTMLAttributes } from 'react';

export default function InputLabel({ value, className = '', children, ...props }: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label {...props} className={`mb-2 block font-medium text-sm text-gray-700 ` + className}>
            {value ? value : children}
        </label>
    );
}
