import { type Bone, type Point } from "./math";
import { getSlider } from "./utils";

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

    // Right box
    let rightBox = document.getElementById("rightBox") as HTMLDivElement;
    rightBox.style.width = `${(c.width / 24) * 9 - 48}px`;
    rightBox.style.height = `${(c.height / 16) * 14 - 48}px`;
    rightBox.style.left = `${(c.width / 24) * 14 + 24}px`;
    rightBox.style.top = `${(c.height / 16) + 24}px`;
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

export function renderPoint(point: Point, ctx: CanvasRenderingContext2D, color: string = "#ff0000", size: number = 8) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, size, 0, 2 * Math.PI);
    ctx.fill();
}

export function renderValues(document: Document) {
    document.getElementById("xValue")!.textContent = getSlider("xSlider").toString();
    document.getElementById("yValue")!.textContent = getSlider("ySlider").toString();
    document.getElementById("bonesValue")!.textContent = getSlider("bonesSlider").toString();
}