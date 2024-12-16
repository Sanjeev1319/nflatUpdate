import CategoryButton from "@/Components/CategoryButton";
import DangerButton from "@/Components/DangerButton";
import ExamButton from "@/Components/ExamButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SuccessButton from "@/Components/SuccessButton";
import ExamScreenLayout from "@/Layouts/ExamScreenLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Exam({
	student_uuid,
	questions,
	timeLeft,
	retryTime,
	retryAnswers,
}) {
	// Initialize form data for submission
	const { data, setData, post, processing } = useForm({
		answers: "",
		student_uuid: student_uuid,
		remaining_time: "",
	});

	// States for quiz progress and answers
	const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState(() => {
		// Initialize answers from retryAnswers or session storage
		const savedAnswers = retryAnswers
			? retryAnswers
			: sessionStorage.getItem("quiz_answers");
		return savedAnswers ? JSON.parse(savedAnswers) : {};
	});

	const [remainingTime, setRemainingTime] = useState(() => {
		// Initialize timer from retryTime or session storage
		const storedTime = sessionStorage.getItem("quiz_timer");
		return retryTime
			? retryTime * 60
			: storedTime
			? parseInt(storedTime, 10)
			: timeLeft * 60;
	});

	// Extract categories and current question
	const categories = questions.categories;
	const currentCategory = categories[currentCategoryIndex];
	const currentQuestion = currentCategory.questions[currentQuestionIndex];

	// Update session storage for answers
	useEffect(() => {
		sessionStorage.setItem("quiz_answers", JSON.stringify(answers));
		setData("answers", answers);
	}, [answers]);

	// Update session storage for timer
	useEffect(() => {
		sessionStorage.setItem("quiz_timer", remainingTime.toString());
	}, [remainingTime]);

	// Disable keyboard events to prevent cheating
	useEffect(() => {
		const disableKeyboard = (event) => event.preventDefault();
		window.addEventListener("keydown", disableKeyboard);
		return () => window.removeEventListener("keydown", disableKeyboard);
	}, []);

	// Disable browser navigation/refresh
	useEffect(() => {
		const handleBeforeUnload = (event) => {
			event.preventDefault();
			event.returnValue = "";
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, []);

	// Timer functionality
	useEffect(() => {
		const timer = setInterval(() => {
			setRemainingTime((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(timer);
					handleSubmit(); // Auto-submit when time is up
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	// Format time for display
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

	// Clear the selected answer for the current question
	const handleClearAnswer = (questionId) => {
		const updatedAnswers = { ...answers };
		delete updatedAnswers[questionId]; // Remove the current question's answer
		setAnswers(updatedAnswers);
		sessionStorage.setItem("quiz_answers", JSON.stringify(updatedAnswers)); // Update sessionStorage
	};

	// Handle navigation between categories and questions
	const handleCategorySelect = (index) => {
		setCurrentCategoryIndex(index);
		setCurrentQuestionIndex(0);
	};

	const handleQuestionSelect = (index) => {
		setCurrentQuestionIndex(index);
	};

	const handleNext = () => {
		if (currentQuestionIndex < currentCategory.questions.length - 1) {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
		} else if (currentCategoryIndex < categories.length - 1) {
			setCurrentCategoryIndex((prevIndex) => prevIndex + 1);
			setCurrentQuestionIndex(0);
		}
	};

	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
		} else if (currentCategoryIndex > 0) {
			setCurrentCategoryIndex((prevIndex) => prevIndex - 1);
			setCurrentQuestionIndex(
				categories[currentCategoryIndex - 1].questions.length - 1
			);
		}
	};

	// Auto-submit data every 2 minutes
	useEffect(() => {
		const interval = setInterval(() => {
			handleIntervalSubmit();
		}, 15 * 1000);
		return () => clearInterval(interval);
	}, [answers]);

	// Submit quiz data
	const handleIntervalSubmit = () => {
		post(route("student.quiz.intervalSubmit"), {
			data,
			preserveState: true,
			preserveScroll: true,
		});
	};

	const handleSubmit = () => {
		post(route("student.quiz.submit"), {
			data,
			onSuccess: () => {
				sessionStorage.removeItem("quiz_answers");
				sessionStorage.removeItem("quiz_timer");
			},
		});
	};

	return (
		<ExamScreenLayout>
			<Head title="Instructions" />
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-8 md:px-8">
				<div className="lg:col-span-8">
					<div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
						<div className="p-6">
							<form>
								{/* Display Current Question */}
								<h3>
									<strong>Question {currentQuestionIndex + 1}:</strong>
								</h3>
								<h2>{currentQuestion.question}</h2>
								<h3 className="mt-4">Options:</h3>
								<div className="lg:w-2/4 md:w-2/3">
									{["A", "B", "C", "D"].map((key, index) => (
										<SecondaryButton
											key={index}
											className={`flex w-full my-3 py-4 hover:bg-green-300 focus:bg-green-500 ${
												answers[currentQuestion.id] === key
													? "bg-green-400"
													: "hover:bg-green-300"
											}`}
											onClick={() =>
												handleOptionSelect(currentQuestion.id, key)
											}
										>
											{key}. {currentQuestion[key]}
										</SecondaryButton>
									))}
								</div>
								{/* Navigation Buttons */}
								<div className="flex justify-between py-5">
									<div className="flex">
										{/* New Clear Answer Button */}
										<DangerButton
											onClick={(e) => {
												e.preventDefault();
												handleClearAnswer(currentQuestion.id);
											}}
											className="bg-red-600 hover:bg-red-500 me-4"
										>
											Clear Answer
										</DangerButton>
										<PrimaryButton
											onClick={handlePrevious}
											disabled={
												currentCategoryIndex === 0 && currentQuestionIndex === 0
											}
											className="me-5"
										>
											Previous
										</PrimaryButton>
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
									</div>
									{/* Right-aligned buttons */}
									<div className="flex">
										<SuccessButton
											onClick={handleSubmit}
											className="bg-green-700 hover:bg-green-600 py-3 text-sm"
										>
											Submit
										</SuccessButton>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				{/* Sidebar for Categories and Timer */}
				<div className="lg:col-span-4">
					<div className="bg-white shadow-sm sm:rounded-lg">
						<div className="p-6 text-center border-b">
							<h2 className="text-lg font-bold">
								Time Remaining:{" "}
								<span className="text-red-600">
									{formatTime(remainingTime)}
								</span>
							</h2>
						</div>
						<div className="p-6">
							<div className="grid grid-cols-2 gap-4">
								{categories.map((category, index) => (
									<CategoryButton
										key={index}
										className={`flex justify-center text-white ${
											index === currentCategoryIndex
												? " rounded-full bg-fuchsia-700"
												: " rounded-md bg-indigo-600 hover:bg-indigo-900"
										}`}
										onClick={() => handleCategorySelect(index)}
									>
										{category.category_name}
									</CategoryButton>
								))}
							</div>
						</div>
						<div className="p-6 border-t">
							<div className="grid grid-cols-5 gap-6">
								{currentCategory.questions.map((question, index) => (
									<ExamButton
										key={index}
										className={`flex justify-center text-white ${
											index === currentQuestionIndex
												? " rounded-full bg-fuchsia-900"
												: answers[question.id]
												? "bg-green-500 rounded-lg"
												: "bg-indigo-700 hover:bg-red-700 hover:rounded-md"
										}`}
										onClick={() => handleQuestionSelect(index)}
									>
										{index + 1}
									</ExamButton>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</ExamScreenLayout>
	);
}
