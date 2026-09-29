"""Real-time traffic sign detection from a live webcam feed."""

from __future__ import annotations

import argparse
import time
from types import SimpleNamespace

import cv2

from app.camera import Camera, CameraError
from app.config import (
    CAMERA_INDEX,
    CONFIDENCE_THRESHOLD,
    FRAME_HEIGHT,
    FRAME_WIDTH,
    IMAGE_SIZE,
    LABEL_MAPPING_PATH,
    MODEL_PATH,
    WINDOW_NAME,
    get_device,
)
from app.detector import ModelError, TrafficSignDetector, draw_fps


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Real-time traffic sign detection from a webcam using YOLOv8."
    )
    parser.add_argument("--camera", type=int, required=False, help="Camera index to use.")
    parser.add_argument("--model", type=str, required=False, help="Path to a YOLO model file.")
    parser.add_argument("--conf", type=float, required=False, help="Confidence threshold (0.0 to 1.0).")
    parser.add_argument("--imgsz", type=int, required=False, help="YOLOv8 inference image size.")
    parser.add_argument("--device", type=str, required=False, help="Inference device: cpu or cuda.")
    return parser.parse_args()


def build_config(args: argparse.Namespace) -> SimpleNamespace:
    return SimpleNamespace(
        model_path=args.model or MODEL_PATH,
        label_mapping=LABEL_MAPPING_PATH,
        camera_index=args.camera if args.camera is not None else CAMERA_INDEX,
        frame_width=FRAME_WIDTH,
        frame_height=FRAME_HEIGHT,
        conf_threshold=args.conf if args.conf is not None else CONFIDENCE_THRESHOLD,
        image_size=args.imgsz if args.imgsz is not None else IMAGE_SIZE,
        device=args.device or get_device(),
        window_name=WINDOW_NAME,
    )


def run(cfg: SimpleNamespace) -> int:
    try:
        detector = TrafficSignDetector(
            cfg.model_path,
            conf_threshold=cfg.conf_threshold,
            image_size=cfg.image_size,
            device=cfg.device,
            label_mapping=cfg.label_mapping,
        )
    except ModelError as exc:
        print(f"ERROR: {exc}")
        print("HINT: run `python scripts/download_model.py` to fetch the default model.")
        return 1

    print(f"Model:   {cfg.model_path}")
    print(f"Device:  {cfg.device}")
    print("Press Q to quit.")

    try:
        camera = Camera(cfg.camera_index, cfg.frame_width, cfg.frame_height)
        camera.open()
    except CameraError as exc:
        print(f"ERROR: {exc}")
        return 1

    print(f"Webcam opened (index {cfg.camera_index}). Starting live detection...")

    previous_time = time.perf_counter()
    fps = 0.0
    try:
        while True:
            frame = camera.read()
            if frame is None:
                print("WARNING: empty frame received from webcam. Skipping.")
                continue

            detections = detector.predict(frame)
            detector.draw(frame, detections)

            now = time.perf_counter()
            elapsed = now - previous_time
            previous_time = now
            if elapsed > 0:
                fps = fps * 0.9 + (1.0 / elapsed) * 0.1
            draw_fps(frame, fps)

            cv2.imshow(cfg.window_name, frame)
            if cv2.waitKey(1) & 0xFF in (ord("q"), ord("Q")):
                break
    except KeyboardInterrupt:
        print("\nInterrupted by user.")
    finally:
        camera.release()
        cv2.destroyAllWindows()
        print("Camera released. Goodbye.")
    return 0


def main() -> int:
    cfg = build_config(parse_args())
    return run(cfg)


if __name__ == "__main__":
    raise SystemExit(main())