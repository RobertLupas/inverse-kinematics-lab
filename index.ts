import { type Bone, type Point } from "./lib/math";
import { fabrik } from "./lib/fabrik";
import { renderBackground, renderBones } from "./lib/render";

var c = document.getElementById("main") as HTMLCanvasElement;

if (screen.availWidth < 800 || screen.availHeight < 700) {
    document.getElementById("warning")!.style.display = "flex";
} else {
    var ctx = c.getContext("2d") as CanvasRenderingContext2D;

    function main() {
        renderBackground(c, ctx, document);

        let rightBox = document.getElementById("rightBox") as HTMLDivElement;
        rightBox.style.width = `${(c.width / 24) * 9 - 48}px`;
        rightBox.style.height = `${(c.height / 16) * 14 - 48}px`;
        rightBox.style.left = `${(c.width / 24) * 14 + 24}px`;
        rightBox.style.top = `${(c.height / 16) + 24}px`;
        let base: Point = { x: (c.width / 24) * 7.5, y: (c.height / 16) * 15 - 24 };
        let bones: Bone[] = [
            { length: 150, angle: -Math.PI / 2 },
            { length: 150, angle: -Math.PI / 2 },
            { length: 150, angle: -Math.PI / 2 }
        ];
        let target: Point = { x: (c.width / 24) * 5.5, y: (c.height / 16) * 14 - 24 };

        renderBones(base, fabrik(base, target, bones), ctx);
    }

    main();

    addEventListener("resize", () => { main(); });

    document.body.style.overflow = "clip";
    c.style.display = "block";
}
