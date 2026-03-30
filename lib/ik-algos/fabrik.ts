import { type Bone, type Point, totalLength, distance } from "../math";

export function fabrik(base: Point, target: Point, bones: Bone[], tolerance: number = 0.1): Bone[] {
    if (totalLength(bones) < distance(base, target))
        throw new Error("Target unreachable");

    let result: Bone[] = bones.map(b => ({ ...b }));
    let points: Point[] = [];
    let currentPoint = { x: base.x, y: base.y };
    points.push(currentPoint);
    for (let bone of result) {
        currentPoint = {
            x: currentPoint.x + bone.length * Math.cos(bone.angle),
            y: currentPoint.y + bone.length * Math.sin(bone.angle)
        };
        points.push(currentPoint);
    }

    for (let iter = 0; iter < 100; iter++) {
        if (distance(points.at(-1)!, target) <= tolerance) break;
        // Backward reaching
        points[points.length - 1] = { x: target.x, y: target.y };
        for (let i = points.length - 2; i >= 0; i--) {
            let dx = points[i]!.x - points[i + 1]!.x;
            let dy = points[i]!.y - points[i + 1]!.y;
            let dist = distance(points[i]!, points[i + 1]!);
            let ratio = result[i]!.length / dist;
            points[i] = {
                x: points[i + 1]!.x + dx * ratio,
                y: points[i + 1]!.y + dy * ratio
            };
        }

        // Forward reaching
        points[0] = { x: base.x, y: base.y };
        for (let i = 0; i < points.length - 1; i++) {
            let dx = points[i + 1]!.x - points[i]!.x;
            let dy = points[i + 1]!.y - points[i]!.y;
            let dist = distance(points[i + 1]!, points[i]!);
            let ratio = result[i]!.length / dist;
            points[i + 1] = {
                x: points[i]!.x + dx * ratio,
                y: points[i]!.y + dy * ratio
            };
        }
    }

    // Update bone angles
    for (let i = 0; i < result.length; i++) {
        let dx = points[i + 1]!.x - points[i]!.x;
        let dy = points[i + 1]!.y - points[i]!.y;
        result[i]!.angle = Math.atan2(dy, dx);
    }

    return result;
}