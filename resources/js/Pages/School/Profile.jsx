import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ success, school }) {
	return (
		<AuthenticatedLayout
			header={
				<h2 className="text-xl font-semibold leading-tight text-gray-800">
					School Profile
				</h2>
			}
		>
			<Head title="School Profile" />

			{success && (
				<div className="pt-6">
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
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="">
						<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg ring-1 ring-gray-300">
							<div className="sm:px-6 py-3 px-4 bg-gray-100 flex justify-between items-center">
								<h3 className="text-gray-900 font-semibold text-base leading-5">
									School Details
								</h3>
								<div className="text-right">
									<Link
										className="inline-flex items-center rounded-md border border-transparent bg-indigo-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-900"
										href={route("school.profileEdit")}
									>
										Edit
									</Link>
								</div>
							</div>
							<div className="border-t border-gray-200 pb-4">
								<dl>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium leading-5">
											School ID:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 font-bold">
											{school.school_uuid}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											School Name:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
											{school.school_name}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											School Address:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
											{school.school_address_line_1}, {school.school_area}
											<br />
											{school.school_district}, {school.school_state} -{" "}
											{school.school_pincode}
											<br />
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											School Email:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
											{school.school_email}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											School Mobile Number:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
											{school.school_mobile}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Incharge Name:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
											{school.incharge_name}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Incharge Email:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
											{school.incharge_email}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Incharge Mobile:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
											{school.incharge_mobile}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Principal Name:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
											{school.principal_name}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Principal Mobile:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
											{school.principal_mobile}
										</dd>
									</div>
									<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
										<dt className="text-gray-900 font-medium text-sm leading-5">
											Principal Email:
										</dt>
										<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
											{school.principal_email}
										</dd>
									</div>
								</dl>
							</div>
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
