type SkeletonProps = {
    count?: number;
};

export default function Skeleton({ count = 0 }: SkeletonProps) {
    return (
        <>
            {Array.from({ length: count }).map((item, i) => (
                <div
                    key={i}
                    role="status"
                    className="w-full rounded-md border border-gray-200 bg-gray-400 shadow-lg overflow-hidden animate-pulse"
                >

                    <div className="flex items-center justify-center h-70 w-full bg-gray-300">
                        <i className="fa-solid text-3xl text-gray-500 fa-photo-film"></i>
                    </div>


                    <div className="p-4 flex flex-col gap-3">
                        <div className="h-3 bg-gray-300 rounded-full w-24"></div>

                        <div className="h-5 bg-gray-300 rounded-full w-3/4"></div>

                        <div className="flex items-center gap-2">
                            <div className="h-5 bg-gray-300 rounded-full w-16"></div>
                            <div className="h-4 bg-gray-300 rounded-full w-12"></div>
                        </div>

                        <div className="space-y-2">
                            <div className="h-2 bg-gray-300 rounded-full w-full"></div>
                            <div className="h-2 bg-gray-300 rounded-full w-5/6"></div>
                        </div>

                        <div className="flex items-center mt-3">
                            <svg
                                className="w-8 h-8 text-gray-400 me-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>

                            <div className="flex-1">
                                <div className="h-2.5 bg-gray-300 rounded-full w-24 mb-2"></div>
                                <div className="h-2 bg-gray-300 rounded-full w-32"></div>
                            </div>
                        </div>

                        <div className="mt-4 h-10 bg-gray-300 rounded-md w-full"></div>
                    </div>

                    <span className="sr-only">Loading...</span>
                </div>
            ))}
        </>
    );
}