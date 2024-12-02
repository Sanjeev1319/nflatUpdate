import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import ExamScreenLayout from "@/Layouts/ExamScreenLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Exam({ student_uuid, questions, timeLeft }) {
	const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState({});

	const [remainingTime, setRemainingTime] = useState(timeLeft * 60); // Convert minutes to seconds
	const { post } = useForm();

	const categories = questions.categories;
	const currentCategory = categories[currentCategoryIndex];
	const currentQuestion = currentCategory.questions[currentQuestionIndex];

	// Disable keyboard events
	useEffect(() => {
		const disableKeyboardEvents = (event) => {
			event.preventDefault();
		};

		// Add event listeners to block keypresses
		window.addEventListener("keydown", disableKeyboardEvents);
		window.addEventListener("keypress", disableKeyboardEvents);

		// Cleanup event listeners on unmount
		return () => {
			window.removeEventListener("keydown", disableKeyboardEvents);
			window.removeEventListener("keypress", disableKeyboardEvents);
		};
	}, []);

	// Disable browser refresh via navigation events
	useEffect(() => {
		const handleBeforeUnload = (event) => {
			event.preventDefault();
			event.returnValue = ""; // Some browsers require this to show a confirmation dialog
		};

		// Add listener for beforeunload event
		window.addEventListener("beforeunload", handleBeforeUnload);

		// Cleanup on unmount
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	// Timer logic
	useEffect(() => {
		const timer = setInterval(() => {
			setRemainingTime((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(timer);
					handleSubmit(); // Automatically submit when time is up
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);

		// Cleanup on component unmount
		return () => clearInterval(timer);
	}, []);

	// Format time (MM:SS)
	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	// Handle option selection
	const handleOptionSelect = (questionId, optionKey) => {
		setAnswers((prevAnswers) => ({
			...prevAnswers,
			[questionId]: optionKey,
		}));
	};

	// Handle category selection
	const handleCategorySelect = (index) => {
		setCurrentCategoryIndex(index);
		setCurrentQuestionIndex(0); // Reset question index when switching categories
	};

	// Handle question selection
	const handleQuestionSelect = (index) => {
		setCurrentQuestionIndex(index);
	};

	// Handle navigation
	const handleNext = () => {
		if (currentQuestionIndex < currentCategory.questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else if (currentCategoryIndex < categories.length - 1) {
			setCurrentCategoryIndex(currentCategoryIndex + 1);
			setCurrentQuestionIndex(0);
		}
	};

	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		} else if (currentCategoryIndex > 0) {
			setCurrentCategoryIndex(currentCategoryIndex - 1);
			setCurrentQuestionIndex(
				categories[currentCategoryIndex - 1].questions.length - 1
			);
		}
	};

	// Submit quiz
	const handleSubmit = () => {
		post(route("student.quiz.submit"), {
			preserveScroll: true,
			onSuccess: () => {
				alert("Time's up! Your quiz has been submitted.");
			},
			data: {
				student_uuid,
				answers,
			},
		});
	};

	return (
		<ExamScreenLayout>
			<Head title="Instructions" />
			{/* Timer */}
			<div className="text-center mb-4">
				<h2 className="text-lg font-bold">
					Time Remaining:{" "}
					<span className="text-red-600">{formatTime(remainingTime)}</span>
				</h2>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-1 gap-4 py-8 md:px-8 lg:grid-cols-12">
				<div className="lg:col-span-8 sm:col-span-1">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900">
							<div className="quiz-container">
								{/* Current Question */}
								<div className="question-section">
									<h3>
										<strong>Question {currentQuestionIndex + 1}:</strong>{" "}
									</h3>
									<h2>{currentQuestion.question}</h2>
									<h3 className="mt-4">
										<strong>Options:</strong>{" "}
									</h3>
									<div className="lg:w-2/4 md:w-2/3">
										{["option_a", "option_b", "option_c", "option_d"].map(
											(key, index) => (
												<SecondaryButton
													key={index}
													className={`flex w-full my-3 py-4 hover:bg-green-300 focus:bg-green-500 ${
														answers[currentQuestion.id] === key
															? "bg-green-500"
															: ""
													}`}
													onClick={() =>
														handleOptionSelect(currentQuestion.id, key)
													}
												>
													{String.fromCharCode(65 + index)}.{" "}
													{currentQuestion[key]}
												</SecondaryButton>
											)
										)}
									</div>
								</div>

								{/* Navigation and Submit */}
								<div className="flex py-5">
									{/* Previous Button */}
									<PrimaryButton
										onClick={handlePrevious}
										disabled={
											currentCategoryIndex === 0 && currentQuestionIndex === 0
										}
										className="me-5"
									>
										Previous
									</PrimaryButton>

									{/* Next Button */}
									<PrimaryButton
										onClick={handleNext}
										disabled={
											currentCategoryIndex === categories.length - 1 &&
											currentQuestionIndex ===
												currentCategory.questions.length - 1
										}
										className="me-5"
									>
										Next
									</PrimaryButton>

									{/* Submit Button */}
									<PrimaryButton
										onClick={handleSubmit}
										className="bg-green-700 hover:bg-green-600"
									>
										Submit
									</PrimaryButton>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* student details and category */}
				<div className="lg:col-span-4">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900">
							{/* Category Selection */}
							<div className="grid grid-cols-2 pb-6 gap-4">
								{categories.map((category, index) => (
									<PrimaryButton
										key={index}
										className={`flex justify-center hover:bg-indigo-400 active:bg-indigo-700 focus:bg-indigo-700 ${
											index === currentCategoryIndex ? "bg-indigo-700" : ""
										}`}
										onClick={() => handleCategorySelect(index)}
									>
										{category.category_name}
									</PrimaryButton>
								))}
							</div>
						</div>
						<div className="p-6 text-gray-900 border-t">
							{/* Question Numbers */}
							<div className="grid grid-cols-5 gap-6 ">
								{currentCategory.questions.map((question, index) => (
									<PrimaryButton
										key={index}
										className={`flex justify-center hover:bg-indigo-400 active:bg-indigo-700 focus:bg-indigo-700 ${
											index === currentQuestionIndex
												? "bg-indigo-700"
												: answers[question.id]
												? "bg-green-500"
												: ""
										}`}
										onClick={() => handleQuestionSelect(index)}
									>
										{index + 1}
									</PrimaryButton>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</ExamScreenLayout>
	);
}
