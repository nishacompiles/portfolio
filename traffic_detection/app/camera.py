"""Webcam wrapper built on OpenCV with friendly error handling."""

from typing import Optional

import cv2
import numpy as np


class CameraError(RuntimeError):
    """Raised when the camera cannot be opened or read."""


class Camera:
    """Small wrapper around cv2.VideoCapture with a context manager."""

    def __init__(self, index: int = 0, width: int = 640, height: int = 480) -> None:
        self.index = index
        self.width = width
        self.height = height
        self._cap: Optional[cv2.VideoCapture] = None

    def __enter__(self) -> "Camera":
        self.open()
        return self

    def __exit__(self, *exc: object) -> None:
        self.release()

    def open(self) -> None:
        """Open the camera and configure its resolution."""
        self._cap = cv2.VideoCapture(self.index)
        if not self._cap.isOpened():
            self.release()
            raise CameraError(
                f"Unable to access webcam (index {self.index}). "
                "Please check that a camera is connected and permissions are granted."
            )
        self._cap.set(cv2.CAP_PROP_FRAME_WIDTH, self.width)
        self._cap.set(cv2.CAP_PROP_FRAME_HEIGHT, self.height)

    def read(self) -> Optional[np.ndarray]:
        """Return the next frame, or None when no frame could be captured."""
        if self._cap is None or not self._cap.isOpened():
            raise CameraError("Camera is not open. Call open() before read().")
        ok, frame = self._cap.read()
        return frame if ok else None

    def release(self) -> None:
        if self._cap is not None:
            self._cap.release()
            self._cap = None