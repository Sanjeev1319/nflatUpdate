import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

export default function Instructions({ allowAttempt }) {
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
						<div className="p-6 text-gray-900">
							<form onSubmit={submit}>
								<h3 className="text-gray-900 font-semibold text-base leading-5">
									Instructions
								</h3>

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
											<div className="text-base leading-4 ms-3 ">
												<InputLabel htmlFor="terms" className="">
													<span>I have read all rules.</span>
												</InputLabel>
											</div>
										</div>

										<div>
											<InputError message={errors.terms} className="mt-2" />
										</div>
										<div className="text-center">
											<PrimaryButton type="submit" className="mt-3">
												Start Exam
											</PrimaryButton>
										</div>
									</>
								) : (
									<div className="p-3 mt-4 rounded-md text-red-800 bg-red-200 border-red-300 border text-center">
										You have already attempted the test.
									</div>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="pb-8">
				<div className="mx-auto sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg"></div>
				</div>
			</div>
		</>
	);
}
