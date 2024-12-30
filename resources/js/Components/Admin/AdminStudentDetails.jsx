export default function AdminStudentDetails({ studentData }) {
	const data = studentData.data;

	return (
		<div className="py-6">
			<div className="mx-auto max-w-full sm:px-6 lg:px-8">
				<div className="overflow-hidden bg-white shadow border border-gray-300 sm:rounded-lg">
					{/* Student Address */}
					<div className="border-r">
						<div className="sm:px-6 py-3 px-4 bg-gray-50  font-medium">
							<p className="text-md leading-6 mt-1 text-center">
								Student details
							</p>
						</div>
						<div className="border-t border-gray-200 pb-4">
							<dl>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Student ID:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{data.student_uuid}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Student Name:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{data.student_name}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Student Address:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{data.student_class} / {data.student_section},
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										NFLAT Category:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{data.nflat_category}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Date of Birth:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{data.date_of_birth}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50 md:border-none sm:border-b">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Gender:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{data.gender}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50 md:border-none sm:border-b">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Parent Name:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{data.parent_name}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50 md:border-none sm:border-b">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Parent Email ID:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{data.parent_email_id}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50 md:border-none sm:border-b">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Parent Mobile Number:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{data.parent_mobile_number}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 grid grid-cols-3 py-2 px-4 hover:bg-green-50 md:border-none sm:border-b">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Password:
									</dt>
									<dd className="sm:mt-0 col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{data.password}
									</dd>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
