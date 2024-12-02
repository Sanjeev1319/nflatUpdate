export default function InputLabel({
	value,
	className = "",
	children,
	important = true,
	...props
}) {
	return (
		<label
			{...props}
			className={`block text-md text-gray-900 font-semibold ` + className}
		>
			{value ? value : children}
			{important && <span className="font-bold text-red-500"> *</span>}
		</label>
	);
}
