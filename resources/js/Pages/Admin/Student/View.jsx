import SchoolDetails from "@/Components/Admin/SchoolDetails";
import AdminAuthLayout from "@/Layouts/AdminAuthLayout";
import { Head } from "@inertiajs/react";

export default function View({ student, quiz_logs, success }) {
	return (
		<AdminAuthLayout
			header={
				<h2 className="text-xl font-semibold leading-tight text-gray-800">
					Student Details:{" "}
					<span className="text-violet-700">{student.data.student_uuid} - {student.data.student_name}</span>
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

			{/* school address and basic details */}
			<SchoolDetails schoolData={student.data.school_uuid} />

			<div className="py-6">
				<div className="mx-auto max-w-full sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow sm:rounded-lg border border-gray-300">
						<div className="sm:px-6 py-3 px-4 bg-gray-50 font-medium border-b">
							<p className="text-md leading-6 max-w-full mt-1 text-center">
								Students List
							</p>
						</div>
						<div className="p-4 lg:p-6">
							<pre>{JSON.stringify(student, undefined, 2)}</pre>
						</div>
					</div>
				</div>
			</div>
		</AdminAuthLayout>

	)
}
