export default function LoginLayout({ formTitle, children }) {
	return (
		<>
			<div className="bg-slate-100 flex flex-col min-h-screen">
				<div className="flex-1 min-h-full flex">
					<div className="px-4 justify-center flex flex-col flex-1 lg:px-20 lg:flex-none sm:px-6">
						<div className="lg:w-96 max-w-96 w-full mx-auto">
							<div>
								<img
									alt="NCFE: NFLAT"
									src={"/storage/ncfe_logos/nflat_logo.png"}
									className="w-100"
								/>
								<h2 className="text-gray-900 tracking-tighter font-bold text-2xl mt-8 text-center">
									{formTitle}
								</h2>
								<div className="mt-10">
									<div> {children} </div>
								</div>
							</div>
						</div>
					</div>
					<div className="lg:block flex-1 w-0 hidden relative">
						<img
							src={"/storage/ncfe_logos/photo.jpeg"}
							className="object-cover w-full h-full inset-0 absolute"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
