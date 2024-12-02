export default function StudentDetails({ studentData }) {
	return (
		<>
			<div className="py-8">
				<div className="mx-auto sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-7 grid-cols-1 gap-4">
						{/* <pre>{JSON.stringify(studentData, undefined, 2)}</pre> */}
						<div className="col-span-4">
							<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
								<div className="sm:px-6 py-3 px-4">
									<h3 className="text-gray-900 font-semibold text-lg leading-5">
										Student Details
									</h3>
									<p className="text-gray-500 text-sm leading-6 max-w-3xl mt-1">
										Personal details and application.
									</p>
								</div>
								<div className="border-t border-gray-200 pb-4">
									<dl>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-2 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium text-sm leading-5">
												Student Name:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{studentData.data.student_name}
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium text-sm leading-5">
												Class:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{studentData.data.student_class} /{" "}
												{studentData.data.student_section}
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium text-sm leading-5">
												NFLAT Category:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{studentData.data.nflat_category}
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium text-sm leading-5">
												Date of Birth:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{studentData.data.date_of_birth}
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium text-sm leading-5">
												Gender:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{studentData.data.gender}
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium text-sm leading-5">
												Parent Name:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{studentData.data.parent_name}
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium text-sm leading-5">
												Parent Email ID:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{studentData.data.parent_email_id}
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium text-sm leading-5">
												Parent Mobile Number:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{studentData.data.parent_mobile_number}
											</dd>
										</div>
									</dl>
								</div>
							</div>
						</div>
						<div className="col-span-3">
							<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
								<div className="sm:px-6 py-3 px-4">
									<h3 className="text-gray-900 font-semibold text-base leading-5">
										School Details
									</h3>
									<p className="text-gray-500 text-sm leading-6 max-w-3xl mt-1">
										School Details
									</p>
								</div>
								<div className="border-t border-gray-200 pb-4">
									<dl>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium text-sm leading-5">
												School Name:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{studentData.data.school_uuid.school_name}
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium text-sm leading-5">
												School Address:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{studentData.data.school_uuid.school_address_line_1},{" "}
												{studentData.data.school_uuid.school_area}
												<br />
												{studentData.data.school_uuid.school_district},{" "}
												{studentData.data.school_uuid.school_state} -{" "}
												{studentData.data.school_uuid.school_pincode}
												<br />
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium text-sm leading-5">
												Incharge Name:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{studentData.data.school_uuid.incharge_name}
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium text-sm leading-5">
												Principal Name:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{studentData.data.school_uuid.principal_name}
											</dd>
										</div>
									</dl>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
