import { type Bone, type Point } from "./math";
import { renderBones, renderLeftBox, renderPoint } from "./render";
import { fabrik } from "./ik-algos/fabrik";

enum IKType {
    FABRIK = "FABRIK",
}

export function stringToIKType(str: string): IKType {
    switch (str) {
        case "fabrik": return IKType.FABRIK;
        default: return IKType.FABRIK;
    }
}

function computeTarget(target: Point, modifier: Point): Point {
    return { x: modifier.x + target.x, y: modifier.y - target.y };
}

export function renderIK(c: HTMLCanvasElement, ctx: CanvasRenderingContext2D, base: Point, target: Point, ikType: IKType, bonesNr: number = 3, bonesLength: number = 150, bones?: Bone[]) {
    if (!bones) bones = Array.from({ length: bonesNr }, () => ({ length: bonesLength, angle: -Math.PI / 2 }));

    target = computeTarget(target, base);

    try {
        switch (ikType) {
            case IKType.FABRIK: bones = fabrik(base, target, bones)
        }
    } catch (e) { throw e; };

    renderLeftBox(ctx, c);
    renderBones(base, bones, ctx);
    renderPoint(base, ctx, "#00ff00");
    renderPoint(target, ctx);
}