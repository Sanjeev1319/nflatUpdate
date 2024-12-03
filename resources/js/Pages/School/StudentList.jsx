import DataTable from "@/Components/DataTable";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function StudentList({
	success,
	students,
	studentCount,
	queryParams = null,
}) {
	queryParams = queryParams || {};

	// Define state for filters
	const [category, setCategory] = useState(queryParams.category || "");
	const [classLevel, setClassLevel] = useState(queryParams.class || "");
	const [name, setName] = useState(queryParams.name || "");

	const searchFieldChanged = (name, value) => {
		if (value) {
			queryParams[name] = value;
		} else {
			delete queryParams[name];
		}

		router.get(route("school.studentList"), queryParams);
	};

	const onKeyPress = (name, e) => {
		if (e.key !== "Enter") return;

		searchFieldChanged(name, e.target.value);
	};

	// Function to generate the export URL with query parameters
	const generateUrl = () => {
		const params = new URLSearchParams();
		if (category) params.append("category", category);
		if (classLevel) params.append("class", classLevel);
		if (name) params.append("name", name);

		// Construct the full URL with query parameters
		return `${route("school.studentExport")}?${params.toString()}`;
	};

	// Handle filter change dynamically (optional)
	const handleFilterChange = (filterName, value) => {
		if (filterName === "category") {
			setCategory(value);
		} else if (filterName === "class") {
			setClassLevel(value);
		} else if (filterName === "name") {
			setName(value);
		}
	};

	return (
		<AuthenticatedLayout
			header={
				<h2 className="text-xl font-semibold leading-tight text-gray-800">
					List of Enrolled Students
				</h2>
			}
		>
			<Head title="Student List" />

			{success && (
				<div className="pt-12">
					<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="overflow-hidden shadow-sm sm:rounded-lg">
							<div className="bg-indigo-900 text-center py-4 lg:px-4">
								<div
									className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
									role="alert"
								>
									<span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
										New
									</span>
									<span className="font-semibold mr-2 text-left flex-auto">
										{success}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900 border-b">
							<h3 className="text-lg font-medium mb-2">Student Search:</h3>
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
								<TextInput
									placeholder="Search Name"
									defaultValue={queryParams.name}
									onBlur={(e) => [
										searchFieldChanged("name", e.target.value),
										handleFilterChange("name", e.target.value),
									]}
									onKeyPress={(e) => onKeyPress("name", e)}
								/>
								<SelectInput
									onChange={(e) => [
										searchFieldChanged("class", e.target.value),
										handleFilterChange("class", e.target.value),
									]}
									defaultValue={queryParams.class}
								>
									<option value={""}>Search Class</option>
									<option value={"6"}>6</option>
									<option value={"7"}>7</option>
									<option value={"8"}>8</option>
									<option value={"9"}>9</option>
									<option value={"10"}>10</option>
									<option value={"11"}>11</option>
									<option value={"12"}>12</option>
								</SelectInput>
								<SelectInput
									onChange={(e) => [
										searchFieldChanged("category", e.target.value),
										handleFilterChange("category", e.target.value),
									]}
									defaultValue={queryParams.category}
								>
									<option value={""}>Search NFLAT Category</option>
									<option value={"Junior"}>Junior</option>
									<option value={"Intermediate"}>Intermediate</option>
									<option value={"Senior"}>Senior</option>
								</SelectInput>
								<div className="flex gap-3 justify-between">
									<Link
										href={route("school.studentList")}
										className="inline-flex justify-center w-2/4 items-center rounded-md border border-transparent bg-indigo-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-900"
									>
										Clear Search
									</Link>
									<a
										href={generateUrl()}
										className="inline-flex justify-center items-center rounded-md border border-transparent bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-black transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-indigo-700 focus:outline-none hover:text-white active:bg-indigo-900"
									>
										<ArrowDownTrayIcon className="h-4 pe-2" />
										Export
									</a>
								</div>
							</div>
						</div>

						<div className="p-6 text-gray-900">
							{/* {JSON.stringify(students, null, 2)} */}
							<DataTable tableValues={students} count={studentCount} />
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
