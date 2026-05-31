type ModalProps = {

    message: string;
    onClose: () => void;

};
import Button from "@/components/ui/Button";
export default function Modal({ message, onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4">
                <p className="text-gray-600 text-center dark:text-gray-300 mb-6">
                    {message}
                </p>
                <Button
                    onClick={onClose}
                    className="w-full dark:bg-gray-800 dark:text-white py-2 rounded-lg font-medium"
                >
                    OK
                </Button>
            </div>
        </div>
    );
}