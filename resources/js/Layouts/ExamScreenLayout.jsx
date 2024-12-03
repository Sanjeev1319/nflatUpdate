import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link, usePage } from "@inertiajs/react";

export default function ExamScreenLayout({ header, children, pageScreen }) {
	const user = usePage().props.auth.user;

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="border-b border-gray-100 bg-white">
				<div className="mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 md:grid-cols-3 py-4 items-center">
						<div className="text-center w-full">
							<div className="flex items-center">
								<Link href={route("student.index")}>
									<img
										src="/storage/ncfe_logos/Homepage_Top_logo.png"
										class="w-4/6"
									/>
								</Link>
							</div>
						</div>

						<div className="sm:-my-px mx-auto w-full items-center justify-center col-span-2 md:col-span-1 hidden md:flex">
							{pageScreen}
						</div>
						<div className="sm:-my-px flex items-center justify-end">
							<div>
								<Link
									href={route("student.logout")}
									className="flex items-center space-x-2 text-red-500 font-bold"
								>
									<span>Log Out</span>
									<ArrowRightStartOnRectangleIcon className="h-6" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</nav>

			{header && (
				<header className="bg-white shadow">
					<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
						{/* {user && <pre>{JSON.stringify(user, null, 2)}</pre>} */}
						{header}
					</div>
				</header>
			)}

			<main>{children}</main>
		</div>
	);
}
