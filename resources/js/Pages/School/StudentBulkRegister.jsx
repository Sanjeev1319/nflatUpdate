import { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function StudentBulkRegister({
	import_errors = [],
	success_message,
}) {
	const { data, setData, post, errors, reset, setError } = useForm({
		file: null, // Add file to the data state
	});

	const [message, setMessage] = useState("");
	const [validationErrors, setValidationErrors] = useState([]); // For row-specific errors

	// Handle file change
	const handleFileChange = (e) => {
		setData("file", e.target.files[0]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!data.file) {
			setMessage("Please select a file to upload.");
			return;
		}

		// POST request to upload file
		post(route("upload-students"), data, {
			onSuccess: (response) => {
				setMessage(response.message || "File uploaded successfully.");
				reset(); // Reset form fields
			},
			onError: (response) => {
				setMessage("An error occurred during file upload.");
				reset(); // Reset form fields
			},
		});
	};

	return (
		<AuthenticatedLayout
			header={
				<h2 className="text-xl font-semibold leading-tight text-gray-800">
					Student Bulk Registration
				</h2>
			}
		>
			<Head title="Dashboard" />

			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
						<div className="p-6 text-gray-900">
							{import_errors && import_errors.length > 0 ? (
								<>
									<Link
										href={route("school.studentBulkRegister")}
										className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 text-center"
									>
										Reupload
									</Link>
								</>
							) : (
								<form onSubmit={handleSubmit}>
									{/* File Input */}
									<input
										class="m-0 min-w-0 cursor-pointer rounded-md border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:bg-gray-200 file:cursor-pointer file:overflow-hidden file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white"
										type="file"
										name="file"
										onChange={handleFileChange}
										accept=".xlsx, .csv"
									/>
									<PrimaryButton type="submit" className="mx-4">
										Upload
									</PrimaryButton>
								</form>
							)}

							<div className="mt-4">
								<a
									href="/storage/samples/student_bulk_register.xlsx"
									download
									className="text-green-700 underline hover:text-green-900 hover:font-semibold"
								>
									Click Here to Download the Sample file
								</a>
							</div>

							{/* Message Display */}
							{import_errors && import_errors.length > 0 && (
								<div className="mt-6">
									<h4 className="text-red-500 font-bold">
										Errors in Uploaded File:
									</h4>
									<table className="min-w-full border-collapse border border-gray-200">
										<thead>
											<tr>
												<th className="border border-gray-300 px-4 py-2">
													Row
												</th>
												<th className="border border-gray-300 px-4 py-2">
													Data
												</th>
												<th className="border border-gray-300 px-4 py-2">
													Errors
												</th>
											</tr>
										</thead>
										<tbody>
											{import_errors.map((error, index) => (
												<tr key={index}>
													<td className="border border-gray-300 px-4 py-2 text-center">
														{error.row}
													</td>
													<td className="border border-gray-300 px-4 py-2">
														<pre className="text-sm">
															{Object.entries(error.data).map(
																([key, value]) => (
																	<div key={key}>
																		<strong>{key}:</strong> {value || "N/A"}
																	</div>
																)
															)}
														</pre>
													</td>
													<td className="border border-gray-300 px-4 py-2 text-red-500">
														<ul className="list-disc list-inside">
															{error.errors.map((err, idx) => (
																<li key={idx}>{err}</li>
															))}
														</ul>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
