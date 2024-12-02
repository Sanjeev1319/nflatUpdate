import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Register() {
	const { data, setData, post, processing, errors, reset, setError } = useForm({
		school_name: "",
		school_email: "",
		school_email_otp: "",
		school_mobile: "",
		school_mobile_otp: "",
		incharge_name: "",
		incharge_email: "",
		incharge_mobile: "",
		principal_name: "",
		principal_email: "",
		principal_mobile: "",
		school_address_line_1: "",
		school_area: "",
		school_pincode: "",
		school_district: "",
		school_state: "",
	});

	const [emailOtpSent, setEmailOtpSent] = useState(false);
	const [emailVerified, setEmailVerified] = useState(false);
	const [mobileOtpSent, setMobileOtpSent] = useState(false);
	const [mobileVerified, setMobileVerified] = useState(false);
	const [emailTimer, setEmailTimer] = useState(30); // 30 seconds timer for email OTP resend
	const [mobileTimer, setMobileTimer] = useState(30); // 30 seconds timer for mobile OTP resend

	const [areaOptions, setAreaOptions] = useState([]); // Store fetched areas
	const [districtOptions, setDistrictOptions] = useState([]); // Store fetched areas
	const [stateOptions, setStateOptions] = useState([]); // Store fetched areas
	const [pincodeError, setPincodeError] = useState(""); // For pincode-related errors

	const fetchPincodeDetails = async (pincode) => {
		if (pincode.length === 6) {
			try {
				const response = await axios.get(`/fetch-pincode-details`, {
					params: { pincode },
				});

				setStateOptions(response.data.state);
				setDistrictOptions(response.data.district);
				setAreaOptions(response.data.areas);
				setPincodeError(""); // Clear any previous errors
			} catch (error) {
				setPincodeError(
					error.response?.data?.message || "Error fetching pincode details"
				);
				setStateOptions([]);
				setDistrictOptions([]);
				setAreaOptions([]);
			}
		}
	};

	const handlePincodeChange = (e) => {
		const pincode = e.target.value;
		setData("school_pincode", pincode);

		// Only fetch details if the pincode is 6 digits
		if (pincode.length === 6) {
			fetchPincodeDetails(pincode);
		} else {
			// Clear state, district, and area if pincode is not valid
			setData("school_state", "");
			setData("school_district", "");
			setData("school_area", "");
		}
	};

	// Set timer countdown
	useEffect(() => {
		let emailTimerInterval, mobileTimerInterval;
		if (emailOtpSent && !emailVerified && emailTimer > 0) {
			emailTimerInterval = setInterval(() => {
				setEmailTimer((prev) => prev - 1);
			}, 1000);
		}
		if (mobileOtpSent && !mobileVerified && mobileTimer > 0) {
			mobileTimerInterval = setInterval(() => {
				setMobileTimer((prev) => prev - 1);
			}, 1000);
		}

		return () => {
			clearInterval(emailTimerInterval);
			clearInterval(mobileTimerInterval);
		};
	}, [emailOtpSent, mobileOtpSent, emailTimer, mobileTimer]);

	const sendEmailOtp = (e) => {
		e.preventDefault();

		// Send the request with the email converted to "email"
		post(route("sendEmailOtp", { email: data.school_email }), {
			preserveState: true, // Prevent page state from resetting
			preserveScroll: true, // Prevent page scroll position from resetting
			// email: data.school_email,  // Use 'email' instead of 'school_email'
			onSuccess: (success) => {
				setEmailOtpSent(true);
				setError({
					school_email:
						success.message || "OTP sent successfully to your email.",
				});
				setEmailTimer(30); // Reset email timer to 30 seconds
			},
			onError: (errors) => {
				if (errors.email) {
					setError({
						school_email: errors.email || "Error occurred while sending OTP.",
					});
				} else {
					setError({
						school_email: "Unknown error occurred. Please try again.",
					});
				}
			},
		});
	};

	const resendEmailOtp = (e) => {
		e.preventDefault();
		setEmailOtpSent(false); // Reset email OTP sent status
		sendEmailOtp(e); // Resend the OTP by calling the sendEmailOtp function again
	};

	const verifyEmailOtp = (e) => {
		e.preventDefault();

		// Send the request with the email
		post(route("verifyEmailOtp", { otp: data.school_email_otp }), {
			preserveState: true, // Prevent page state from resetting
			preserveScroll: true, // Prevent page scroll position from resetting
			onSuccess: (success) => {
				setEmailVerified(true);
			},
			onError: (errors) => {
				if (errors.otp) {
					setError({
						school_email_otp:
							errors.otp || "Error occurred while verifying OTP.",
					});
				} else {
					setError({
						school_email_otp: "Unknown error occurred. Please try again.",
					});
				}
			},
		});
	};

	const sendMobileOtp = (e) => {
		e.preventDefault();

		post(route("sendMobileOtp", { mobile: data.school_mobile }), {
			preserveState: true, // Prevent page state from resetting
			preserveScroll: true, // Prevent page scroll position from resetting
			onSuccess: (success) => {
				setMobileOtpSent(true);
				setError({
					school_mobile:
						success.message || "OTP sent successfully to your mobile.",
				});
				setMobileTimer(30); // Reset email timer to 30 seconds
			},
			onError: (errors) => {
				if (errors.mobile) {
					setError({
						school_mobile: errors.mobile || "Error occurred while sending OTP.",
					});
				} else {
					setError({
						school_mobile: "Unknown error occurred. Please try again.",
					});
				}
			},
		});
	};

	const verifyMobileOtp = (e) => {
		e.preventDefault();

		// Send the request with the mobile
		post(route("verifyMobileOtp", { otp: data.school_mobile_otp }), {
			preserveState: true, // Prevent page state from resetting
			preserveScroll: true, // Prevent page scroll position from resetting
			onSuccess: (success) => {
				setMobileVerified(true);
			},
			onError: (errors) => {
				if (errors.otp) {
					setError({
						school_mobile_otp:
							errors.otp || "Error occurred while verifying OTP.",
					});
				} else {
					setError({
						school_mobile_otp: "Unknown error occurred. Please try again.",
					});
				}
			},
		});
	};

	const resendMobileOtp = (e) => {
		e.preventDefault();
		setMobileOtpSent(false); // Reset Mobile OTP sent status
		sendMobileOtp(e); // Resend the OTP by calling the sendMobileOtp function again
	};

	// Final form submit
	const submit = (e) => {
		e.preventDefault();
		post(route("school.register"), data);
	};

	return (
		<GuestLayout>
			<Head title="Register School" />
			<div className="lg:px-8 py-10 sm:px-6 lg:max-w-5xl sm:w-full mx-auto">
				<form
					onSubmit={submit}
					// className="md:grid-cols-3 gap-y-8 gap-x-8 grid-cols-1 grid"
				>
					{/* <div className="sm:px-0 px-4">School Details</div> */}
					<div className="md:col-span-2 sm:rounded-lg ring-gray-900/5 ring-1 ring-offset-1 bg-white">
						<h1 className="flex justify-center py-4 text-xl font-medium bg-gray-50 border-b border-gray-200 text-indigo-800">
							School Registration Form
						</h1>
						<div className="px-10 py-7">
							<div className="mb-6">
								<InputLabel htmlFor="school_name" className="">
									School Name
								</InputLabel>
								<TextInput
									id="school_name"
									value={data.school_name}
									onChange={(e) =>
										setData("school_name", e.target.value.toUpperCase())
									}
									required
									className="w-full mt-2"
								/>
								<InputError message={errors.school_name} />
							</div>

							<div className="mb-6">
								<InputLabel>School Address: </InputLabel>
								<InputLabel
									htmlFor="school_address_line_1"
									className="text-sm font-normal"
								>
									Address Line 1
								</InputLabel>
								<TextInput
									id="school_address_line_1"
									value={data.school_address_line_1}
									onChange={(e) =>
										setData("school_address_line_1", e.target.value)
									}
									required
									className="w-full mt-2"
								/>
								<InputError message={errors.school_address_line_1} />
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
								<div>
									<InputLabel
										htmlFor="school_pincode"
										className="text-sm font-normal"
									>
										Pincode
									</InputLabel>
									<TextInput
										id="school_pincode"
										value={data.school_pincode}
										// onChange={(e) => setData("school_pincode", e.target.value)}
										onChange={handlePincodeChange}
										required
										className="w-full mt-2"
									/>
									<InputError message={errors.school_pincode} />
									{/* <InputError message={pincodeError || errors.school_pincode} /> */}
								</div>
								<div>
									<InputLabel
										htmlFor="school_area"
										className="text-sm font-normal"
									>
										Area
									</InputLabel>
									<SelectInput
										id="school_area"
										value={data.school_area}
										onChange={(e) => setData("school_area", e.target.value)}
										required
										className="w-full mt-2"
									>
										<option value="">Select Area</option>
										{areaOptions.map((area, index) => (
											<option key={index} value={area}>
												{area}
											</option>
										))}
									</SelectInput>
									<InputError message={errors.school_area} />
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
								<div>
									<InputLabel
										htmlFor="school_district"
										className="text-sm font-normal"
									>
										District
									</InputLabel>
									<SelectInput
										id="school_district"
										value={data.school_district}
										onChange={(e) => setData("school_district", e.target.value)}
										required
										className="w-full mt-2"
									>
										<option value="">Select District</option>
										{districtOptions.map((district, index) => (
											<option key={index} value={district}>
												{district}
											</option>
										))}
									</SelectInput>
									<InputError message={errors.school_district} />
								</div>
								<div>
									<InputLabel
										htmlFor="school_state"
										className="text-sm font-normal"
									>
										State
									</InputLabel>
									<SelectInput
										id="school_state"
										value={data.school_state}
										onChange={(e) => setData("school_state", e.target.value)}
										required
										className="w-full mt-2"
									>
										<option value="">Select State</option>
										{stateOptions.map((state, index) => (
											<option key={index} value={state}>
												{state}
											</option>
										))}
									</SelectInput>
									<InputError message={errors.school_state} />
								</div>
							</div>

							<div className="mb-6">
								<InputLabel htmlFor="school_email" value="School Email" />
								<TextInput
									id="school_email"
									type="email"
									value={data.school_email}
									onChange={(e) => setData("school_email", e.target.value)}
									disabled={emailOtpSent || emailVerified}
									className="w-full mt-2 md:w-3/6 me-4 mb-4"
									required
								/>
								{!emailOtpSent && !emailVerified && (
									<PrimaryButton onClick={sendEmailOtp}>Send OTP</PrimaryButton>
								)}
								{emailVerified && (
									<span className="text-green-800 md:2/6 font-bold">
										Email Verified.
									</span>
								)}
								{emailOtpSent && !emailVerified && (
									<>
										<TextInput
											id="school_email_otp"
											type="text"
											value={data.school_email_otp}
											onChange={(e) =>
												setData("school_email_otp", e.target.value)
											}
											className="md:w-1/6 me-4 mb-4"
											required
										/>
										<PrimaryButton
											onClick={verifyEmailOtp}
											className="md:w-1/6 me-4 mb-4"
										>
											Verify OTP
										</PrimaryButton>
										<div>
											{emailTimer > 0 ? (
												<p>Resend OTP in {emailTimer}s</p>
											) : (
												<PrimaryButton onClick={resendEmailOtp}>
													Resend OTP
												</PrimaryButton>
											)}
										</div>
									</>
								)}
								<InputError message={errors.school_email} />
								<InputError message={errors.school_email_otp} />
							</div>

							<div>
								<InputLabel htmlFor="school_mobile" value="School Mobile" />
								<TextInput
									id="school_mobile"
									type="text"
									value={data.school_mobile}
									onChange={(e) => setData("school_mobile", e.target.value)}
									disabled={mobileOtpSent || mobileVerified}
									className="w-full mt-2 md:w-3/6 me-4 mb-4"
									required
								/>
								{!mobileOtpSent && !mobileVerified && (
									<PrimaryButton onClick={sendMobileOtp}>
										Send OTP
									</PrimaryButton>
								)}
								{mobileVerified && (
									<span className="text-green-800 md:2/6 font-bold">
										Mobile Verified.
									</span>
								)}
								{mobileOtpSent && !mobileVerified && (
									<>
										<TextInput
											id="school_mobile_otp"
											type="text"
											value={data.school_mobile_otp}
											onChange={(e) =>
												setData("school_mobile_otp", e.target.value)
											}
											className="md:w-1/6 me-4 mb-4"
											required
										/>
										<PrimaryButton
											onClick={verifyMobileOtp}
											className="md:w-1/6 me-4 mb-4"
										>
											Verify OTP
										</PrimaryButton>
										<div>
											{mobileTimer > 0 ? (
												<p>Resend OTP in {mobileTimer}s</p>
											) : (
												<PrimaryButton onClick={resendMobileOtp}>
													Resend OTP
												</PrimaryButton>
											)}
										</div>
									</>
								)}
								<InputError message={errors.school_mobile} />
								<InputError message={errors.school_mobile_otp} />
							</div>
							<hr className="mb-6" />
							{/* Incharge Details */}
							<div className="mb-6">
								<InputLabel htmlFor="incharge_name" className="">
									Incharge Name
								</InputLabel>
								<TextInput
									id="incharge_name"
									value={data.incharge_name}
									onChange={(e) =>
										setData("incharge_name", e.target.value.toUpperCase())
									}
									required
									className="w-full mt-2"
								/>
								<InputError message={errors.incharge_name} />
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
								<div>
									<InputLabel htmlFor="incharge_mobile">
										Incharge Mobile Number
									</InputLabel>
									<TextInput
										id="incharge_mobile"
										value={data.incharge_mobile}
										onChange={(e) => setData("incharge_mobile", e.target.value)}
										required
										className="w-full mt-2"
									/>
									<InputError message={errors.incharge_mobile} />
								</div>
								<div>
									<InputLabel htmlFor="incharge_email">
										Incharge Email ID
									</InputLabel>
									<TextInput
										id="incharge_email"
										value={data.incharge_email}
										onChange={(e) => setData("incharge_email", e.target.value)}
										required
										className="w-full mt-2"
									/>
									<InputError message={errors.incharge_email} />
								</div>
							</div>
							<hr className="mb-6" />
							{/* principal Details */}
							<div className="mb-6">
								<InputLabel htmlFor="principal_name" className="">
									Principal Name
								</InputLabel>
								<TextInput
									id="principal_name"
									value={data.principal_name}
									onChange={(e) =>
										setData("principal_name", e.target.value.toUpperCase())
									}
									required
									className="w-full mt-2"
								/>
								<InputError message={errors.principal_name} />
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
								<div>
									<InputLabel htmlFor="principal_mobile">
										Principal Mobile Number
									</InputLabel>
									<TextInput
										id="principal_mobile"
										value={data.principal_mobile}
										onChange={(e) =>
											setData("principal_mobile", e.target.value)
										}
										required
										className="w-full mt-2"
									/>
									<InputError message={errors.principal_mobile} />
								</div>
								<div>
									<InputLabel htmlFor="principal_email">
										Principal Email ID
									</InputLabel>
									<TextInput
										id="principal_email"
										value={data.principal_email}
										onChange={(e) => setData("principal_email", e.target.value)}
										required
										className="w-full mt-2"
									/>
									<InputError message={errors.principal_email} />
								</div>
							</div>
						</div>
						<div className="sm:px-8 py-4 px-4 border-gray-900/10 border-t gap-6 justify-center items-center flex">
							<PrimaryButton
								disabled={!emailVerified || !mobileVerified}
								type="submit"
								className="py-3 px-6"
							>
								Register
							</PrimaryButton>
						</div>
					</div>
				</form>
			</div>
		</GuestLayout>
	);
}
