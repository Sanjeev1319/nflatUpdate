export default function ExamButton({
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
				`inline-flex items-center rounded-md border border-transparent bg-indigo-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out focus:outline-none  ${
					disabled && "opacity-25"
				} ` + className
			}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
