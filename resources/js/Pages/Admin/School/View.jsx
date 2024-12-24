import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AdminAuthLayout from "@/Layouts/AdminAuthLayout";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ success, links, school, queryParams = null }) {


	return (
		<AdminAuthLayout header={
			<h2 className="text-xl font-semibold leading-tight text-gray-800">
				School Details: <span className="text-violet-700">{school.data.school_name}</span>
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
			{/* school address and basic details */}
			<div className="py-6">
				<div className="mx-auto max-w-full sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg grid grid-cols-1 md:grid-cols-2">
						{/* School Address */}
						<div className="border-r">
							<div className="sm:px-6 py-3 px-4 bg-gray-50  font-medium">
								<p className="text-md leading-6 max-w-3xl mt-1">
									School Address
								</p>
							</div>
							<div className="border-t border-gray-200 pb-4">
								<dl>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											School ID:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
											{school.data.school_uuid}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											School Name:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
											{school.data.school_name}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											School Address:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
											{school.data.school_address_line_1},{" "}
											{school.data.school_area},
											<br />
											{school.data.school_district},{" "}
											{school.data.school_state} -{" "}
											{school.data.school_pincode}
											<br />
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Board:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
											{school.data.school_board}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Verified School Email:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
											{school.data.school_email}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50 md:border-none sm:border-b">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Verified School Mobile:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
											{school.data.school_mobile}
										</dd>
									</div>

								</dl>
							</div>
						</div>
						{/* school Incharge Details */}
						<div className="">
							<div className="sm:px-6 py-3 px-4 bg-gray-50  font-medium">
								<p className="text-md leading-6 max-w-3xl mt-1">
									School Incharge and Principal Contact
								</p>
							</div>
							<div className="border-t border-gray-200 pb-4">
								<dl>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Incharge Name:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
											{school.data.incharge_name}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Incharge Email ID:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
											{school.data.incharge_email}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50 border-b">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Incharge Mobile Number:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
											{school.data.incharge_mobile}
										</dd>
									</div>

									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Principal Name:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
											{school.data.principal_name}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Principal Email:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
											{school.data.principal_email}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Principal Mobile Number:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
											{school.data.principal_mobile}
										</dd>
									</div>
								</dl>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* school statistics */}
			<div className="pb-6">
				<div className="mx-auto max-w-full sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* total Registered Students */}
						<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
							<div className="sm:px-6 py-3 px-4 bg-gray-50 font-medium border-b">
								<p className="text-md leading-6 max-w-3xl mt-1 text-center">
									Total Students Registered
								</p>
							</div>
							<dl className="lg:grid-cols-3 grid grid-cols-1 overflow-hidden">
								<div className="">
									<div className="flex justify-center items-center flex-col py-4">
										<dt className="text-gray-900 font-normal text-base leading-6">
											Junior Students
										</dt>
										<dd className="flex-col flex justify-between items-center mt-1">
											<div className="font-medium text-xl leading-8">
												500
											</div>
											<div className="font-medium text-md leading-8">
												<span>320</span>
												<span> | </span>
												<span>180</span>
											</div>
										</dd>
									</div>
									<div className="bg-violet-100 px-4 lg:px-6 py-2">
										<Link
											href={route("school.studentList", { category: "Junior" })}
											className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
										>
											View List
										</Link>
									</div>
								</div>
								<div className="border-x">
									<div className="flex justify-center items-center flex-col py-4">
										<dt className="text-gray-900 font-normal text-base leading-6">
											Junior Students
										</dt>
										<dd className="lg:flex md:block flex justify-between items-baseline mt-1">
											<div className="font-medium text-xl leading-8 flex items-baseline">
												500/50
											</div>
										</dd>
									</div>
									<div className="bg-violet-100 px-4 lg:px-6 py-2">
										<Link
											href={route("school.studentList", { category: "Junior" })}
											className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
										>
											View List
										</Link>
									</div>
								</div>
								<div className="">
									<div className="flex justify-center items-center flex-col py-4">
										<dt className="text-gray-900 font-normal text-base leading-6">
											Junior Students
										</dt>
										<dd className="lg:flex md:block flex justify-between items-baseline mt-1">
											<div className="font-medium text-xl leading-8 flex items-baseline">
												500/50
											</div>
										</dd>
									</div>
									<div className="bg-violet-100 px-4 lg:px-6 py-2">
										<Link
											href={route("school.studentList", { category: "Junior" })}
											className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
										>
											View List
										</Link>
									</div>
								</div>
							</dl>
						</div>
						{/* Total Students Attempted the exam */}
						<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
							<div className="sm:px-6 py-3 px-4 bg-gray-50 font-medium border-b">
								<p className="text-md leading-6 max-w-3xl mt-1 text-center">
									Students Attempted NFLAT
								</p>
							</div>
							<dl className="lg:grid-cols-3 grid grid-cols-1 overflow-hidden">
								<div className="">
									<div className="flex justify-center items-center flex-col py-4">
										<dt className="text-gray-900 font-normal text-base leading-6">
											Junior Students
										</dt>
										<dd className="lg:flex md:block flex justify-between items-baseline mt-1">
											<div className="font-medium text-xl leading-8 flex items-baseline">
												500/50
											</div>
										</dd>
									</div>
									<div className="bg-violet-100 px-4 lg:px-6 py-2">
										<Link
											href={route("school.studentList", { category: "Junior" })}
											className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
										>
											View List
										</Link>
									</div>
								</div>
								<div className="border-x">
									<div className="flex justify-center items-center flex-col py-4">
										<dt className="text-gray-900 font-normal text-base leading-6">
											Junior Students
										</dt>
										<dd className="lg:flex md:block flex justify-between items-baseline mt-1">
											<div className="font-medium text-xl leading-8 flex items-baseline">
												500/50
											</div>
										</dd>
									</div>
									<div className="bg-violet-100 px-4 lg:px-6 py-2">
										<Link
											href={route("school.studentList", { category: "Junior" })}
											className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
										>
											View List
										</Link>
									</div>
								</div>
								<div className="">
									<div className="flex justify-center items-center flex-col py-4">
										<dt className="text-gray-900 font-normal text-base leading-6">
											Junior Students
										</dt>
										<dd className="lg:flex md:block flex justify-between items-baseline mt-1">
											<div className="font-medium text-xl leading-8 flex items-baseline">
												500/50
											</div>
										</dd>
									</div>
									<div className="bg-violet-100 px-4 lg:px-6 py-2">
										<Link
											href={route("school.studentList", { category: "Junior" })}
											className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
										>
											View List
										</Link>
									</div>
								</div>
							</dl>
						</div>
					</div>

				</div>
			</div>

			<div className="pb-6">
				<div className="mx-auto max-w-full sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-gray-200">
						<div className="p-6 text-gray-900 border-b">
							<h3 className="text-lg font-medium mb-2">Search School:</h3>
							{/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
							</div> */}
						</div>
						<div className="p-4 lg:p-6">


						</div >
					</div >
				</div >
			</div >

		</AdminAuthLayout >
	);
}
