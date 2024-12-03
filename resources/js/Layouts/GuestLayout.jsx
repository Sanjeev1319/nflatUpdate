import ApplicationLogo from "@/Components/ApplicationLogo";
import FooterLayout from "@/Components/FooterLayout";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
	return (
		<>
			<div className=" text-black/50 dark:bg-black dark:text-white/50">
				<div className="relative flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
					<header className="w-full py-5">
						<div className="flex lg:col-start-2 lg:justify-center">
							<Link href={route('home')}><ApplicationLogo /></Link>
						</div>
					</header>
					<div className="min-h-10 bg-blue-900 w-full text-white flex items-center justify-center text-lg font-medium">
						Registration is Open Now!
					</div>
				</div>
			</div>
			<div className="flex min-h-screen flex-col items-center bg-gray-100">
				<div className="lg:w-9/12 md:w-10/12 w-full">{children}</div>
			</div>
			<FooterLayout />
		</>
	);
}
