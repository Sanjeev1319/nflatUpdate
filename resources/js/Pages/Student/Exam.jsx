import CategoryButton from "@/Components/CategoryButton";
import ExamButton from "@/Components/ExamButton";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
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
	const { data, setData, post, processing, errors, reset, setError } = useForm({
		answers: "",
		student_uuid: student_uuid,
		remaining_time: "",
	});

	const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

	// Initialize answers from retryAnswers or sessionStorage
	const [answers, setAnswers] = useState(() => {
		if (retryAnswers) {
			sessionStorage.setItem("quiz_answers", JSON.stringify(retryAnswers));
			return retryAnswers;
		}
		const savedAnswers = sessionStorage.getItem("quiz_answers");
		return savedAnswers ? JSON.parse(savedAnswers) : {};
	});

	// Initialize remaining time from retryTime or sessionStorage
	const [remainingTime, setRemainingTime] = useState(() => {
		if (retryTime) {
			const retryTimeInSeconds = retryTime * 60; // Assuming retryTime is in minutes
			sessionStorage.setItem("quiz_timer", retryTimeInSeconds.toString());
			return retryTimeInSeconds;
		}
		const storedTime = sessionStorage.getItem("quiz_timer");
		return storedTime ? parseInt(storedTime, 10) : timeLeft * 60;
	});

	const categories = questions.categories;
	const currentCategory = categories[currentCategoryIndex];
	const currentQuestion = currentCategory.questions[currentQuestionIndex];

	// Save answers to sessionStorage whenever they change
	useEffect(() => {
		sessionStorage.setItem("quiz_answers", JSON.stringify(answers));
		setData("answers", answers);
	}, [answers]);

	// Save remaining time to sessionStorage every second
	useEffect(() => {
		sessionStorage.setItem("quiz_timer", remainingTime.toString());
		setData("remaining_time", remainingTime);
	}, [remainingTime]);

	// Disable keyboard events
	useEffect(() => {
		const disableKeyboardEvents = (event) => {
			event.preventDefault();
		};

		window.addEventListener("keydown", disableKeyboardEvents);
		window.addEventListener("keypress", disableKeyboardEvents);

		return () => {
			window.removeEventListener("keydown", disableKeyboardEvents);
			window.removeEventListener("keypress", disableKeyboardEvents);
		};
	}, []);

	// Disable browser refresh via navigation events
	useEffect(() => {
		const handleBeforeUnload = (event) => {
			event.preventDefault();
			event.returnValue = "";
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

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

		return () => clearInterval(timer);
	}, [answers]);

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
		const updatedAnswers = { ...answers, [questionId]: optionKey };
		setAnswers(updatedAnswers);
		sessionStorage.setItem("quiz_answers", JSON.stringify(updatedAnswers));
	};

	// Handle category selection
	const handleCategorySelect = (index) => {
		setCurrentCategoryIndex(index);
		setCurrentQuestionIndex(0);
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

	// Trigger submission every 2 minutes
	useEffect(() => {
		// Explicitly set the answers before submission
		setData("answers", answers);

		const interval = setInterval(() => {
			console.log("Auto-submitting after 2 minutes...");
			handleIntervalSubmit();
		}, 50 * 1000); // 5 minutes in milliseconds

		return () => clearInterval(interval); // Cleanup interval on component unmount
	}, [answers]);

	// Function to get current time with microseconds in ISO format
	const getCurrentTimeWithMicroseconds = () => {
		const now = new Date();
		const isoString = now.toISOString(); // Gets time in "2024-12-08T19:12:01.675Z" format
		const microseconds =
			now.getMilliseconds().toString().padStart(3, "0") + "000"; // Adds microseconds as "675000"
		return isoString.replace("Z", `.${microseconds}Z`);
	};

	// Submit quiz
	const handleIntervalSubmit = () => {
		// Explicitly set the latest answers before submission
		setData("answers", answers);

		// Log the current time and data for debugging
		const currentTime = getCurrentTimeWithMicroseconds();
		console.log("Submitting Data:", {
			student_uuid,
			answers,
			currentTime,
		});

		post(route("student.quiz.intervalSubmit"), {
			data: { ...data, currentTime },
			preserveState: true, // Prevent state reset
			preserveScroll: true, // Maintain scroll position
			onSuccess: () => {
				console.log("Interval submission successful!");
				console.log("Interval triggered at:", new Date().toISOString());
			},
			onError: (error) => {
				console.error("Interval submission error:", error);
			},
		});
	};

	// Submit quiz
	const handleSubmit = () => {
		console.log("Submitting Data:", {
			student_uuid: student_uuid,
			answers: answers,
		});

		post(route("student.quiz.submit"), {
			data,
			onSuccess: () => {
				console.log("Submission Successful!");
				sessionStorage.removeItem("quiz_answers");
				sessionStorage.removeItem("quiz_timer");
			},
			onError: (error) => {
				console.error("Submission Error:", error);
			},
		});
	};

	useEffect(() => {
		const handleLogoutOnClose = async (event) => {
			try {
				// Optional: Prevent some refresh actions
				event.preventDefault();
				event.returnValue = "";

				// Trigger the logout API
				await axios.post(route("student.logout"));
			} catch (error) {
				console.error("Error logging out on browser close:", error);
			}
		};

		window.addEventListener("beforeunload", handleLogoutOnClose);

		return () => {
			window.removeEventListener("beforeunload", handleLogoutOnClose);
		};
	}, []);

	return (
		<ExamScreenLayout>
			<Head title="Instructions" />

			<div className="grid grid-cols-1 md:grid-cols-1 gap-4 py-8 md:px-8 lg:grid-cols-12">
				<div className="lg:col-span-8 sm:col-span-1">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900">
							<form className="quiz-container">
								<div className="question-section">
									<h3>
										<strong>Question {currentQuestionIndex + 1}:</strong>{" "}
									</h3>
									<h2>{currentQuestion.question}</h2>
									<h3 className="mt-4">
										<strong>Options:</strong>{" "}
									</h3>
									<div className="lg:w-2/4 md:w-2/3">
										{["A", "B", "C", "D"].map((key, index) => (
											<SecondaryButton
												key={index}
												className={`flex w-full my-3 py-4 hover:bg-green-300 focus:bg-green-500 ${
													answers[currentQuestion.id] === key
														? " bg-green-400 text-green-950 "
														: ""
												}`}
												onClick={() =>
													handleOptionSelect(currentQuestion.id, key)
												}
											>
												{String.fromCharCode(65 + index)}.{" "}
												{currentQuestion[key]}
											</SecondaryButton>
										))}
									</div>
								</div>
								<div className="flex py-5">
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
									<PrimaryButton
										onClick={handleSubmit}
										className="bg-green-700 hover:bg-green-600"
									>
										Submit
									</PrimaryButton>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="lg:col-span-4">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900 border-b">
							<div className="text-center">
								<h2 className="text-lg font-bold">
									Time Remaining:{" "}
									<span className="text-red-600">
										{formatTime(remainingTime)}
									</span>
								</h2>
							</div>
						</div>
						<div className="p-6 text-gray-900">
							<div className="grid grid-cols-2 pb-6 gap-4">
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
						<div className="p-6 text-gray-900 border-t">
							<div className="grid grid-cols-5 gap-6 ">
								{currentCategory.questions.map((question, index) => (
									<ExamButton
										key={index}
										className={`flex justify-center text-white ${
											index === currentQuestionIndex
												? " bg-fuchsia-900 focus:ring-0 rounded-full"
												: answers[question.id]
												? " bg-green-500 rounded-lg"
												: " bg-indigo-700 hover:bg-red-700 hover:rounded-md"
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
