import { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

function Droppable({ id, children }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} style={{ border: '1px solid black', minHeight: '150px', padding: '10px', margin: '10px' }}>
      {children}
    </div>
  );
};

function Draggable({ id, src }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: `translate3d(${transform ? `${transform.x}px, ${transform.y}px, 0` : '0, 0, 0'})`,
    width: '100px',
    margin: '10px',
  };

  return (
    <img
      ref={setNodeRef}
      style={style}
      src={src}
      alt=""
      {...listeners}
      {...attributes}
    />
  );
};

function App() {
  const [leftBoxImages, setLeftBoxImages] = useState([]);
  const [rightBoxImages, setRightBoxImages] = useState([]);
  const [middleImages] = useState(['/e7drafter/images/logo192.png', '/e7drafter/images/logo512.png']);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newId = `${active.id}-${Date.now()}`;
      if (over.id === 'left-box') {
        setLeftBoxImages((prev) => [...prev, { id: newId, src: active.id }]);
      } else if (over.id === 'right-box') {
        setRightBoxImages((prev) => [...prev, { id: newId, src: active.id }]);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Droppable id="left-box">
          {leftBoxImages.map((image, index) => (
            <Draggable key={index} id={image.id} src={image.src} />
          ))}
        </Droppable>
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px', display: 'flex', flexWrap: 'wrap' }}>
          {middleImages.map((src, index) => (
            <Draggable key={index} id={src} src={src} />
          ))}
        </div>
        <Droppable id="right-box">
          {rightBoxImages.map((image, index) => (
            <Draggable key={index} id={image.id} src={image.src} />
          ))}
        </Droppable>
      </div>
    </DndContext>
  );
};

export default App;