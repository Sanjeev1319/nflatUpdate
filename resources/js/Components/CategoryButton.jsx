export default function CategoryButton({
	className = "",
	disabled,
	children,
	type = "button",
	...props
}) {
	return (
		<button
			type={type}
			{...props}
			className={
				`inline-flex items-center border border-transparent px-4 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-150 ease-in-out ${
					disabled && "opacity-25"
				} ` + className
			}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
