import ImportKeysTest from "../components/testapi/testkey";
import { useSelector } from "react-redux";

export default function Test() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    if (!isAuthenticated) {
    return (
        <div className="mx-auto max-w-3xl px-4 py-10">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-300">
            <h1 className="mb-2 text-2xl font-semibold tracking-tight">Test</h1>
            <p className="mx-auto mb-6 max-w-md text-sm">
                Vui lòng đăng nhập.
            </p>
            <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-700"
            >
                Đăng nhập
            </Link>
            </div>
        </div>
        );
    }
    return <div className="p-4"><ImportKeysTest /></div>;
}