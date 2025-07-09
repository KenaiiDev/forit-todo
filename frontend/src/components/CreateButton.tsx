import { IoMdAdd } from "react-icons/io";

type CreateButtonParams = {
  onOpen: () => void;
};

export default function CreateButton({ onOpen }: CreateButtonParams) {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={onOpen}
        className="h-16 w-16 flex items-center justify-center text-3xl rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        <IoMdAdd />
      </button>
    </div>
  );
}
