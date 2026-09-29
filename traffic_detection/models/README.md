# Models

This folder holds the traffic sign detection model used by the app.

## Default model: VTSR

The default model is **VTSR**, a **YOLOv8n** object-detection model trained on
**56 classes of Vietnamese traffic signs** (Vietnam Traffic Sign Dataset v3).
It was downloaded from the Hugging Face repo:
https://huggingface.co/liamxdev/vtsr

| File                  | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `traffic_sign.torchscript` | YOLOv8n model exported to TorchScript (FP16, ~6.4 MB) |
| `label-mapping.json`  | Traffic-sign code -> description mapping (fallback labels) |

> The `traffic_sign.torchscript` and `label-mapping.json` files are NOT stored
> in this repository. Download them with:
>
> ```bash
> python scripts/download_model.py
> ```

## Classes detected

The model recognises 56 traffic-sign codes grouped into four families:

* `P-*`  — prohibition signs (e.g. `P-127` speed limit, `P-102` no entry)
* `R-*`  — mandatory / instruction signs (e.g. `R-303` roundabout)
* `W-*`  — warning signs (e.g. `W-224` pedestrian crossing, `W-225` children)
* `S-*`  — supplementary signs (e.g. `S-509a` safe height)

The app displays the traffic-sign **code** plus the confidence percentage.
See `label-mapping.json` for the Vietnamese description of each code.

## Is it pretrained or custom trained?

It is a **community pretrained** model (trained on the public *Vietnam Traffic
Sign Dataset v3* by the model author). It was not trained by the author of
this project. No training is required to use this project.

## License

The exported model contains Ultralytics YOLO components and is distributed
under the **AGPL-3.0** license (see the Hugging Face repo for details).

## Replacing the model

Any Ultralytics YOLO checkpoint works:

1. Drop a `.pt`, `.onnx`, or `.torchscript` file into this folder.
2. Set `MODEL_PATH` in `app/config.py` to that file's path **or**
   pass `--model path/to/model.pt` when running `main.py`.

The app reads class names from the model itself when available
(`model.names`). If the model has no embedded names, it falls back to the
keys of `label-mapping.json` (in alphabetical order, which matches the
dataset class order), and finally to generic labels like `sign_12`.

You can also disable the fallback by pointing `LABEL_MAPPING_PATH` at
another JSON file or an empty path.

## Notes

* The default TorchScript artifact runs on CPU without a GPU. It is traced at
  a **fixed 640×640 input size** — do not change `IMAGE_SIZE` when using it,
  or inference fails on the traced anchor constants.
* Expected FPS is hardware-dependent. Measured on a 2018 laptop APU
  (AMD Ryzen 5 2500U, CPU only): **~2–4 FPS at 640**. Expect roughly
  10–40+ FPS on a modern desktop CPU or any NVIDIA GPU.
* For full control over `IMAGE_SIZE` / performance, replace the model with an
  Ultralytics `.pt` checkpoint (any size), e.g. a fine-tuned `yolov8n`. The
  app then respects `--imgsz`.
* The same Hugging Face repo publishes an INT8 ONNX export
  (`vtsr_int8.onnx`). It is **not** the default: in our CPU benchmarks it was
  slower than the TorchScript artifact through Ultralytics.
* The model only knows its 56 training classes and the traffic signs of a
  single country's dataset. It will not recognise every road sign in the
  world, and it is a demonstration model, not a vehicle safety system.