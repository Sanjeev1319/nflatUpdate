import { router } from "@inertiajs/react";
import PrimaryButton from "../PrimaryButton";

export default function AdminStudentExamDetails({ examData, quizLogs, exportQuestionPaper }) {
	const score = examData?.data?.score || {};
	const quizData = quizLogs?.data || {};
	console.log(quizData.exam_time);

	const examDate = quizData.exam_time?.[0]?.exam_end
		? new Date(quizData.exam_time[0].exam_end).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})
		: "N/A"


	const handleExportQuePaper = (e) => {
		e.preventDefault();

		router.post(route("cpanel.questionPaperExport", exportQuestionPaper)); // Use router.post for POST requests
	}

	return (
		<div className="py-6">
			<div className="mx-auto max-w-full sm:px-6 lg:px-8">
				<div className="overflow-hidden bg-white shadow border border-gray-300 sm:rounded-lg">
					{/* Student Address */}
					<div className="border-r">
						<div className="sm:px-6 py-3 px-4 bg-gray-50  font-medium">
							<p className="text-md leading-6 mt-1 text-center">Exam Detail</p>
						</div>
						<div className="border-t border-gray-200 pb-4">
							<dl>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Exam Date:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-md">
										{examDate}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Marks Obtained:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-md">
										{score.final_score ?? "N/A"}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Questions Answered:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{score.total_attempt ?? "N/A"}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Questions Unanswered:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{score.not_attempted ?? "N/A"}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Correct Answers:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{score.correct_answers ?? "N/A"}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Incorrect Answers:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{score.incorrect_answers ?? "N/A"}
									</dd>
								</div>
								{score.final_score && (
									<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 text-center">
										<dt className="text-gray-900 font-medium text-sm leading-5 col-span-3">
											<a
												href={route("cpanel.questionPaperExport", exportQuestionPaper)}
											>
												Export Question Paper
											</a>
										</dt>
									</div>
								)}

							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
