import { useState, forwardRef } from 'react';

interface FormInputProps {
    id: string;
    label: string;
    type?: 'text' | 'email' | 'password' | 'tel';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
    autoComplete?: string;
    showPasswordToggle?: boolean;
}

/**
 * Optimized form input component with validation styling and password toggle
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
    { id, label, type = 'text', value, onChange, placeholder, error, disabled, required, autoComplete, showPasswordToggle = false },
    ref,
) {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPasswordToggle && showPassword ? 'text' : type;

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <input
                    ref={ref}
                    type={inputType}
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none transition-colors ${
                        error
                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-gray-300 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20'
                    } ${showPasswordToggle ? 'pr-10' : ''} disabled:opacity-60 disabled:cursor-not-allowed`}
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-primary"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
            {error && (
                <p id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
});
