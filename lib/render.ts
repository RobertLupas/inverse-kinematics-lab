import { type Bone, type Point } from "./math";

export function renderLeftBox(ctx: CanvasRenderingContext2D, c: HTMLCanvasElement) {
    ctx.fillStyle = "#001821";
    ctx.fillRect(c.width / 24 + 24, c.height / 16 + 24, (c.width / 24) * 13 - 48, (c.height / 16) * 14 - 48);
}

export function renderBackground(c: HTMLCanvasElement, ctx: CanvasRenderingContext2D, document: Document) {
    c.width = document.body.clientWidth;
    c.height = document.body.clientHeight;

    ctx.strokeStyle = "#ffffff05";
    ctx.lineWidth = 2;
    for (let x = -ctx.lineWidth; x <= c.width; x += c.width / 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, c.height);
        ctx.stroke();
    }

    for (let y = -ctx.lineWidth; y <= c.height; y += c.height / 16) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(c.width, y);
        ctx.stroke();
    }

    renderLeftBox(ctx, c);
}

export function renderBones(base: Point, bones: Bone[], ctx: CanvasRenderingContext2D) {
    let currentPoint = { x: base.x, y: base.y };
    ctx.lineWidth = 14;
    for (let bone of bones) {
        ctx.strokeStyle = `rgb(${Math.floor(255 * bone.length / 200)}, ${Math.floor(255 * bone.length / 200)}, ${Math.floor(255 * bone.length / 200)})`;
        let nextPoint = { x: currentPoint.x + bone.length * Math.cos(bone.angle), y: currentPoint.y + bone.length * Math.sin(bone.angle) };
        ctx.beginPath();
        ctx.moveTo(currentPoint.x, currentPoint.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);
        ctx.stroke();
        currentPoint = nextPoint;
    }
}
