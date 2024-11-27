import React, { useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import Shape from "./shapes";

const App = ({ type }) => {
  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const addShape = (type) => {
    const id = shapes.length + 1;
    const baseSize = 100;

    let newShape = {
      id: id.toString(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      stroke: "black",
      strokeWidth: 2,
      rotation: 0,
    };

    switch (type) {
      case "circle":
        newShape = {
          ...newShape,
          type: "circle",
          radius: baseSize / 2,
        };
        break;
      case "rectangle":
        newShape = {
          ...newShape,
          type: "rectangle",
          width: baseSize,
          height: baseSize * 1.5,
        };
        break;
      case "square":
        newShape = {
          ...newShape,
          type: "square",
          width: baseSize,
          height: baseSize,
        };
        break;
      case "triangle":
        newShape = {
          ...newShape,
          type: "triangle",
          points: [
            0, -baseSize / 2,
            baseSize / 2, baseSize / 2,
            -baseSize / 2, baseSize / 2,
          ],
          closed: true,
        };
        break;
      case "ellipse":
        newShape = {
          ...newShape,
          type: "ellipse",
          radiusX: baseSize,
          radiusY: baseSize / 1.5,
        };
        break;
      
      default:
        return;
    }

    setShapes([...shapes, newShape]);
  };

  useEffect(() => {
    if (type) {
      addShape(type);
    }
  }, [type]);

  const updateShape = (id, newAttrs) => {
    const updatedShapes = shapes.map((shape) =>
      shape.id === id ? newAttrs : shape
    );
    setShapes(updatedShapes);
  };

  const handleDeselect = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };
  
  
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Stage
        width={window.innerWidth - 170}  // Decrease width to make space for buttons
        height={window.innerHeight - 300} // Decrease height to leave space for buttons
        style={{ border: "1px solid red", position: "absolute", top: -130, left:-10, zIndex:1 }}
        onMouseDown={handleDeselect}
        onTouchStart={handleDeselect}
        
      >
        <Layer>
          {shapes.map((shape) => (
            <Shape
              key={shape.id}
              shape={shape}
              isSelected={shape.id === selectedId}
              onSelect={() => setSelectedId(shape.id)}
              onChange={(newAttrs) => updateShape(shape.id, newAttrs)}
            />
          ))}
        </Layer>
      </Stage>

      
        
    </div>
  );
};

export default App;
