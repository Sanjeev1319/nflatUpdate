import AdminStudentDetails from "@/Components/Admin/AdminStudentDetails";
import AdminStudentExamDetails from "@/Components/Admin/AdminStudentExamDetails";
import SchoolDetails from "@/Components/Admin/SchoolDetails";
import AdminAuthLayout from "@/Layouts/AdminAuthLayout";
import { Head } from "@inertiajs/react";

export default function View({ student, quiz_logs, questionAnswers = null, success }) {
	return (
		<AdminAuthLayout
			header={
				<h2 className="text-xl font-semibold leading-tight text-gray-800">
					Student Details:{" "}
					<span className="text-violet-700">
						{student.data.student_uuid} - {student.data.student_name}
					</span>
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

			<div className="grid md:grid-cols-2 grid-cols-1 gap-1">
				<AdminStudentDetails studentData={student} />
				<AdminStudentExamDetails examData={student} quizLogs={quiz_logs} exportQuestionPaper={questionAnswers} />
			</div>

			{questionAnswers.categories && (
				<div className="py-6">
					<div className="mx-auto max-w-full sm:px-6 lg:px-8">
						<div className="overflow-hidden bg-white shadow sm:rounded-lg border border-gray-300">
							<div className="sm:px-6 py-3 px-4 bg-gray-50 font-medium border-b">
								<p className="text-md leading-6 max-w-full mt-1 text-center">
									Student Question Paper
								</p>
							</div>
							<div className="p-4 lg:p-6">
								<div className="grid grid-cols-2 gap-20">
									{questionAnswers.categories.map((category, categoryIndex) => (
										<div key={categoryIndex}>
											<h3 className="my-3 font-semibold bg-indigo-700 text-white ps-3 py-2 rounded-sm">{category.category_name}</h3>
											{category.questions.map((question, questionIndex) => (
												<div key={questionIndex}>
													<h4 className="mb-2 font-medium">{questionIndex + 1}. {question.question}</h4>
													{/* Display "Not Attempted" if user_answer is null */}
													{question.user_answer === null && (
														<p className="text-gray-500 italic">Not Attempted</p>
													)}
													<ul className="mb-4 ms-4">
														{["A", "B", "C", "D"].map((option) => {
															// Determine the appropriate styling
															let className = "";
															if (question.correct_answer === option) {
																className = "text-green-500 font-bold"; // Green for correct answer
															}
															if (
																question.user_answer === option &&
																question.user_answer !== question.correct_answer
															) {
																className = "text-red-500 font-bold"; // Red for incorrect user answer
															}

															return (
																<li key={option} className={className}>
																	<strong>{option}:</strong> {question[option]}
																</li>
															);
														})}
													</ul>

												</div>
											))}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

		</AdminAuthLayout >
	);
}
