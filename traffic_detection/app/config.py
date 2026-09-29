"""Central configuration for the traffic sign detection app."""

from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

MODEL_PATH = PROJECT_ROOT / "models" / "traffic_sign.torchscript"
LABEL_MAPPING_PATH = PROJECT_ROOT / "models" / "label-mapping.json"

CAMERA_INDEX = 0
FRAME_WIDTH = 640
FRAME_HEIGHT = 480

CONFIDENCE_THRESHOLD = 0.5
IMAGE_SIZE = 640

DEVICE = "auto"
WINDOW_NAME = "Traffic Sign Detection"


def get_device(device: str = DEVICE) -> str:
    """Return the inference device, defaulting to CUDA when available."""
    if device != "auto":
        return device
    try:
        import torch

        return "cuda" if torch.cuda.is_available() else "cpu"
    except ImportError:
        return "cpu"