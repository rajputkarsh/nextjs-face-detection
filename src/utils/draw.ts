import {
  DRAW_FILL_DEFAUT_COLOR,
  DRAW_FILL_STYLE,
  DRAW_FILL_TEXT,
  DRAW_FILL_TEXT_COLOR,
  DRAW_TEXT_FONT,
} from "@/constants/draw";
import { DetectedObject } from "@tensorflow-models/coco-ssd";

export const drawOnCanvas = (
  mirrored: boolean,
  predictions: DetectedObject[],
  ctx: CanvasRenderingContext2D | null | undefined
): void => {
  predictions.forEach((detectedObject: DetectedObject) => {
    const { class: name, bbox, score } = detectedObject;
    const [x, y, width, height] = bbox;

    if (ctx) {
      ctx.beginPath();

      ctx.fillStyle =
        name === DRAW_FILL_TEXT ? DRAW_FILL_TEXT_COLOR : DRAW_FILL_DEFAUT_COLOR;
      ctx.globalAlpha = 0.4;

      mirrored
        ? ctx.roundRect(ctx.canvas.width - x, y, -width, height, 8)
        : ctx.roundRect(x, y, width, height, 8);

      ctx.fill();

      ctx.font = DRAW_TEXT_FONT;
      ctx.fillStyle = DRAW_FILL_STYLE;
      ctx.globalAlpha = 1;
      mirrored
        ? ctx.fillText(name, ctx.canvas.width - x - width + 10, y + 20)
        : ctx.fillText(name, x + 10, y + 20);
    }
  });
};
