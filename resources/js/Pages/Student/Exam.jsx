import CategoryButton from "@/Components/CategoryButton";
import DangerButton from "@/Components/DangerButton";
import ExamButton from "@/Components/ExamButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SuccessButton from "@/Components/SuccessButton";
import ExamScreenLayout from "@/Layouts/ExamScreenLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState, useCallback } from "react";

export default function Exam({
	student_uuid,
	questions,
	retryAnswers,
	examTime,
	studentData
}) {
	useEffect(() => {
		const handlePopState = (event) => {
			// Prevent navigating back
			window.history.pushState(null, null, window.location.href);
		};

		// Push the current state to history
		window.history.pushState(null, null, window.location.href);

		// Listen for back/forward navigation
		window.addEventListener("popstate", handlePopState);

		// Cleanup the event listener
		return () => {
			window.removeEventListener("popstate", handlePopState);
		};
	}, []);

	// Form data using Inertia.js
	const { data, setData, post, processing } = useForm({
		answers: "",
		student_uuid: student_uuid,
		remaining_time: "",
	});

	// Initialize exam start time, persisting it across reloads
	const [startTime] = useState(() => {
		const savedStartTime = sessionStorage.getItem("exam_start_time");
		if (savedStartTime) return new Date(savedStartTime);
		const newStartTime = new Date();
		sessionStorage.setItem("exam_start_time", newStartTime);
		return newStartTime;
	});

	// Manage answers, retrieving saved data if available
	const [answers, setAnswers] = useState(() => {
		// const savedAnswers = retryAnswers || sessionStorage.getItem("quiz_answers");
		const savedAnswers = retryAnswers || sessionStorage.getItem("quiz_answers");
		return savedAnswers ? JSON.parse(savedAnswers) : {};
	});

	// Manage current category and question indices
	const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	// Categories and current question
	const categories = questions.categories;
	const currentCategory = categories[currentCategoryIndex];
	const currentQuestion = currentCategory.questions[currentQuestionIndex];

	// Calculate remaining time based on the total exam duration
	const calculateRemainingTime = () => {
		const elapsedSeconds = Math.floor((new Date() - startTime) / 1000);
		return Math.max(examTime - elapsedSeconds, 0);
	};

	// Manage remaining time as state
	const [remainingTime, setRemainingTime] = useState(calculateRemainingTime);

	// Save answers to session storage whenever they are updated
	useEffect(() => {
		sessionStorage.setItem("quiz_answers", JSON.stringify(answers));
		setData("answers", answers);
	}, [answers]);

	// Real-time timer update and auto-submit when time runs out
	useEffect(() => {
		const timer = setInterval(() => {
			const updatedTime = calculateRemainingTime();
			setRemainingTime(updatedTime);
			if (updatedTime <= 0) {
				clearInterval(timer);
				handleSubmit(); // Submit automatically when time runs out
			}
		}, 1000);
		return () => clearInterval(timer);
	}, [startTime]);

	// Prevent keyboard shortcuts during the quiz
	useEffect(() => {
		const disableKeyboard = (e) => e.preventDefault();
		window.addEventListener("keydown", disableKeyboard);
		return () => window.removeEventListener("keydown", disableKeyboard);
	}, []);

	// Prevent navigation away from the page
	useEffect(() => {
		const handleBeforeUnload = (e) => {
			e.preventDefault();
			e.returnValue = "";
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, []);

	// Submit answers at fixed intervals (every 2 minutes)
	useEffect(() => {
		const interval = setInterval(() => {
			handleIntervalSubmit();
		}, 5 * 60 * 1000); // 2 minutes
		return () => clearInterval(interval);
	}, []);

	// Format time for display in MM:SS
	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	// Handle answer selection
	const handleOptionSelect = (questionId, optionKey) => {
		setAnswers((prevAnswers) => ({
			...prevAnswers,
			[questionId]: optionKey,
		}));
	};

	// Clear a specific answer
	const handleClearAnswer = (questionId) => {
		setAnswers((prevAnswers) => {
			const updatedAnswers = { ...prevAnswers };
			delete updatedAnswers[questionId];
			return updatedAnswers;
		});
	};

	// Navigate between categories and questions
	const handleCategorySelect = (index) => {
		setCurrentCategoryIndex(index);
		setCurrentQuestionIndex(0);
	};

	const handleQuestionSelect = (index) => {
		setCurrentQuestionIndex(index);
	};

	const handleNext = () => {
		if (currentQuestionIndex < currentCategory.questions.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
		} else if (currentCategoryIndex < categories.length - 1) {
			setCurrentCategoryIndex((prev) => prev + 1);
			setCurrentQuestionIndex(0);
		}
	};

	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prev) => prev - 1);
		} else if (currentCategoryIndex > 0) {
			setCurrentCategoryIndex((prev) => prev - 1);
			setCurrentQuestionIndex(
				categories[currentCategoryIndex - 1].questions.length - 1
			);
		}
	};

	// Submit answers at intervals
	const handleIntervalSubmit = useCallback(() => {
		// Retrieve answers from sessionStorage
		const storedAnswers = sessionStorage.getItem("quiz_answers");
		const parsedAnswers = storedAnswers ? JSON.parse(storedAnswers) : {};

		// Update the form data with retrieved answers
		setData((prevData) => ({
			...prevData,
			answers: parsedAnswers,
		}));

		// Submit the data
		post(route("student.quiz.intervalSubmit"), {
			data: {
				...data,
				answers: parsedAnswers,
			},
			preserveState: true,
			preserveScroll: true,
		});
		// Log the data being sent for debugging
	}, [data, post, setData]);


	// Final submission
	const handleSubmit = () => {
		if (window.confirm("Are you sure you want to submit the quiz?")) {
			post(route("student.quiz.submit"), {
				data,
				onSuccess: () => {
					sessionStorage.removeItem("quiz_answers");
					sessionStorage.removeItem("exam_start_time");
				},
			});
		}
	};

	return (
		<ExamScreenLayout pageScreen={
			<>
				<div className="grid grid-cols-2 gap-4 w-full">
					<div>
						<p className="text-sm mb-1">Student Name: {studentData.data.student_name} - {studentData.data.student_uuid}</p>
						<p className="text-sm mb-1">Student Class: {studentData.data.student_class} /{" "}
							{studentData.data.student_section}</p>
					</div>
					<div>
						<p className="text-sm mb-1">School Name: {studentData.data.school_uuid.school_name} - {studentData.data.school_uuid.school_uuid}</p>
						<p className="text-sm mb-1">NFLAT Category: {studentData.data.nflat_category}</p>
					</div>
				</div>
			</>
		}>
			<Head title="Instructions" />
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-8 md:px-8">
				<div className="lg:col-span-8">
					<div className="bg-white shadow-sm sm:rounded-lg overflow-hidden">
						<div className="p-6">
							<h3>
								<strong>Question {currentQuestionIndex + 1}:</strong>
							</h3>
							<h2>{currentQuestion.question}</h2>
							<h3 className="mt-4">Options:</h3>
							<div className="lg:w-2/4 md:w-2/3">
								{["A", "B", "C", "D"].map((key, index) => (
									currentQuestion[key] && ( // Check if the value of the key is not null
										<SecondaryButton
											key={index}
											className={`flex w-full my-3 py-4 text-start ${answers[currentQuestion.id] === key
												? "bg-green-400"
												: "hover:bg-green-300"
												}`}
											onClick={() =>
												handleOptionSelect(currentQuestion.id, key)
											}
										>
											{key}. {currentQuestion[key]}
										</SecondaryButton>
									)
								))}
							</div>
							<div className="flex justify-between py-5">
								<div>
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
											currentCategoryIndex === 0 &&
											currentQuestionIndex === 0
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
								<div>
									<SuccessButton
										onClick={handleSubmit}
										className="bg-green-700 hover:bg-green-600 text-xs"
									>
										Submit
									</SuccessButton>
								</div>
							</div>
						</div>
					</div>
				</div>
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
										className={`flex justify-center text-white ${index === currentCategoryIndex
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
										className={`flex justify-center text-white ${index === currentQuestionIndex
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
