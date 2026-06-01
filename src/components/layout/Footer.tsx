export default function Footer() {
    return (
        <footer className="w-full dark:bg-gray-950 shadow-sm shadow-gray-500 bg-white py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-center mb-10 items-center gap-2">
                        <p className="sm:text-2xl text-center dark:text-gray-400 text-gray-600 font-light mb-4 tracking-tight">Follow us on social media!</p>
                    </div>
                    <div className="flex space-x-10 justify-center items-center mb-15">
                        <a href="#" className="block dark:text-white text-gray-900 transition-all duration-500 hover:text-indigo-600">
                            <i className="fa-brands text-2xl fa-x-twitter"></i>
                        </a>
                        <a href="#" className="block dark:text-white text-gray-900 transition-all duration-500 hover:text-indigo-600">
                            <i className="fa-brands text-2xl fa-instagram"></i>
                        </a>
                        <a href="#" className="block dark:text-white text-gray-900 transition-all duration-500 hover:text-indigo-600">
                            <i className="fa-brands text-2xl fa-facebook-f"></i>
                        </a>
                        <a href="#" className="block dark:text-white text-gray-900 transition-all duration-500 hover:text-indigo-600">
                            <i className="fa-brands text-2xl fa-youtube"></i>
                        </a>
                    </div>
                    
                    <span className="text-lg  dark:text-gray-400 text-gray-500 text-center block">© ModeX 2026, All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}