"""Download the default traffic sign YOLOv8 model into the models/ directory."""

from __future__ import annotations

import argparse
import sys
import urllib.error
import urllib.request
from pathlib import Path

DEFAULT_MODEL_URL = (
    "https://huggingface.co/liamxdev/vtsr/resolve/main/vtsr.torchscript"
)
DEFAULT_LABELS_URL = (
    "https://huggingface.co/liamxdev/vtsr/resolve/main/label-mapping.json"
)

_PROJECT_ROOT = Path(__file__).resolve().parent.parent
_USER_AGENT = "traffic-sign-detection/1.0"


def download(url: str, destination: Path) -> None:
    """Download a file to destination, showing download progress."""
    request = urllib.request.Request(url, headers={"User-Agent": _USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            total = int(response.headers.get("Content-Length", 0))
            received = 0
            with open(destination, "wb") as out:
                while True:
                    chunk = response.read(65536)
                    if not chunk:
                        break
                    out.write(chunk)
                    received += len(chunk)
                    percent = 100 * received / total if total else 0
                    print(f"\r  {received / 1048576:.1f} MB / {total / 1048576:.1f} MB ({percent:.0f}%)", end="")
    except (urllib.error.URLError, OSError) as exc:
        print()
        print(f"ERROR: could not download {url}")
        print(f"  {exc}")
        print("Check your internet connection, or place a model manually and update")
        print("MODEL_PATH in app/config.py.")
        raise SystemExit(1) from exc
    print()


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Download the VTSR traffic sign YOLOv8n model into models/."
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=_PROJECT_ROOT / "models",
        help="Directory where the model files are saved (default: models/).",
    )
    args = parser.parse_args()

    output_dir = args.output_dir
    output_dir.mkdir(parents=True, exist_ok=True)

    print("Downloading traffic sign model (vtsr.torchscript)...")
    download(DEFAULT_MODEL_URL, output_dir / "traffic_sign.torchscript")

    print("Downloading label mapping (label-mapping.json)...")
    download(DEFAULT_LABELS_URL, output_dir / "label-mapping.json")

    print()
    print(f"Done. Model saved to: {output_dir}")
    print("Run the app with:  python main.py")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())