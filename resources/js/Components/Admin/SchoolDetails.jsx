export default function SchoolDetails({ schoolData }) {
	return (
		<div className="py-6">
			<div className="mx-auto max-w-full sm:px-6 lg:px-8">
				<div className="overflow-hidden bg-white shadow border border-gray-300 sm:rounded-lg grid grid-cols-1 md:grid-cols-2">
					{/* School Address */}
					<div className="border-r">
						<div className="sm:px-6 py-3 px-4 bg-gray-50  font-medium">
							<p className="text-md leading-6 max-w-3xl mt-1">
								School Address
							</p>
						</div>
						<div className="border-t border-gray-200 pb-4">
							<dl>
								<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										School ID:
									</dt>
									<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{schoolData.data.school_uuid}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										School Name:
									</dt>
									<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{schoolData.data.school_name}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										School Address:
									</dt>
									<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{schoolData.data.school_address_line_1},{" "}
										{schoolData.data.school_area},
										<br />
										{schoolData.data.school_district},{" "}
										{schoolData.data.school_state} -{" "}
										{schoolData.data.school_pincode}
										<br />
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Board:
									</dt>
									<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{schoolData.data.school_board}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Verified School Email:
									</dt>
									<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{schoolData.data.school_email}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50 md:border-none sm:border-b">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Verified School Mobile:
									</dt>
									<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{schoolData.data.school_mobile}
									</dd>
								</div>

							</dl>
						</div>
					</div>
					{/* school Incharge Details */}
					<div className="">
						<div className="sm:px-6 py-3 px-4 bg-gray-50  font-medium">
							<p className="text-md leading-6 max-w-3xl mt-1">
								School Incharge and Principal Contact
							</p>
						</div>
						<div className="border-t border-gray-200 pb-4">
							<dl>
								<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Incharge Name:
									</dt>
									<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{schoolData.data.incharge_name}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Incharge Email ID:
									</dt>
									<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{schoolData.data.incharge_email}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50 border-b">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Incharge Mobile Number:
									</dt>
									<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{schoolData.data.incharge_mobile}
									</dd>
								</div>

								<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Principal Name:
									</dt>
									<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{schoolData.data.principal_name}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Principal Email:
									</dt>
									<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{schoolData.data.principal_email}
									</dd>
								</div>
								<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
									<dt className="text-gray-900 font-medium text-sm leading-5">
										Principal Mobile Number:
									</dt>
									<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 text-sm">
										{schoolData.data.principal_mobile}
									</dd>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
