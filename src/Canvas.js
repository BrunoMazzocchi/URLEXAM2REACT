import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Canvas = () => {
  const isAuthenticated = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "authorization" && value) {
        return true;
      }
    }

    navigate("/login");
    return false;
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const [penSize, setPenSize] = useState(5);
  const [eraserSize, setEraserSize] = useState(10);
  const [mode, setMode] = useState("pen");
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      context.lineCap = "round";
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvas.width, canvas.height);
      saveToHistory();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineWidth = mode === "pen" ? penSize : eraserSize;
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.strokeStyle = mode === "pen" ? penColor : "#FFFFFF";
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) saveToHistory();
    setIsDrawing(false);
  };

  const handleModeChange = (event, newMode) => {
    setMode(newMode);
  };

  const handleColorChange = (event) => {
    setPenColor(event.target.value);
  };

  const handleSave = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  const handleSaveDrawing = async () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/jpeg");
    const drawingData = {
      title,
      content,
      description,
      image: dataUrl,
    };

    try {
      const cookies = document.cookie.split(";");
      let token = null;
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "authorization" && value) {
          token = value;
          break;
        }
      }

      // Check if token is available
      if (!token) {
        setErrorMessage("No token found in cookies");
        setErrorOpen(true);
        return;
      }

      const response = await fetch("http://localhost:3000/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include token in the header
          Authorization: `${token}`,
        },
        body: JSON.stringify(drawingData),
      });

      if (response.ok) {
        console.log("Post created successfully");
        navigate("/");
      } else {
        setErrorMessage("Error creating post");
        setErrorOpen(true);
      }
    } catch (error) {
      setErrorMessage(`Error creating post: ${error.message}`);
      setErrorOpen(true);
    }

    setOpen(false);
  };

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    setHistory([...history.slice(0, historyStep + 1), dataUrl]);
    setHistoryStep(historyStep + 1);
  };

  return (
    <div>
      <Paper style={{ width: "100%", height: "100vh" }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          style={{ border: "1px solid #000", width: "100%", height: "100%" }}
        />
      </Paper>
      <div style={{ marginTop: "10px" }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          aria-label="pen or eraser"
        >
          <ToggleButton value="pen" aria-label="pen">
            Pen
          </ToggleButton>
          <ToggleButton value="eraser" aria-label="eraser">
            Eraser
          </ToggleButton>
        </ToggleButtonGroup>
        <input type="color" value={penColor} onChange={handleColorChange} />
        {mode === "pen" ? (
          <Slider
            value={penSize}
            onChange={(e, newValue) => setPenSize(newValue)}
            min={1}
            max={20}
            valueLabelDisplay="auto"
            aria-labelledby="pen-size-slider"
            style={{ width: 200, margin: "10px" }}
          />
        ) : (
          <Slider
            value={eraserSize}
            onChange={(e, newValue) => setEraserSize(newValue)}
            min={1}
            max={50}
            valueLabelDisplay="auto"
            aria-labelledby="eraser-size-slider"
            style={{ width: 200, margin: "10px" }}
          />
        )}
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Drawing</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add a title, content, and description for your drawing.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveDrawing} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={errorOpen} onClose={handleErrorClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Canvas;
