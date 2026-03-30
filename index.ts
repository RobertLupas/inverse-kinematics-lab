import { type Bone, type Point } from "./lib/math";
import { fabrik } from "./lib/fabrik";
import { renderBackground, renderBones, renderLeftBox } from "./lib/render";

var c = document.getElementById("main") as HTMLCanvasElement;

if (screen.availWidth < 800 || screen.availHeight < 700) {
    document.getElementById("warning")!.style.display = "flex";
} else {
    var ctx = c.getContext("2d") as CanvasRenderingContext2D;

    function computeTarget(xSlider: HTMLInputElement, ySlider: HTMLInputElement, xModifier: number, yModifier: number): Point {
        let xTarget = parseFloat(xSlider.value);
        let yTarget = parseFloat(ySlider.value);

        return { x: xModifier + xTarget, y: yModifier - yTarget };
    }

    function runIK() {
        let xModifier = (c.width / 24) * 7.5;
        let yModifier = (c.height / 16) * 15 - 48;

        let base: Point = { x: xModifier, y: yModifier };
        let bones: Bone[] = Array.from({ length: parseInt((document.getElementById("bonesSlider") as HTMLInputElement).value) }, () => ({
            length: 150,
            angle: -Math.PI / 2
        }));

        let target: Point = computeTarget((document.getElementById("xSlider") as HTMLInputElement), (document.getElementById("ySlider") as HTMLInputElement), xModifier, yModifier);

        renderLeftBox(ctx, c);
        try { bones = fabrik(base, target, bones) } catch (e) { throw e; };
        renderBones(base, bones, ctx);
    }

    function tryAndDisplayError(func: () => void) {
        try {
            func();
        } catch (e) {
            displayLog((e as Error).message, true);
        }
    }

    function displayLog(log: string, error: Boolean = false) {
        clearLog();
        if (error) (document.getElementById("errors") as HTMLSpanElement).textContent = log;
        else (document.getElementById("log") as HTMLSpanElement).textContent = log;
    }

    function clearLog() {
        (document.getElementById("log") as HTMLSpanElement).textContent = "";
        (document.getElementById("errors") as HTMLSpanElement).textContent = "";
    }

    function main() {
        renderBackground(c, ctx, document);

        let rightBox = document.getElementById("rightBox") as HTMLDivElement;
        rightBox.style.width = `${(c.width / 24) * 9 - 48}px`;
        rightBox.style.height = `${(c.height / 16) * 14 - 48}px`;
        rightBox.style.left = `${(c.width / 24) * 14 + 24}px`;
        rightBox.style.top = `${(c.height / 16) + 24}px`;

        tryAndDisplayError(() => { runIK(); });
    }

    main();

    addEventListener("resize", () => { main(); });

    ["xSlider", "ySlider", "bonesSlider"].forEach((id) => {
        document.getElementById(id)!.addEventListener("input", () => { tryAndDisplayError(() => { runIK(); }); });
    });

    document.body.style.overflow = "clip";
    c.style.display = "block";
}
