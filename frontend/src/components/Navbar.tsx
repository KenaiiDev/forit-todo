import { FaList } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { RiCheckboxCircleLine } from "react-icons/ri";

type NavbarProps = {
  filter: "all" | "pending" | "completed";
  setFilter: (filter: "all" | "pending" | "completed") => void;
};

export default function Navbar({ filter, setFilter }: NavbarProps) {
  return (
    <nav className="fixed left-0 top-0 w-full h-20 flex justify-evenly md:h-full md:flex-col md:w-20 md:justify-center md:items-center bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/20 z-50 transition-all duration-300">
      <div className="w-12 h-12  text-4xl bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center my-auto mx-auto ml-3 md:mt-3">
        <FiTarget />
      </div>
      <div className="w-full md:h-full text-2xl ml-3 md:ml-0 mx-auto flex md:flex-col items-center justify-evenly">
        <button onClick={() => setFilter("all")}>
          <FaList />
        </button>
        <button onClick={() => setFilter("completed")}>
          <RiCheckboxCircleLine />
        </button>
        <button onClick={() => setFilter("pending")}>
          <FiTarget />
        </button>
      </div>
    </nav>
  );
}
