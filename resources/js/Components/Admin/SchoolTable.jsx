import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import TableHeading from "../TableHeading";
import AdminPagination from "./AdminPagination";

export default function SchoolTable({ schoolData }) {
	// Track the current page and items per page
	const [page, setPage] = useState(null);
	const itemsPerPage = 20; // Set the number of items per page

	useEffect(() => {
		// Get the query string from the URL
		const queryParams = new URLSearchParams(window.location.search);

		// Check for the "page" parameter
		const pageParam = queryParams.get("page");

		// Set the page parameter in the state
		setPage(pageParam);
	}, []);

	// Calculate the starting index based on the current page
	const startingIndex = page ? (parseInt(page, 10) - 1) * itemsPerPage + 1 : 1;

	return (
		<>
			<div className="overflow-auto rounded-lg border">
				<table className="w-full text-left text-gray-700 dark:text-slate-400 text-sm">
					<thead className="bg-gray-50 border-b-2">
						<tr className="text-nowrap text-xs">
							<TableHeading name="">#</TableHeading>
							<TableHeading name="">School UUID</TableHeading>
							<TableHeading name="">School Name</TableHeading>
							<TableHeading name="">School State / District</TableHeading>
							<TableHeading name="">School Incharge</TableHeading>
							<TableHeading name="">School Principal</TableHeading>
						</tr >
					</thead >
					<tbody className="">
						{schoolData.schoolList.data.map((school, index) => (
							<tr key={school.id} className=" border-b hover:bg-gray-50">
								<td className="px-3 py-3">{startingIndex + index}</td>
								<td className="px-3 py-3">{school.school_uuid}</td>
								<td className="px-3 py-3"><span className="font-semibold text-violet-700">{school.school_name}</span><br />{school.school_email}<br />{school.school_mobile}</td>
								<td className="px-3 py-3">{school.school_district}<br />{school.school_state}</td>
								<td className="px-3 py-3">{school.incharge_name}<br />{school.incharge_email}<br />{school.incharge_mobile}</td>
								<td className="px-3 py-3">{school.principal_name}<br />{school.principal_email}<br />{school.principal_mobile}</td>
							</tr>
						))}
					</tbody>
				</table>
				{/* {typeof schoolData.schoolList.total} */}

			</div>
			<AdminPagination links={schoolData.schoolList.links} count={schoolData.schoolList.total} />
		</>
	)

}
