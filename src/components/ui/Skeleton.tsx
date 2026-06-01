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
                    className="w-full rounded-md  bg-gray-400 shadow-lg overflow-hidden animate-pulse"
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