"""Traffic sign detector built on a YOLOv8 model."""

from __future__ import annotations

import json
from pathlib import Path
from typing import NamedTuple, Optional, Union

import cv2
import numpy as np
from ultralytics import YOLO

PathLike = Union[str, Path]


class ModelError(RuntimeError):
    """Raised when the YOLO model cannot be loaded."""


class Detection(NamedTuple):
    class_id: int
    label: str
    confidence: float
    box: tuple[int, int, int, int]

    @property
    def x1(self) -> int:
        return self.box[0]

    @property
    def y1(self) -> int:
        return self.box[1]

    @property
    def x2(self) -> int:
        return self.box[2]

    @property
    def y2(self) -> int:
        return self.box[3]


_PALETTE = [
    (0, 140, 255),
    (255, 200, 0),
    (0, 255, 0),
    (180, 0, 255),
    (255, 255, 0),
    (0, 165, 255),
]

_BOX_THICKNESS = 2
_LABEL_FONT = cv2.FONT_HERSHEY_SIMPLEX
_LABEL_SCALE = 0.55
_LABEL_BG = (0, 0, 0)
_LABEL_FG = (255, 255, 255)
_FPS_SCALE = 0.7
_FPS_COLOR = (0, 255, 255)


class TrafficSignDetector:
    """Loads a YOLO model and converts its raw predictions into image annotations."""

    def __init__(
        self,
        model_path: PathLike,
        conf_threshold: float = 0.5,
        image_size: int = 640,
        device: str = "cpu",
        label_mapping: Optional[PathLike] = None,
    ) -> None:
        self.conf_threshold = float(conf_threshold)
        self.image_size = int(image_size)
        self.device = device or "cpu"
        self._label_mapping = self._load_label_mapping(label_mapping)
        self.model = self._load_model(model_path)
        self.names: dict[int, str] = {}

    def _load_model(self, model_path: PathLike) -> YOLO:
        path = Path(model_path)
        if not path.exists():
            raise ModelError(f"Model file not found: {path}")
        try:
            return YOLO(str(path), task="detect")
        except Exception as exc:
            raise ModelError(f"Failed to load model from {path}: {exc}") from exc

    @staticmethod
    def _load_label_mapping(path: Optional[PathLike]) -> Optional[dict[str, str]]:
        if not path:
            return None
        try:
            with open(path, "r", encoding="utf-8") as fh:
                return json.load(fh)
        except (OSError, json.JSONDecodeError):
            return None

    def predict(self, frame: np.ndarray) -> list[Detection]:
        """Run inference on one frame and return the kept detections."""
        results = self.model.predict(
            frame,
            conf=self.conf_threshold,
            imgsz=self.image_size,
            device=self.device,
            verbose=False,
        )
        if not results:
            return []
        result = results[0]
        if not self.names:
            self.names = self._resolve_names(result)
        boxes = result.boxes
        if boxes is None or not len(boxes):
            return []
        class_ids = boxes.cls.cpu().numpy().astype(int).tolist()
        scores = boxes.conf.cpu().numpy().tolist()
        coords = boxes.xyxy.cpu().numpy()
        detections: list[Detection] = []
        for class_id, score, box in zip(class_ids, scores, coords):
            label = self.names.get(class_id, f"sign_{class_id}")
            detections.append(
                Detection(
                    class_id=int(class_id),
                    label=label,
                    confidence=float(score),
                    box=self._clamp_box(frame, *box),
                )
            )
        return detections

    def draw(self, frame: np.ndarray, detections: list[Detection]) -> np.ndarray:
        """Draw bounding boxes and labels for the given detections, in place."""
        for det in detections:
            color = _PALETTE[det.class_id % len(_PALETTE)]
            cv2.rectangle(
                frame,
                (det.x1, det.y1),
                (det.x2, det.y2),
                color,
                _BOX_THICKNESS,
                cv2.LINE_AA,
            )
            label = f"{det.label} {det.confidence * 100:.0f}%"
            _fill_text(frame, label, (det.x1, max(det.y1 - 8, 24)), color)
        return frame

    def _resolve_names(self, result) -> dict[int, str]:
        raw = getattr(result, "names", None)
        if isinstance(raw, dict) and raw:
            return {int(key): str(value) for key, value in raw.items()}
        if self._label_mapping:
            return {index: code for index, code in enumerate(self._label_mapping)}
        return {}

    @staticmethod
    def _clamp_box(frame: np.ndarray, x1: float, y1: float, x2: float, y2: float) -> tuple[int, int, int, int]:
        height, width = frame.shape[:2]
        bx1 = int(round(x1))
        by1 = int(round(y1))
        bx2 = int(round(x2))
        by2 = int(round(y2))
        return max(bx1, 0), max(by1, 0), min(bx2, width), min(by2, height)


def draw_fps(frame: np.ndarray, fps: float, position: tuple[int, int] = (10, 30)) -> None:
    """Overlay the current FPS on a frame."""
    cv2.putText(
        frame,
        f"FPS: {fps:.1f}",
        position,
        _LABEL_FONT,
        _FPS_SCALE,
        _FPS_COLOR,
        2,
        cv2.LINE_AA,
    )


def _fill_text(frame: np.ndarray, text: str, origin: tuple[int, int], color: tuple[int, int, int]) -> None:
    """Draw readable text with a filled background behind it."""
    (text_w, text_h), baseline = cv2.getTextSize(text, _LABEL_FONT, _LABEL_SCALE, 1)
    x, y = origin
    cv2.rectangle(
        frame,
        (x, y - text_h - baseline),
        (x + text_w, y + baseline),
        _LABEL_BG,
        cv2.FILLED,
    )
    cv2.putText(frame, text, (x, y), _LABEL_FONT, _LABEL_SCALE, _LABEL_FG, 1, cv2.LINE_AA)
    cv2.putText(frame, text, (x, y), _LABEL_FONT, _LABEL_SCALE, color, 1, cv2.LINE_AA)