export default function SecondaryButton({
	type = "button",
	className = "",
	disabled,
	children,
	...props
}) {
	return (
		<button
			{...props}
			type={type}
			className={
				`inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-xs font-semibold uppercase tracking-widest shadow-sm transition duration-150 ease-in-out focus:outline-none disabled:opacity-25 ${
					disabled && "opacity-25"
				} ` + className
			}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
