import ExamScreenLayout from "@/Layouts/ExamScreenLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Exam({ student_uuid, questions }) {
	const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState({});

	const categories = questions.categories;
	const currentCategory = categories[currentCategoryIndex];
	const currentQuestion = currentCategory.questions[currentQuestionIndex];

	// console.log(currentQuestion); // Check if the questions prop is being passed correctly

	const handleOptionSelect = (questionId, optionKey) => {
		setAnswers((prevAnswers) => ({
			...prevAnswers,
			[questionId]: optionKey, // Only set the key selected by the user
		}));
	};

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

	const handleSubmit = () => {
		console.log("Submitted Answers:", answers);
		alert("Quiz submitted successfully!");
	};

	return (
		<ExamScreenLayout>
			<Head title="Instructions" />

			<div className="py-8">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900">
							<div className="quiz-container">
								<h2>Quiz Exam</h2>
								<h3>{currentCategory.category_name}</h3>
								<div className="question-section">
									<p>
										<strong>Question {currentQuestionIndex + 1}:</strong>{" "}
										{currentQuestion.question}
									</p>
									<div className="options">
										{["option_a", "option_b", "option_c", "option_d"].map(
											(key, index) => (
												<button
													key={index}
													className={
														answers[currentQuestion.id] === key
															? "selected"
															: ""
													}
													onClick={() =>
														handleOptionSelect(currentQuestion.id, key)
													}
												>
													{String.fromCharCode(65 + index)}.{" "}
													{currentQuestion[key]}
												</button>
											)
										)}
									</div>
								</div>
								<div className="navigation-buttons">
									{currentCategoryIndex > 0 || currentQuestionIndex > 0 ? (
										<button onClick={handlePrevious}>Previous</button>
									) : null}
									{currentCategoryIndex === categories.length - 1 &&
									currentQuestionIndex ===
										currentCategory.questions.length - 1 ? (
										<button onClick={handleSubmit}>Submit</button>
									) : (
										<button onClick={handleNext}>Next</button>
									)}
								</div>
								<div className="category-info">
									<p>Category: {currentCategory.category_name}</p>
									<p>
										Questions:{" "}
										{currentCategory.questions.map((_, index) => (
											<span
												key={index}
												className={
													index === currentQuestionIndex ? "active" : ""
												}
											>
												{index + 1}
											</span>
										))}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="pb-8">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
						<div className="quiz-screen">
							<pre>{JSON.stringify(questions, undefined, 2)}</pre>
						</div>
					</div>
				</div>
			</div>
		</ExamScreenLayout>
	);
}
