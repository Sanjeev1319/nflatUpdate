export default function SchoolStatistics({ stats }) {
	return (
		<div className="pb-6">
			<div className="mx-auto max-w-full sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* total Registered Students */}
					<div className="overflow-hidden bg-white shadow sm:rounded-lg border border-gray-300">
						<div className="sm:px-6 py-3 px-4 bg-gray-50 font-medium border-b">
							<p className="text-md leading-6 max-w-3xl mt-1 text-center">
								Total Students Registered
							</p>
						</div>
						<dl className="md:grid-cols-4 grid grid-cols-1 overflow-hidden">
							{/* <div className="lg:col-span-3 col-span-1 border-b "> */}
							<div className="border-r">
								<div className="flex justify-center items-center flex-col py-4">
									<dt className="text-gray-900 font-normal text-base leading-6">
										Total
									</dt>
									<dd className="flex-col flex justify-between items-center mt-1">
										<div className="font-medium text-xl leading-8">
											{stats.registeredStudents}
										</div>
										{/* <div className="font-medium text-md leading-8">
												<span className="bg-blue-600 py-1 px-2 text-white rounded-md">320</span>
												<span> | </span>
												<span className="bg-pink-600 py-1 px-2 text-white rounded-md">180</span>
											</div> */}
									</dd>
								</div>
								<div className="bg-violet-100 px-4 lg:px-6 py-2">
									<div
										className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
									>
									</div>
								</div>
							</div>
							<div className="">
								<div className="flex justify-center items-center flex-col py-4">
									<dt className="text-gray-900 font-normal text-base leading-6">
										Junior
									</dt>
									<dd className="flex-col flex justify-between items-center mt-1">
										<div className="font-medium text-xl leading-8">
											{stats.jrRegisteredStudents}
										</div>
										{/* <div className="font-medium text-md leading-8">
												<span className="bg-blue-600 py-1 px-2 text-white rounded-md">320</span>
												<span> | </span>
												<span className="bg-pink-600 py-1 px-2 text-white rounded-md">180</span>
											</div> */}
									</dd>
								</div>
								<div className="bg-violet-100 px-4 lg:px-6 py-2">
									<div
										className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
									>
									</div>
								</div>
							</div>
							<div className="border-x">
								<div className="flex justify-center items-center flex-col py-4">
									<dt className="text-gray-900 font-normal text-base leading-6">
										Intermediate
									</dt>
									<dd className="lg:flex flex justify-between flex-col items-center mt-1">
										<div className="font-medium text-xl leading-8 flex items-baseline">
											{stats.midRegisteredStudents}
										</div>
										{/* <div className="font-medium text-md leading-8">
												<span className="bg-blue-600 py-1 px-2 text-white rounded-md">320</span>
												<span> | </span>
												<span className="bg-pink-600 py-1 px-2 text-white rounded-md">180</span>
											</div> */}
									</dd>
								</div>
								<div className="bg-violet-100 px-4 lg:px-6 py-2">
									<div
										className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
									>
									</div>
								</div>
							</div>
							<div className="">
								<div className="flex justify-center items-center flex-col py-4">
									<dt className="text-gray-900 font-normal text-base leading-6">
										Senior
									</dt>
									<dd className="lg:flex flex justify-between items-center mt-1 flex-col">
										<div className="font-medium text-xl leading-8 flex items-baseline">
											{stats.srRegisteredStudents}
										</div>
										{/* <div className="font-medium text-md leading-8">
												<span className="bg-blue-600 py-1 px-2 text-white rounded-md">320</span>
												<span> | </span>
												<span className="bg-pink-600 py-1 px-2 text-white rounded-md">180</span>
											</div> */}
									</dd>
								</div>
								<div className="bg-violet-100 px-4 lg:px-6 py-2">
									<div
										className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
									>
									</div>
								</div>
							</div>
						</dl>
					</div>
					{/* Total Students Attempted the exam */}
					<div className="overflow-hidden bg-white shadow sm:rounded-lg border border-gray-300">
						<div className="sm:px-6 py-3 px-4 bg-gray-50 font-medium border-b">
							<p className="text-md leading-6 max-w-3xl mt-1 text-center">
								Student Attempted NFLAT
							</p>
						</div>
						<dl className="md:grid-cols-4 grid grid-cols-1 overflow-hidden">
							{/* <div className="lg:col-span-3 col-span-1 border-b "> */}
							<div className="border-r">
								<div className="flex justify-center items-center flex-col py-4">
									<dt className="text-gray-900 font-normal text-base leading-6">
										Total
									</dt>
									<dd className="flex-col flex justify-between items-center mt-1">
										<div className="font-medium text-xl leading-8">
											{stats.attemptedStudents}
											<span className="text-sm ms-2">
												{stats.attemptedStudents / stats.registeredStudents * 100}%
											</span>
										</div>
										{/* <div className="font-medium text-md leading-8">
												<span className="bg-blue-600 py-1 px-2 text-white rounded-md">320</span>
												<span> | </span>
												<span className="bg-pink-600 py-1 px-2 text-white rounded-md">180</span>
											</div> */}
									</dd>
								</div>
								<div className="bg-violet-100 px-4 lg:px-6 py-2">
									<div
										className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
									>
									</div>
								</div>
							</div>
							<div className="">
								<div className="flex justify-center items-center flex-col py-4">
									<dt className="text-gray-900 font-normal text-base leading-6">
										Junior
									</dt>
									<dd className="flex-col flex justify-between items-center mt-1">
										<div className="font-medium text-xl leading-8">
											{stats.jrAttemptedStudents}
											<span className="text-sm ms-2">
												{stats.jrAttemptedStudents / stats.jrRegisteredStudents * 100}%
											</span>
										</div>
										{/* <div className="font-medium text-md leading-8">
												<span className="bg-blue-600 py-1 px-2 text-white rounded-md">320</span>
												<span> | </span>
												<span className="bg-pink-600 py-1 px-2 text-white rounded-md">180</span>
											</div> */}
									</dd>
								</div>
								<div className="bg-violet-100 px-4 lg:px-6 py-2">
									<div
										className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
									>
									</div>
								</div>
							</div>
							<div className="border-x">
								<div className="flex justify-center items-center flex-col py-4">
									<dt className="text-gray-900 font-normal text-base leading-6">
										Intermediate
									</dt>
									<dd className="lg:flex flex justify-between flex-col items-center mt-1">
										<div className="font-medium text-xl leading-8 flex items-baseline">
											{stats.midAttemptedStudents}
											<span className="text-sm ms-2">
												{stats.midAttemptedStudents / stats.midRegisteredStudents * 100}%
											</span>
										</div>
										{/* <div className="font-medium text-md leading-8">
												<span className="bg-blue-600 py-1 px-2 text-white rounded-md">320</span>
												<span> | </span>
												<span className="bg-pink-600 py-1 px-2 text-white rounded-md">180</span>
											</div> */}
									</dd>
								</div>
								<div className="bg-violet-100 px-4 lg:px-6 py-2">
									<div
										className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
									>
									</div>
								</div>
							</div>
							<div className="">
								<div className="flex justify-center items-center flex-col py-4">
									<dt className="text-gray-900 font-normal text-base leading-6">
										Senior
									</dt>
									<dd className="lg:flex flex justify-between items-center mt-1 flex-col">
										<div className="font-medium text-xl leading-8 flex items-baseline">
											{stats.srAttemptedStudents}
											<span className="text-sm ms-2">
												{stats.srAttemptedStudents / stats.srRegisteredStudents * 100}%
											</span>
										</div>
										{/* <div className="font-medium text-md leading-8">
												<span className="bg-blue-600 py-1 px-2 text-white rounded-md">320</span>
												<span> | </span>
												<span className="bg-pink-600 py-1 px-2 text-white rounded-md">180</span>
											</div> */}
									</dd>
								</div>
								<div className="bg-violet-100 px-4 lg:px-6 py-2">
									<div
										className="flex gap-3 items-center justify-center text-indigo-800 font-medium hover:font-semibold"
									>
									</div>
								</div>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</div>
	)
}
