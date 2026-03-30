import { renderBackground, renderValues } from "./lib/render";
import { tryAndDisplayError } from "./lib/logHandlers";
import { renderIK, stringToIKType } from "./lib/ik";
import { getSlider, getSelector } from "./lib/utils";

var c = document.getElementById("main") as HTMLCanvasElement;

if (screen.availWidth < 800 || screen.availHeight < 700) document.getElementById("warning")!.style.display = "flex";
else {
    document.body.style.overflow = "clip";
    document.getElementById("rightBox")!.style.display = "flex";
    var ctx = c.getContext("2d") as CanvasRenderingContext2D;

    function main() {
        renderBackground(c, ctx, document);
        tryAndDisplayError(() => {
            renderIK(
                c, ctx,
                { x: (c.width / 24) * 7.5, y: (c.height / 16) * 15 - 48 },
                { x: getSlider("xSlider"), y: getSlider("ySlider") },
                stringToIKType(getSelector("ikType")), getSlider("bonesSlider")
            )
        });
    }

    main();
    renderValues(document);
    c.style.display = "block";

    // Event listeners
    addEventListener("resize", () => { main(); });
    ["xSlider", "ySlider", "bonesSlider"].forEach((id) => {
        document.getElementById(id)!.addEventListener("input", () => {
            tryAndDisplayError(() => {
                renderIK(
                    c, ctx,
                    { x: (c.width / 24) * 7.5, y: (c.height / 16) * 15 - 48 },
                    { x: getSlider("xSlider"), y: getSlider("ySlider") },
                    stringToIKType(getSelector("ikType")), getSlider("bonesSlider")
                )
            });

            renderValues(document);
        });
    });
}
