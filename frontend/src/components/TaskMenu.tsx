import { BsThreeDots } from "react-icons/bs";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

type TaskMenuProps = {
  onViewDetails: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TaskMenu({
  onViewDetails,
  onEdit,
  onDelete,
}: TaskMenuProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuStyle({
        position: "fixed",
        top: rect.bottom + 8,
        left: rect.right - 160,
        zIndex: 9999,
      });
    }
  }, [open]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        open &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md h-8 w-8 p-0 text-purple-400 hover:text-white hover:bg-purple-800/50"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        data-state={open ? "open" : "closed"}
        onClick={() => setOpen((v) => !v)}
      >
        <BsThreeDots />
      </button>
      {open &&
        createPortal(
          <div
            style={menuStyle}
            className="z-[9999] mt-2 w-40 bg-purple-900 border border-purple-700 rounded-lg shadow-lg py-1"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setOpen(false);
                onViewDetails();
              }}
              className="w-full text-left px-4 py-2 text-sm text-purple-100 hover:bg-purple-800"
            >
              Ver detalles
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onEdit();
              }}
              className="w-full text-left px-4 py-2 text-sm text-purple-100 hover:bg-purple-800"
            >
              Editar
            </button>
            <button
              onClick={() => {
                setOpen(false);
                onDelete();
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-red-600 hover:text-white"
            >
              Eliminar
            </button>
          </div>,
          document.body
        )}
    </>
  );
}
