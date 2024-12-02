import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Dashboard({ school }) {
	const { data, setData, post, processing, errors, reset, setError } = useForm({
		school_uuid: school.school_uuid,
		incharge_name: school.incharge_name || "",
		incharge_email: school.incharge_email || "",
		incharge_mobile: school.incharge_mobile || "",
		principal_name: school.principal_name || "",
		principal_email: school.principal_email || "",
		principal_mobile: school.principal_mobile || "",

		existing_principal_email: school.principal_email,
		existing_incharge_email: school.incharge_email,
	});

	// Final form submit
	const submit = (e) => {
		e.preventDefault();
		post(route("school.profileEditStore"), data);
	};

	return (
		<AuthenticatedLayout
			header={
				<h2 className="text-xl font-semibold leading-tight text-gray-800">
					Edit School Profile
				</h2>
			}
		>
			<Head title="Edit School Details" />

			<div className="pt-12 pb-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="">
						<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg ring-1 ring-gray-300">
							<form onSubmit={submit}>
								<div className="sm:px-6 py-3 px-4 bg-gray-100 flex justify-between items-center">
									<h3 className="text-gray-900 font-semibold text-base leading-5">
										Edit School Details
									</h3>
								</div>
								<div className="border-t border-gray-200">
									<dl>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium leading-5">
												School ID:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1 font-bold">
												{school.school_uuid}
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium leading-5">
												School Name:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{school.school_name}
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium leading-5">
												School Address:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{school.school_address_line_1}, {school.school_area}
												<br />
												{school.school_district}, {school.school_state} -{" "}
												{school.school_pincode}
												<br />
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium leading-5">
												School Email:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{school.school_email}
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50">
											<dt className="text-gray-900 font-medium leading-5">
												School Mobile Number:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												{school.school_mobile}
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50 flex justify-center items-center">
											<dt className="text-gray-900 font-medium leading-5">
												Incharge Name:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												<TextInput
													id="incharge_name"
													value={data.incharge_name}
													onChange={(e) =>
														setData(
															"incharge_name",
															e.target.value.toUpperCase()
														)
													}
													defaultValue={school.incharge_name}
													required
													className="w-full mt-2"
												/>
												<InputError message={errors.incharge_name} />
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50 flex justify-center items-center">
											<dt className="text-gray-900 font-medium leading-5">
												Incharge Email:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												<TextInput
													id="incharge_email"
													value={data.incharge_email}
													onChange={(e) =>
														setData("incharge_email", e.target.value)
													}
													required
													className="w-full mt-2"
													defaultValue={school.incharge_email}
												/>
												<InputError message={errors.incharge_email} />
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50 flex justify-center items-center">
											<dt className="text-gray-900 font-medium leading-5">
												Incharge Mobile:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												<TextInput
													id="incharge_mobile"
													value={data.incharge_mobile}
													onChange={(e) =>
														setData("incharge_mobile", e.target.value)
													}
													required
													className="w-full mt-2"
													defaultValue={school.incharge_mobile}
												/>
												<InputError message={errors.incharge_mobile} />
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50  flex justify-center items-center">
											<dt className="text-gray-900 font-medium leading-5">
												Principal Name:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												<TextInput
													id="principal_name"
													value={data.principal_name}
													onChange={(e) =>
														setData(
															"principal_name",
															e.target.value.toUpperCase()
														)
													}
													required
													className="w-full mt-2"
													defaultValue={school.principal_name}
												/>
												<InputError message={errors.principal_name} />
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50 flex justify-center items-center">
											<dt className="text-gray-900 font-medium leading-5">
												Principal Mobile:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												<TextInput
													id="principal_mobile"
													value={data.principal_mobile}
													onChange={(e) =>
														setData("principal_mobile", e.target.value)
													}
													required
													className="w-full mt-2"
													defaultValue={school.principal_mobile}
												/>
												<InputError message={errors.principal_mobile} />
											</dd>
										</div>
										<div className="sm:px-6 sm:gap-4 sm:grid sm:grid-cols-3 py-4 px-4 hover:bg-green-50 flex justify-center items-center">
											<dt className="text-gray-900 font-medium leading-5">
												Principal Email:
											</dt>
											<dd className="sm:mt-0 sm:col-span-2 text-gray-700 leading-6 mt-1">
												<TextInput
													id="principal_email"
													value={data.principal_email}
													onChange={(e) =>
														setData("principal_email", e.target.value)
													}
													required
													className="w-full mt-2"
													defaultValue={school.principal_email}
												/>
												<InputError message={errors.principal_email} />
											</dd>
										</div>
									</dl>
								</div>
								<div className="sm:px-6 py-3 px-4 bg-gray-100 text-center">
									<PrimaryButton className="py-3 px-7 mx-4" type="submit">
										SUBMIT
									</PrimaryButton>
									<Link
										className="inline-flex items-center rounded-md border border-transparent bg-red-800 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-900 py-3 px-7 mx-4"
										href={route("school.profileView")}
									>
										Cancel
									</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
