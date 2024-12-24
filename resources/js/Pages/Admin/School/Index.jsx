import SchoolTable from "@/Components/Admin/SchoolTable";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AdminAuthLayout from "@/Layouts/AdminAuthLayout";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { Head, Link, router } from "@inertiajs/react";
import { School } from "@mui/icons-material";
import { useState } from "react";

export default function Dashboard({ success, links, school, queryParams = null, statesList }) {
	queryParams = queryParams || {};

	// Define state for filters
	const [contact, setContact] = useState(queryParams.contact || "");
	const [state, setState] = useState(queryParams.state || "");
	const [name, setName] = useState(queryParams.name || "");
	const [uuid, setUuid] = useState(queryParams.uuid || "");

	const searchFieldChanged = (name, value) => {
		if (value) {
			queryParams[name] = value;
		} else {
			delete queryParams[name];
		}

		router.get(route("cpanel.school"), queryParams);
	};

	const onKeyPress = (name, e) => {
		if (e.key !== "Enter") return;

		searchFieldChanged(name, e.target.value);
	};

	// Function to generate the export URL with query parameters
	const generateUrl = () => {
		const params = new URLSearchParams();
		if (contact) params.append("contact", contact);
		if (state) params.append("state", state);
		if (name) params.append("name", name);
		if (uuid) params.append("uuid", uuid);

		// Construct the full URL with query parameters
		return `${route("cpanel.schoolExport")}?${params.toString()}`;
	};

	// Handle filter change dynamically (optional)
	const handleFilterChange = (filterName, value) => {
		if (filterName === "contact") {
			setContact(value);
		} else if (filterName === "state") {
			setState(value);
		} else if (filterName === "name") {
			setName(value);
		} else if (filterName === "uuid") {
			setUuid(value);
		}
	};

	return (
		<AdminAuthLayout header={
			<h2 className="text-xl font-semibold leading-tight text-gray-800">
				School List
			</h2>
		}
		>

			<Head title="Admin Dashboard" />

			{success && (
				<div className="pt-6">
					<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="overflow-hidden shadow-sm sm:rounded-lg">
							<div className="bg-indigo-900 text-center py-4 lg:px-4">
								<div
									className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
									role="alert">
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

			<div className="py-6">
				<div className="mx-auto max-w-full sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-gray-200">
						<div className="p-6 text-gray-900 border-b">
							<h3 className="text-lg font-medium mb-2">Search School:</h3>
							<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
								<TextInput
									placeholder="School UUID"
									defaultValue={queryParams.uuid}
									onBlur={(e) => [
										searchFieldChanged("uuid", e.target.value),
										handleFilterChange("uuid", e.target.value),
									]}
									onKeyPress={(e) => onKeyPress("uuid", e)}
								/>
								<TextInput
									placeholder="School Name"
									defaultValue={queryParams.name}
									onBlur={(e) => [
										searchFieldChanged("name", e.target.value),
										handleFilterChange("name", e.target.value),
									]}
									onKeyPress={(e) => onKeyPress("name", e)}
								/>
								<TextInput
									placeholder="Contact Number"
									defaultValue={queryParams.contact}
									onBlur={(e) => [
										searchFieldChanged("contact", e.target.value),
										handleFilterChange("contact", e.target.value),
									]}
									onKeyPress={(e) => onKeyPress("contact", e)}
								/>
								<SelectInput
									onChange={(e) => [
										searchFieldChanged("state", e.target.value),
										handleFilterChange("state", e.target.value),
									]}
									defaultValue={queryParams.state}
								>
									<option value={""}>Select State</option>
									{statesList.map((state) => (
										<option value={state} key={state}>{state}</option>
									))}

								</SelectInput>

								<div className="flex gap-3 justify-between">
									<Link
										href={route("cpanel.school")}
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
						<div className="p-4 lg:p-6">
							<SchoolTable schoolData={school} />
							{/* <pre>{JSON.stringify(school, undefined, 2)}</pre> */}

						</div >
					</div >
				</div >
			</div >

		</AdminAuthLayout >
	);
}
