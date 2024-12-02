import ApplicationLogo from "@/Components/ApplicationLogo";
import SchoolLoginLayout from "@/Components/SchoolLoginLayout";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Welcome({ auth, success }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Function to open the modal when success is passed
	const openModal = () => {
		if (success) {
			setIsModalOpen(true);
		}
	};

	// Function to close the modal
	const closeModal = () => {
		setIsModalOpen(false);
	};

	// Open the modal when component mounts
	useEffect(() => {
		openModal();
	}, [success]);

	return (
		<>
			<Head title="Welcome" />
			{/* Modal Background */}
			{isModalOpen && (
				<div
					className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
					onClick={closeModal}
				>
					<div
						className="modal-content bg-white p-6 rounded-lg w-3/4 max-w-md relative"
						onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside content
					>
						<span
							className="close absolute top-2 right-2 text-2xl cursor-pointer"
							onClick={closeModal}
						>
							&times;
						</span>

						{/* Modal Content */}
						<h2 className="text-xl font-semibold">Success</h2>
						<p className="mt-4 text-center">
							School Registered Successfully. The login details are shared on{" "}
							<strong>{success}</strong>.
						</p>

						{/* Close Button */}
						<div className="mt-6 text-center">
							<button
								onClick={closeModal}
								className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
			<div className=" text-black/50 dark:bg-black dark:text-white/50">
				<div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
					<header className="w-full py-5">
						<div className="flex lg:col-start-2 lg:justify-center">
							<ApplicationLogo />
						</div>
					</header>
					<div className="min-h-10 bg-blue-900 w-full text-white flex items-center justify-center text-lg font-medium">
						Registration Started
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden items-stretch">
						<div className="lg:col-span-2 h-full">
							<img src={"/storage/ncfe_logos/nflat-banner.png"} />
						</div>
						<div className="col-span-1 bg-white flex flex-col justify-between h-full">
							<div className="px-10">
								<h2 className="text-center my-5 leading-10 text-2xl font-medium text-black">
									Registered School Login
								</h2>
								<div className="items-center justify-center flex flex-col">
									<div className="w-full">
										<SchoolLoginLayout />
									</div>
								</div>
							</div>
							<div className="bg-slate-300 w-full grid grid-cols-2 mt-5">
								<Link
									href={route("school.register")}
									className="inline-flex items-center py-4 border border-transparent bg-indigo-800 px-2 justify-center text-sm font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-900"
								>
									Register your School
								</Link>
								<Link
									// href={route("school.register")}
									className="inline-flex items-center py-4 border border-transparent bg-orange-600 px-2 justify-center text-sm font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-orange-500 focus:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 active:bg-orange-700"
								>
									Click Here to Take Test
								</Link>
							</div>
						</div>
					</div>
					<div className="w-full max-w-2xl px-6 lg:max-w-7xl">
						<main className="mt-10">
							<div className="grid gap-6 lg:grid-cols-4 lg:gap-8">
								<div>
									<div className="flex flex-col items-start overflow-hidden rounded-lg ring-1 transition duration-300 text-black/70 ring-black/20 dark:bg-zinc-900 dark:ring-zinc-800 dark:text-white/70 dark:hover:ring-zinc-700 self-start">
										<div className="w-full sm:px-6 py-3 px-4 bg-slate-50 border-gray-200 border-b">
											<h2 className="text-base font-semibold text-black text-center">
												Downloads
											</h2>
										</div>
										<ul role="list" className="w-full">
											<li className="sm:px-6 py-3 px-4 gap-x-6 justify-between flex relative text-base border-b hover:indent-2 transition-all hover:bg-indigo-50 hover:bg-opacity-30">
												<a
													href={"/storage/docs/exam_pattern.pdf"}
													target="_blank"
												>
													Examination Pattern
												</a>
											</li>
											<li className="sm:px-6 py-3 px-4 gap-x-6 justify-between flex relative text-base border-b hover:indent-2 transition-all hover:bg-indigo-50 hover:bg-opacity-30">
												<a
													href={"/storage/docs/important_dates.pdf"}
													target="_blank"
												>
													Important Dates
												</a>
											</li>
											<li className="sm:px-6 py-3 px-4 gap-x-6 justify-between flex relative text-base border-b hover:indent-2 transition-all hover:bg-indigo-50 hover:bg-opacity-30">
												<a
													href={"/storage/docs/syllabus_latest.pdf"}
													target="_blank"
												>
													Syllabus
												</a>
											</li>
										</ul>
									</div>
									<div className="my-6">
										<img
											src={"/storage/ncfe_logos/yvw2y3ok.png"}
											className="rounded-lg ring-1 shadow-sm"
										/>
									</div>
									<div className="my-6">
										<img
											src={"/storage/ncfe_logos/nebpfphm.png"}
											className="rounded-lg ring-1 shadow-sm"
										/>
									</div>
								</div>
								<div className="lg:col-span-3 text-black">
									<div className="w-full text-justify bg-cyan-200 py-4 px-6 border-cyan-400 border">
										<h2 className="text-2xl text-center font-bold text-cyan-800 mb-4 ">
											Important Note to the NFLAT Student
										</h2>
										<p className="text-lg font-normal text-gray-700 mb-4">
											Students Please Click -{" "}
											<Link
												href={route("student.index")}
												className="text-red-700 hover:underline"
											>
												https://schoolexam.ncfe.org.in/take-a-test
											</Link>{" "}
											to take the test (NFLAT 2024-25 examination url).
										</p>
										<p className="text-lg font-normal text-gray-700 mb-4">
											1. Test username is your{" "}
											<span className="font-bold text-red-600">Student ID</span>{" "}
											(Numeric Format)
											<br />
											2. Test Password is{" "}
											<span className="font-bold text-red-600">
												Alpha Numeric
											</span>
										</p>
										<p className="text-lg font-normal text-red-700 mb-4">
											Collect your Test username and Test password from your
											school.
										</p>
									</div>
									<div className="text-justify mt-4">
										<h1 className="text-lg font-bold leading-10">
											About NFLAT
										</h1>
										<p className="mb-3">
											Financial literacy is a core life skill that focuses on
											knowledge, behaviour and attitude required to make
											responsible money management decisions. In 2005, the OECD
											recommended that financial education start as early as
											possible and be taught in schools.
										</p>
										<p className="mb-3">
											In line with OECD recommendation, National Financial
											Literacy Assessment Test (NFLAT) conducted by the NCFE,
											encourages school students of Class VI to XII, to acquire
											basic financial skills necessary to make informed and
											effective financial decisions throughout each stage of
											their lives.
										</p>
										<p className="mb-3">
											NFLAT was launched in the year 2013-14. Globally, it is
											one of the largest FREE annual financial literacy test for
											school students.
										</p>
										<h1 className="text-lg font-bold leading-10">Why NFLAT?</h1>
										<p className="mb-3">
											Students who are financially literate are better equipped
											to make informed financial decisions, such as how to save
											and spend their money, how to invest their money, and how
											to borrow money. This is important because it can help
											them avoid financial problems in the future. Financial
											scams are on the rise, and students need to be aware of
											them in order to protect themselves. Financial literacy
											can help students learn how to identify and avoid
											financial scams.
										</p>
										<p className="mb-3">
											When students know that they will be assessed on their
											financial knowledge, they are more likely to take the time
											to learn the concepts and through an assessment test, it
											encourages students to take the time to learn about
											financial concepts and develop the skills they need to
											make informed financial decisions
										</p>
										<p className="mb-3">
											In line with OECD recommendation, National Financial
											Literacy Assessment Test (NFLAT) conducted by the NCFE,
											encourages school students of Class VI to XII, to acquire
											basic financial skills necessary to make informed and
											effective financial decisions throughout each stage of
											their lives. The questions generally cover the basic
											concept of Banking, Securities Markets, Insurance and
											Pension.
										</p>
										<p className="mb-3">
											In this regard, we would request you to encourage
											participation among students. The Financially literate
											students can educate others about financial literacy, such
											as their family, friends, and classmates. This can help to
											improve the overall financial literacy of the nation.
										</p>
									</div>
									<div className="my-8">
										<div className="text-center">
											<h5 className="text-xl text-blue-800 font-semibold">
												Test Categories
											</h5>
											<p className="mt-2">
												The test is open for school students of Class VI to XII
												in 3 separate categories:
											</p>
										</div>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center">
										<div className="flex flex-col h-full">
											<div className="bg-white shadow rounded-lg border border-blue-900 flex flex-col h-full">
												<div className="bg-blue-900 text-white text-center py-3 rounded-t-lg">
													<h6 className="text-lg font-normal">NFLAT Junior</h6>
												</div>
												<div className="p-4 flex-grow">
													<ul className="list-disc pl-6">
														<li>For Class 6, 7 and 8 students</li>
														<li>Language: English</li>
														<li>Mode: Only in online (computer-based) mode</li>
													</ul>
												</div>
											</div>
										</div>

										<div className="flex flex-col h-full">
											<div className="bg-white shadow rounded-lg border border-blue-900 flex flex-col h-full">
												<div className="bg-blue-900 text-white text-center py-3 rounded-t-lg">
													<h6 className="text-lg font-normal">
														NFLAT Intermediate
													</h6>
												</div>
												<div className="p-4 flex-grow">
													<ul className="list-disc pl-6">
														<li>For Class 9 and 10 students</li>
														<li>Language: English</li>
														<li>Mode: Only in online (computer-based) mode</li>
													</ul>
												</div>
											</div>
										</div>

										<div className="flex flex-col h-full">
											<div className="bg-white shadow rounded-lg border border-blue-900 flex flex-col h-full">
												<div className="bg-blue-900 text-white text-center py-3 rounded-t-lg">
													<h6 className="text-lg font-normal">NFLAT Senior</h6>
												</div>
												<div className="p-4 flex-grow">
													<ul className="list-disc pl-6">
														<li>For Class 11 and 12 students</li>
														<li>Language: English</li>
														<li>Mode: Only in online (computer-based) mode</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</main>
					</div>
				</div>
				<footer className="bg-gray-100 mt-10 dark:bg-gray-900">
					<div className="lg:px-8 md:justify-between md:items-center md:flex py-4 px-6 max-w-7xl mx-auto">
						<div className="md:order-2 gap-x-6 justify-center flex">
							<a className="text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 hover:text-gray-700r no-underline">
								<span className="sr-only">Facebook</span>
								<svg
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
									className="w-6 h-6"
								>
									<path
										fill-rule="evenodd"
										d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
										clip-rule="evenodd"
									></path>
								</svg>
							</a>
							<a className="text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 hover:text-gray-700r no-underline">
								<span className="sr-only">Instagram</span>
								<svg
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
									className="w-6 h-6"
								>
									<path
										fill-rule="evenodd"
										d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
										clip-rule="evenodd"
									></path>
								</svg>
							</a>
							<a className="text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 hover:text-gray-700r no-underline">
								<span className="sr-only">X</span>
								<svg
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
									className="w-6 h-6"
								>
									<path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"></path>
								</svg>
							</a>
							<a className="text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 hover:text-gray-700r no-underline">
								<span className="sr-only">Youtube</span>
								<svg
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true"
									className="w-6 h-6"
								>
									<path
										fill-rule="evenodd"
										d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
										clip-rule="evenodd"
									></path>
								</svg>
							</a>
						</div>
						<div className="md:mt-0 md:order-1 text-gray-600 text-sm leading-6 text-center mt-8 dark:text-gray-300">
							Copyright © 2024-2025: All Right Reserved
						</div>
					</div>
				</footer>
			</div>
		</>
	);
}
