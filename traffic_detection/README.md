# Traffic Sign Detection

## Overview

A lightweight real-time traffic sign detection system using **YOLOv8** and
**OpenCV**. It opens your webcam, detects traffic signs frame by frame, draws
bounding boxes around them, and displays the sign code, the confidence score
and the FPS — right in an OpenCV window.

The project is deliberately small, runs on a normal laptop CPU, and is
designed to be easy to understand and demos well in a software engineering
portfolio.

## Features

* Real-time webcam detection
* YOLOv8 object detection (nano model)
* Traffic sign classification (56 sign classes)
* Bounding boxes with per-class colours
* Confidence scores
* FPS monitoring
* CPU by default, automatic CUDA when a GPU is available
* Lightweight architecture (3 small modules + one entry point)
* Easy model replacement via config or CLI flag

## Tech Stack

* Python
* YOLOv8 (via Ultralytics)
* OpenCV
* NumPy

## Architecture

```
Webcam
   │
   ▼
OpenCV (frame capture)
   │
   ▼
Frame preprocessing (640×480 capture)
   │
   ▼
YOLOv8 inference
   │
   ▼
Traffic Sign Detection
   │
   ▼
Bounding Box + Confidence + FPS
   │
   ▼
Live display (OpenCV window)
```

* `main.py`          — entry point: wires the camera + detector together
* `app/config.py`    — all settings in one place
* `app/camera.py`    — webcam wrapper with friendly error handling
* `app/detector.py`  — loads the YOLO model, runs inference, draws results

## Installation

Requires Python **3.9+** (with venv support).

Windows:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

macOS / Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Getting the model

The default traffic sign model is not included in the repo (it is a community
pretrained YOLOv8n model). Download it once with:

```bash
python scripts/download_model.py
```

This saves `models/traffic_sign.torchscript` and `models/label-mapping.json`.

## Running the project

```bash
python main.py
```

Usage options:

```bash
python main.py --camera 1                 # use a different webcam
python main.py --model models/my.pt       # use another YOLO model
python main.py --conf 0.6                 # raise the confidence threshold
python main.py --imgsz 320                # smaller inference size, faster FPS
python main.py --device cpu               # force CPU
```

## Controls

| Key | Action |
| --- | ------ |
| `Q` | Quit (releases the camera cleanly) |

## Model

* The project uses the **VTSR** model — a YOLOv8n trained on 56 Vietnamese
  traffic sign classes (prohibition, mandatory, warning and supplementary
  signs). Code is displayed as e.g. `P-127` (speed limit), `W-224`
  (pedestrian crossing).
* It is **community pretrained** on the public Vietnam Traffic Sign Dataset
  v3 — no training is needed to run this project.
* Details, class list and license: see [`models/README.md`](models/README.md).
* **Replacing the model:** drop any Ultralytics `.pt` / `.onnx` /
  `.torchscript` file into `models/`, then either set `MODEL_PATH` in
  `app/config.py` or pass `--model <path>`.

> Note: the standard `yolov8n.pt` COCO model can **not** detect generic
> traffic signs, so it is not used as the default.

## Performance

FPS is hardware-dependent. Inference runs on CPU by default (CUDA is used
automatically when available). The default model is traced at a fixed
640×640 input, so `--imgsz` has no effect with it.

Measured on a 2018 laptop APU (AMD Ryzen 5 2500U, CPU only): **~2–4 FPS**.
Expect roughly 10–40+ FPS on a modern desktop CPU or any NVIDIA GPU.

Ways to improve speed:

* Use an NVIDIA GPU (CUDA is picked up automatically).
* Replace the model with a custom `.pt` checkpoint and tune `--imgsz 320`.
* Keep a higher `--conf` to ignore weak detections (less drawing work).

## Configuration

All defaults live in `app/config.py`:

```python
MODEL_PATH            = models/traffic_sign.torchscript
CAMERA_INDEX          = 0
FRAME_WIDTH           = 640
FRAME_HEIGHT          = 480
CONFIDENCE_THRESHOLD  = 0.5
IMAGE_SIZE            = 640
```

## Error handling

Common problems show clear messages instead of tracebacks:

* Webcam not available / permission denied
  → `Unable to access webcam (index 0). ...`
* Model missing
  → `Model file not found: ...` plus a hint to run the download script
* Model file corrupted → loading fails with a readable error
* Empty frames → skipped with a warning instead of crashing

## Limitations

* Detection quality depends on the model's training data (one country's
  dataset, 56 classes).
* Poor lighting, motion blur and occlusion reduce accuracy.
* Small or distant signs may not be detected.
* Webcam quality and resolution affect detection.
* This project is a demonstration/research tool and is **not** a vehicle
  safety system.

## What I learned

* Real-time computer vision with OpenCV
* Object detection with YOLOv8
* Webcam capture and frame processing
* Model inference with Ultralytics
* Confidence thresholds and their trade-offs
* FPS measurement and lightweight performance tuning
* CPU vs GPU inference and automatic device selection
* Designing a clean, reusable separation between config, camera and model

## Future improvements

* Traffic sign tracking (stable IDs across frames)
* Distance estimation from bounding box size
* Voice / audible alerts
* Mobile deployment
* ONNX / TensorRT optimization
* More traffic-sign classes and multi-region support
* Night-time / low-light detection
* Edge-device deployment (Jetson / Raspberry Pi)