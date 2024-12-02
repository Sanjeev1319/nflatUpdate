import {
	ArrowLongLeftIcon,
	ArrowLongRightIcon,
} from "@heroicons/react/24/solid";
import { Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Pagination({ links, count }) {
	const [page, setPage] = useState(1); // Default to page 1
	const [startIndex, setStartIndex] = useState(1);
	const [endIndex, setEndIndex] = useState(20);
	const totalItems = count; // Assuming you know total number of items

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const pageParam = queryParams.get("page");
		const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
		setPage(currentPage);

		// Calculate the start and end indices for the current page
		const itemsPerPage = 20;
		const start = (currentPage - 1) * itemsPerPage + 1;
		const end = Math.min(currentPage * itemsPerPage, totalItems);

		setStartIndex(start);
		setEndIndex(end);
	}, [window.location.search]);

	return (
		<>
			<div className="pt-8 pb-8 mx-auto">
				<nav className="sm:px-0 px-4 border-gray-200 border-t justify-between items-center flex">
					<div className="flex-1 w-0 flex -mt-px ">
						{links[0].url ? (
							<Link
								preserveScroll
								href={links[0].url}
								className="hover:text-[#374151] hover:border-[#d1d5db] text-[#6b7280] font-medium leading-5 pt-4 pl-1 border-transparent border-t-2 items-center inline-flex"
							>
								<ArrowLongLeftIcon className="h-5 pe-2" /> Previous
							</Link>
						) : (
							<div className="!text-gray-500 cursor-not-allowed leading-5 pt-4 flex">
								<ArrowLongLeftIcon className="h-5 pe-2" /> Previous
							</div>
						)}
					</div>
					<div class="md:flex md:mt-[-1px] hidden">
						{links.slice(1, links.length - 1).map((link) => (
							<Link
								preserveScroll
								href={link.url || ""}
								key={link.label}
								className={
									"font-medium leading-5 pt-4 border-transparent border-t-2 items-center inline-flex px-4 " +
									(link.active
										? " text-indigo-700 font-semibold border-indigo-700 border-t-2 "
										: " text-[#6b7280] ") +
									(!link.url
										? "!text-gray-500 cursor-not-allowed "
										: " hover:text-[#374151] hover:border-[#d1d5db]  ")
								}
								dangerouslySetInnerHTML={{ __html: link.label }}
							></Link>
						))}
					</div>

					<div className="justify-end flex-1 w-0 flex mt-[-1px]">
						{links[links.length - 1].url ? (
							<Link
								preserveScroll
								href={links[links.length - 1].url}
								className="hover:text-[#374151] hover:border-[#d1d5db] text-[#6b7280] font-medium leading-5 pt-4 pr-1 border-transparent border-t-2 items-center inline-flex"
							>
								Next <ArrowLongRightIcon className="h-5 ps-2" />
							</Link>
						) : (
							<div className="!text-gray-500 cursor-not-allowed leading-5 pt-4 flex">
								Next <ArrowLongRightIcon className="h-5 ps-2" />
							</div>
						)}
					</div>
					{/* {links.length} */}
					{/* <pre>{JSON.stringify(links, undefined, 2)}</pre> */}
				</nav>
			</div>
		</>
	);
}
