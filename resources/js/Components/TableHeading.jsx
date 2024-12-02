import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export default function TableHeading({
	name,
	sortable = true,
	sort_field = null,
	sort_direction = null,
	sortChanged = () => {},
	children,
}) {
	return (
		<th
			onClick={(e) => sortChanged(name)}
			className="text-gray-900 font-semibold text-sm leading-5 text-left pt-3.5 pb-3.5 pl-3 pr-3"
		>
			<div className="flex items-center justify-between gap-1">{children}</div>
		</th>
	);
}
