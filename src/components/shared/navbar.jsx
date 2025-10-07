import { Link, NavLink } from "react-router-dom";
import { PiShoppingCartSimpleLight } from 'react-icons/pi';

export default function Navbar() {
  return (
    <div className="w-full h-[64px] sticky top-0 bg-white text-black z-50 shadow-lg flex justify-between">
      {/* Left: Logo + Brand */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2"
          aria-label="S3 Manager Home"
        >
          <span className="font-semibold tracking-tight">
            S3 Manager
          </span>
        </Link>
      </div>

      {/* <div className="flex items-center gap-2">
        <button
          type="button"
          className="
            relative
            inline-flex items-center gap-2
            h-10 px-3
            rounded-xl
            bg-white
            border border-gray-200
            shadow-sm
            hover:bg-gray-50
            active:scale-[0.99]
            transition
          "
          aria-label="Giỏ hàng"
        >
          <PiShoppingCartSimpleLight className="text-lg" />
          <span className="text-sm">Cart</span>

          <span
            className="
              absolute -top-1 -right-1
              text-[10px] leading-none
              rounded-full
              px-1.5 py-1
              bg-black text-white
              shadow
            "
          >
            0
          </span>
        </button>
      </div> */}
    </div>
  );
}
