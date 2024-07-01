import { useRef } from "react";
import { Guest } from "../types";
import { useDrag, useDrop } from "react-dnd";

const ItemType = {
    GUEST: "guest",
  };

  const DraggableGuest: React.FC<{
    guest: Guest;
    index: number;
    moveGuest: (dragIndex: number, hoverIndex: number) => void;
    deleteGuest: (index: number) => void;
  }> = ({ guest, index, moveGuest, deleteGuest }) => {
    const ref = useRef<HTMLDivElement>(null);
  
    const [, drop] = useDrop({
      accept: ItemType.GUEST,
      hover: (item: { index: number }) => {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        moveGuest(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });
  
    const [{ isDragging }, drag] = useDrag({
      type: ItemType.GUEST,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    drag(drop(ref));
  
    return (
      <div
        ref={ref}
        className={`w-32 h-12 bg-gray-200 text-gray-800 rounded flex items-center justify-between p-2 m-2 cursor-pointer ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        <span>
          {guest.firstName} {guest.lastName}
        </span>
        <button onClick={() => deleteGuest(index)} className="text-red-600">
          X
        </button>
      </div>
    );
  };
  
  
  export default DraggableGuest