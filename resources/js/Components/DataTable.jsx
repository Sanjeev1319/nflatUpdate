import Pagination from "@/Components/Pagination";
import TableHeading from "@/Components/TableHeading";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function DataTable({ tableValues, count }) {
	const deleteStudent = (student) => {
		if (!window.confirm("Are you sure you want to delete the record?")) {
			return;
		}
		router.post(
			route("school.studentDestroy", {
				student: student.id,
			})
		);
	};

	const editStudent = (student) => {
		router.get(
			route("school.studentEdit", {
				student: student.id,
			})
		);
	};

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
							<TableHeading name={"id"}>#</TableHeading>
							<TableHeading name={"student_uuid"}>ID</TableHeading>
							<TableHeading name={"student_name"}>Name</TableHeading>
							<TableHeading name={"student_class"}>Class</TableHeading>
							<TableHeading name={"date_of_birth"}>Date of Birth</TableHeading>
							<TableHeading name={"gender"}>Gender</TableHeading>
							<TableHeading name={"parent_name"}>Parent Name</TableHeading>
							<TableHeading name={"parent_email_id"}>
								Parent's Contact
							</TableHeading>
							<TableHeading name={"password"}>Password</TableHeading>
							<th className="text-gray-900 font-semibold text-sm leading-5 text-left pt-3.5 pb-3.5 pl-3 pr-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody className="">
						{tableValues.data.length <= 0 && (
							<tr key="no" className="border-b hover:bg-violet-100">
								<td
									className="px-3 py-3 text-center font-medium text-base"
									colSpan="10"
								>
									No Records Found!
								</td>
							</tr>
						)}
						{tableValues.data.map((student, index) => (
							<tr key={student.id} className=" border-b hover:bg-violet-100">
								<td className="px-3 py-3">{startingIndex + index}</td>
								<td className="px-3 py-3">{student.student_uuid}</td>
								<td className="px-3 py-3">{student.student_name}</td>
								<td className="px-3 py-3">
									{student.student_class} - {student.student_section}
									<br />
									{student.nflat_category === "Junior" ? (
										<span class="inline-block bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
											{student.nflat_category}
										</span>
									) : student.nflat_category === "Intermediate" ? (
										<span class="inline-block bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
											{student.nflat_category}
										</span>
									) : student.nflat_category === "Senior" ? (
										<span class="inline-block bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
											{student.nflat_category}
										</span>
									) : (
										""
									)}
								</td>
								<td className="px-3 py-3">{student.date_of_birth}</td>
								<td className="px-3 py-3">{student.gender}</td>
								<td className="px-3 py-3">{student.parent_name}</td>
								<td className="px-3 py-3">
									{student.parent_email_id || " "}
									<br />
									{student.parent_mobile_number || " "}
								</td>
								<td className="px-3 py-3">{student.password}</td>
								<td className="text-center">
									<div className="flex flex-row items-center justify-center gap-2">
										<Link
											href={route("school.studentEdit", { edit: student.id })}
											className="p-2 text-indigo-700 rounded-md hover:shadow-sm hover:bg-indigo-700 transition-all hover:text-white"
										>
											<PencilSquareIcon className="h-6" />
										</Link>
										<button
											onClick={(e) => deleteStudent(student)}
											className="p-2 text-red-600 rounded-md hover:shadow-sm hover:bg-red-500 transition-all hover:text-white"
										>
											<TrashIcon className="h-5" />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{/* <pre>{JSON.stringify(tableValues, undefined, 2)}</pre> */}
			</div>
			{typeof tableValues.meta === "undefined" ||
			typeof tableValues.meta.links === "undefined" ? null : (
				<Pagination links={tableValues.meta.links} count={count} />
			)}
		</>
	);
}
