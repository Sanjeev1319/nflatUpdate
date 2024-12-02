import ExamComplete from "@/Components/ExamComplete";
import Instructions from "@/Components/Instructions";
import StudentDetails from "@/Components/StudentDetails";
import ExamScreenLayout from "@/Layouts/ExamScreenLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Index({
	studentData,
	allowAttempt,
	error,
	examComplete,
}) {
	return (
		<ExamScreenLayout
			pageScreen={
				<>
					<h2 className="text-xl font-semibold leading-tight text-gray-800">
						NFLAT Exam
					</h2>
				</>
			}
		>
			<Head title="Instructions" />
			{error && (
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
										{error}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<StudentDetails studentData={studentData} />

			{/* Conditional rendering based on examComplete */}
			<div className="mt-6">
				{examComplete === null ? (
					<Instructions studentData={studentData} allowAttempt={allowAttempt} />
				) : examComplete === "yes" ? (
					<ExamComplete />
				) : (
					<p>Something is wrong. contact Administrator</p>
				)}
			</div>
		</ExamScreenLayout>
	);
}
