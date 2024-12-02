import DataTable from "@/Components/DataTable";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function StudentList({
	success,
	students,
	studentCount,
	queryParams = null,
}) {
	queryParams = queryParams || {};

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

	return (
		<AuthenticatedLayout
			header={
				<h2 className="text-xl font-semibold leading-tight text-gray-800">
					List of Enrolled Students
				</h2>
			}
		>
			<Head title="Dashboard" />

			{success && (
				<div className="pt-12">
					<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div className="overflow-hidden shadow-sm sm:rounded-lg">
							<div class="bg-indigo-900 text-center py-4 lg:px-4">
								<div
									class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
									role="alert"
								>
									<span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
										New
									</span>
									<span class="font-semibold mr-2 text-left flex-auto">
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
									onBlur={(e) => searchFieldChanged("name", e.target.value)}
									onKeyPress={(e) => onKeyPress("name", e)}
								/>
								<SelectInput
									onChange={(e) => searchFieldChanged("class", e.target.value)}
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
									onChange={(e) =>
										searchFieldChanged("category", e.target.value)
									}
									defaultValue={queryParams.category}
								>
									<option value={""}>Search NFLAT Category</option>
									<option value={"Junior"}>Junior</option>
									<option value={"Intermediate"}>Intermediate</option>
									<option value={"Senior"}>Senior</option>
								</SelectInput>
								<Link
									href={route("school.studentList")}
									className="inline-flex justify-center w-2/4 items-center rounded-md border border-transparent bg-indigo-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-900"
								>
									Clear Search
								</Link>
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
