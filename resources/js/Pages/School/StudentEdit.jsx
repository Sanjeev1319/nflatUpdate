import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function StudentEdit({ nflatCategories, student }) {
	const { data, setData, post, processing, errors, reset, setError } = useForm({
		name: student.data.student_name || "",
		section: student.data.student_section || "",
		dob: student.data.date_of_birth || "",
		gender: student.data.gender || "",
		parent_name: student.data.parent_name || "",
		parent_email: student.data.parent_email_id || "",
		parent_mobile: student.data.parent_mobile_number || "",
		class: student.data.student_class || "",
	});

	const [selectedCategoryName, setSelectedCategoryName] = useState("");

	// Function to handle category change
	const handleCategoryChange = (e) => {
		const selectedClass = e.target.value;
		setData((prevData) => ({
			...prevData,
			class: selectedClass, // Update class selection
		}));

		// Find the corresponding category based on selected class
		const category = nflatCategories.find(
			(category) => category.class === selectedClass
		);

		if (category) {
			setSelectedCategoryName(category.category); // Display the category name from the selected class
		} else {
			setSelectedCategoryName(""); // If no category is found, reset the category name
		}
	};

	// Final form submit
	const handleSubmit = (e) => {
		e.preventDefault();
		post(route("school.studentEditStore", { id: student.data.id }), data);
	};

	return (
		<AuthenticatedLayout
			header={
				<h2 className="text-xl font-semibold leading-tight text-gray-800">
					Edit Student Details
				</h2>
			}
		>
			<Head title="Dashboard" />
			{/* <pre>{JSON.stringify(student.data, undefined, 2)}</pre> */}

			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-12">
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<InputLabel htmlFor="name" className="">
									Student Name
								</InputLabel>
								<TextInput
									id="name"
									value={"data.name"}
									onChange={(e) =>
										setData("name", e.target.value.toUpperCase())
									}
									className="w-full mt-2"
									defaultValue={data.name}
								/>
								<InputError message={errors.name} />
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
								<div>
									<InputLabel htmlFor="class" className="">
										Class
									</InputLabel>
									<SelectInput
										id="class"
										value={data.class}
										defaultValue={data.class}
										onChange={handleCategoryChange}
										className="w-full mt-2"
									>
										<option value="">Select Class</option>
										{nflatCategories.map((nflatCategory) => (
											<option
												key={nflatCategory.class}
												value={nflatCategory.class}
											>
												{nflatCategory.class}{" "}
											</option>
										))}
									</SelectInput>
									<InputError message={errors.class} />
								</div>

								<div>
									<InputLabel htmlFor="section" className="">
										Section
									</InputLabel>
									<SelectInput
										id="section"
										value={data.section}
										defaultValue={data.section}
										onChange={(e) => setData("section", e.target.value)}
										className="w-full mt-2"
									>
										<option value="">Select Section</option>
										<option value="A">A</option>
										<option value="B">B</option>
										<option value="C">C</option>
										<option value="D">D</option>
										<option value="E">E</option>
										<option value="F">F</option>
										<option value="G">G</option>
									</SelectInput>
									<InputError message={errors.section} />
								</div>

								<div>
									{/* Display selected category name */}
									{selectedCategoryName && (
										<>
											<div className="font-semibold mb-4">NFLAT Category: </div>
											<p>{selectedCategoryName}</p>
										</>
									)}
								</div>

								<div>
									<InputLabel htmlFor="gender" className="">
										Gender
									</InputLabel>
									<SelectInput
										id="gender"
										value={data.gender}
										defaultValue={data.gender}
										onChange={(e) => setData("gender", e.target.value)}
										className="w-full mt-2"
									>
										<option value="">Select Gender</option>
										<option value="Male">Male</option>
										<option value="Female">Female</option>
										<option value="Other">Other</option>
									</SelectInput>
									<InputError message={errors.gender} />
								</div>

								<div>
									<InputLabel htmlFor="dob" className="">
										Date of Birth
									</InputLabel>
									<TextInput
										type="date"
										id="dob"
										value={data.dob}
										defaultValue={data.dob}
										onChange={(e) => setData("dob", e.target.value)}
										className="w-full mt-2"
									/>
									<InputError message={errors.dob} />
								</div>
							</div>

							<div className="mb-4">
								<InputLabel htmlFor="parent_name" className="">
									Parent/Guardian Name
								</InputLabel>
								<TextInput
									id="parent_name"
									value={data.parent_name}
									defaultValue={data.parent_name}
									onChange={(e) =>
										setData("parent_name", e.target.value.toUpperCase())
									}
									className="w-full mt-2"
								/>
								<InputError message={errors.parent_name} />
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
								<div>
									<InputLabel htmlFor="parent_email" className="">
										Parent/Guardian Email
									</InputLabel>
									<TextInput
										type="email"
										id="parent_email"
										value={data.parent_email}
										defaultValue={data.parent_email}
										onChange={(e) => setData("parent_email", e.target.value)}
										className="w-full mt-2"
									/>
									<InputError message={errors.parent_email} />
								</div>

								<div>
									<InputLabel htmlFor="parent_mobile" className="">
										Parent/Guardian Mobile
									</InputLabel>
									<TextInput
										id="parent_mobile"
										value={data.parent_mobile}
										defaultValue={data.parent_mobile}
										onChange={(e) => setData("parent_mobile", e.target.value)}
										className="w-full mt-2"
									/>
									<InputError message={errors.parent_mobile} />
								</div>
							</div>
							<div className="text-center">
								<PrimaryButton
									type="submit"
									className="w-40 justify-center py-3"
								>
									Submit
								</PrimaryButton>
							</div>
						</form>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
