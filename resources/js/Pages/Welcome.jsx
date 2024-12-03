import ApplicationLogo from "@/Components/ApplicationLogo";
import SchoolLoginLayout from "@/Components/SchoolLoginLayout";
import FooterLayout from "@/Components/FooterLayout";
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
				<div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white pb-10">
					<header className="w-full py-5">
						<div className="flex lg:col-start-2 lg:justify-center">
							<Link href={route('home')}><ApplicationLogo /></Link>
						</div>
					</header>
					<div className="min-h-10 bg-blue-900 w-full text-white flex items-center justify-center text-lg font-medium">
						Registration is Open Now!
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden items-stretch">
						<div className="lg:col-span-2 h-full">
							<img src={"/storage/ncfe_logos/nflat-banner.png"} />
						</div>
						<div className="col-span-1 bg-white flex flex-col justify-between h-full">
							<div className="px-10">
								<h2 className="text-center my-4 leading-10 text-2xl font-medium text-black">
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
									className="inline-flex items-center py-4 border border-transparent bg-indigo-800 px-2 justify-center text-sm font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-900 items-center text-center"
								>
									Register your School
								</Link>
								<Link
									// href={route("school.register")}
									className="inline-flex items-center py-4 border border-transparent bg-orange-600 px-2 justify-center text-sm font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-orange-500 focus:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 active:bg-orange-700 text-center items-center"
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
				<FooterLayout />
			</div>
		</>
	);
}
