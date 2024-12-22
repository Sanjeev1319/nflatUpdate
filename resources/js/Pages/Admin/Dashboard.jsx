import AdminAuthLayout from "@/Layouts/AdminAuthLayout";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ success, links, data }) {
	return (
		<AdminAuthLayout
			header={
				<h2 className="text-xl font-semibold leading-tight text-gray-800">
					Dashboard
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

			<div className="py-6">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="lg:grid-cols-5 gap-6 grid grid-cols-1 overflow-hidden">
						<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg lg:col-span-2">
							<dl className="lg:grid-cols-2 grid grid-cols-1 overflow-hidden">
								<div>
									<div className="lg:p-6 p-4">
										<dt className="text-gray-900 font-normal text-base leading-6">
											Total Schools Registered
										</dt>
										<dd className="lg:flex md:block flex justify-between items-baseline mt-1">
											<div className="text-indigo-600 font-semibold text-2xl leading-8 flex items-baseline">
												{data.schoolCount}
											</div>
										</dd>
									</div>
									<div className="bg-indigo-100 px-4 lg:px-6 py-2">
										<Link
											href={route("school.studentList", { category: "Junior" })}
											className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
										>
											View All
										</Link>
									</div>
								</div>
								<div className="border-gray-300 border-s">
									<div className="lg:p-6 p-4 pt-5 pb-5 pl-4 pr-4">
										<dt className="text-gray-900 font-normal text-base leading-6">
											Total Students Registered
										</dt>
										<dd className="lg:flex md:block flex justify-between items-baseline mt-1">
											<div className="text-indigo-600 font-semibold text-2xl leading-8 flex items-baseline">
												{data.studentCount}
											</div>
										</dd>
									</div>
									<div className="bg-indigo-100 px-4 lg:px-6 py-2">
										<Link
											href={route("school.studentList", {
												category: "Intermediate",
											})}
											className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
										>
											View All
										</Link>
									</div>
								</div>
							</dl>
						</div>
						<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg lg:col-span-3">
							<dl className="lg:grid-cols-3 grid grid-cols-1 overflow-hidden">
								<div>
									<div className="lg:p-6 p-4">
										<dt className="text-gray-900 font-normal text-base leading-6">
											Junior Students
										</dt>
										<dd className="lg:flex md:block flex justify-between items-baseline mt-1">
											<div className="text-indigo-600 font-semibold text-2xl leading-8 flex items-baseline">
												{data.jrStudentCount} / {data.jrSchoolCount}
											</div>
										</dd>
									</div>
									<div className="bg-indigo-100 px-4 lg:px-6 py-2">
										<Link
											href={route("school.studentList", { category: "Junior" })}
											className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
										>
											View All
										</Link>
									</div>
								</div>
								<div className="border-gray-300 border-x">
									<div className="lg:p-6 p-4 pt-5 pb-5 pl-4 pr-4">
										<dt className="text-gray-900 font-normal text-base leading-6">
											Intermediate Students
										</dt>
										<dd className="lg:flex md:block flex justify-between items-baseline mt-1">
											<div className="text-indigo-600 font-semibold text-2xl leading-8 flex items-baseline">
												{data.midStudentCount} / {data.midSchoolCount}
											</div>
										</dd>
									</div>
									<div className="bg-indigo-100 px-4 lg:px-6 py-2">
										<Link
											href={route("school.studentList", {
												category: "Intermediate",
											})}
											className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
										>
											View All
										</Link>
									</div>
								</div>
								<div>
									<div className="lg:p-6 p-4 pt-5 pb-5 pl-4 pr-4">
										<dt className="text-gray-900 font-normal text-base leading-6">
											Senior Students
										</dt>
										<dd className="lg:flex md:block flex justify-between items-baseline mt-1">
											<div className="text-indigo-600 font-semibold text-2xl leading-8 flex items-baseline">
												{data.srStudentCount} / {data.srSchoolCount}
											</div>
										</dd>
									</div>
									<div className="bg-indigo-100 px-4 lg:px-6 py-2">
										<Link
											href={route("school.studentList", { category: "Senior" })}
											className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
										>
											View All
										</Link>
									</div>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</AdminAuthLayout>
	);
}
