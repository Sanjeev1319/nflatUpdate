import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import SecondaryButton from "./SecondaryButton";
import { NoBackpackSharp } from "@mui/icons-material";
import ExamButton from "./ExamButton";

export default function Instructions({ studentData, allowAttempt, retryAttempt }) {
	const { data, setData, post, processing, errors, reset } = useForm({
		terms: false,
	});

	const submit = (e) => {
		e.preventDefault();

		post(route("student.startExam"));
	};

	return (
		<>
			<div className="pb-8">
				<div className="mx-auto sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
						<div className="py-6 px-10 text-gray-900">
							<form onSubmit={submit}>
								<h3 className="text-gray-900 font-semibold text-3xl leading-5 text-center mb-3">
									Instructions
								</h3>
								<div className="font-bold flex justify-between mb-2">
									<div>Duration: 30 Minutes</div>
									<div>Maximum Marks: 60</div>
								</div>

								<div className="pb-4">
									<p className="font-bold leading-10">Read the following instructions carefully.</p>
									<ol className="list-decimal list-ouside ms-5">
										<li className="leading-6 mb-3">
											Please check your personal details and school information carefully before starting the test.
										</li>
										<li className="leading-6 mb-3">
											The test has 60 questions.
										</li>
										<li className="leading-6 mb-3">
											Each question has 4 choices, and only one is the correct answer.
										</li>
										<li className="leading-6 mb-3">
											You have 30 minutes to finish the test.
										</li>
										<li className="leading-6 mb-3">
											You will get 1 mark for each correct answer. For every wrong answer, 0.5 marks will be deducted.
										</li>
										<li className="leading-6 mb-3">
											No marks will be deducted for questions you don’t answer.
										</li>
										<li className="leading-6 mb-3">
											You can take the test only once. Be sure to complete it before submitting or closing the browser.
										</li>
									</ol>
								</div>
								<hr className="border-gray-400" />
								<h3 className="text-gray-900 font-semibold text-lg leading-5 my-4">
									General Instructions
								</h3>
								<ol className="list-decimal list-outside ms-5">
									<li className="leading-6 mb-3">The timer is set on the server. The countdown timer at the top-right corner of the screen shows the remaining time for the examination. When the timer reaches zero, the examination will automatically end.</li>
									<li className="leading-6 mb-3">The sections of the question paper are displayed at the right side of the screen. Click on a section name to view its questions. The currently selected section will be highlighted.</li>
									<li className="leading-6 mb-3">The Question Palette on the right side of the screen indicates the status of each question:
										<ul className="list-disc ms-4 mb-6">
											<li className="leading-6 mb-3">
												<ExamButton
													className="flex justify-center text-white bg-indigo-700 hover:bg-red-700 hover:rounded-md me-3 shadow-md">
												</ExamButton>
												You have not answered the question.</li>
											<li className="leading-6 mb-3">
												<ExamButton
													className="flex justify-center text-white bg-green-500 rounded-lg me-3 shadow-md">
												</ExamButton>
												You have answered the question.</li>
											<li className="leading-6 mb-3">
												<ExamButton
													className="flex justify-center text-white  rounded-full bg-fuchsia-900 me-3 shadow-md">
												</ExamButton>
												The question you are currently viewing.</li>
										</ul>
									</li>
									<h3 className="text-gray-900 font-semibold text-lg leading-5 mb-3 -ms-6">
										Navigating to and Answering a Question :
									</h3>

									<li className="leading-6 mb-3">Click on a question number in the Question Palette to go directly to that question. Note: This does not save your answer to the current question.</li>
									<li className="leading-6 mb-3">Select one answer from the 4 options (A, B, C, D) below the question. Your answer is saved automatically when you select an option.</li>
									<li className="leading-6 mb-3">To clear your selected answer, click the <b>Clear Response</b> button.</li>
									<li className="leading-6 mb-3">To change your answer, simply select a different option.</li>
								</ol>

								<hr className="border-gray-400" />
								{allowAttempt === true ? (
									<>
										<div className="flex items-start relative pt-5">
											<div className="flex leading-6 items-center">
												<input
													id="terms"
													name="terms"
													type="checkbox"
													className="text-indigo-600 border-red-600 rounded w-4 h-4"
													onClick={(e) => setData("terms", e.target.checked)}
												/>
											</div>
											<div className="text-base leading-6 ms-3 ">
												<InputLabel htmlFor="terms" className="">
													<span className="leading-5">I have carefully read and understood all the instructions. I agree to take the examination honestly and will not engage in any form of cheating or unfair practices. I understand that using unfair means, either for my benefit or someone else’s, will result in my immediate disqualification.</span>
												</InputLabel>
											</div>
										</div>

										<div>
											<InputError message={errors.terms} className="mt-2" />
										</div>
										<div className="text-center">
											{retryAttempt === true ? (
												<PrimaryButton type="submit" className="mt-3">
													Retry Attempt
												</PrimaryButton>
											) : (
												<PrimaryButton type="submit" className="mt-3">
													Start Exam
												</PrimaryButton>
											)}
										</div>
									</>
								) : (
									<div className="p-3 mt-4 rounded-md text-red-800 bg-red-200 border-red-300 border text-center">
										You have attempted the test.
									</div>
								)}
							</form>
						</div>
					</div >
				</div >
			</div >
			<div className="pb-8">
				<div className="mx-auto sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg"></div>
				</div>
			</div>
		</>
	);
}
