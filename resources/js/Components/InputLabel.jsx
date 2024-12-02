export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-md text-gray-900 font-semibold` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
