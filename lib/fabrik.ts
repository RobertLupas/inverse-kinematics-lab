import { type Bone, type Point, totalLength, distance } from "./math";

export function fabrik(base: Point, target: Point, bones: Bone[], tolerance: number = 0.1): Bone[] {
    if (totalLength(bones) < Math.sqrt((target.x - base.x) ** 2 + (target.y - base.y) ** 2))
        throw new Error("Target unreachable");

    let points: Point[] = [];
    let currentPoint = { x: base.x, y: base.y };
    points.push(currentPoint);
    for (let bone of bones) {
        currentPoint = {
            x: currentPoint.x + bone.length * Math.cos(bone.angle),
            y: currentPoint.y + bone.length * Math.sin(bone.angle)
        };
        points.push(currentPoint);
    }

    let targetDistance = distance(points[points.length - 1]!, target);

    while (targetDistance > tolerance) {
        // Backward reaching
        points[points.length - 1] = { x: target.x, y: target.y };
        for (let i = points.length - 2; i >= 0; i--) {
            let dx = points[i]!.x - points[i + 1]!.x;
            let dy = points[i]!.y - points[i + 1]!.y;
            let dist = distance(points[i]!, points[i + 1]!);
            let ratio = bones[i]!.length / dist;
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
            let ratio = bones[i]!.length / dist;
            points[i + 1] = {
                x: points[i]!.x + dx * ratio,
                y: points[i]!.y + dy * ratio
            };
        }

        targetDistance = distance(points[points.length - 1]!, target);
    }

    // Update bone angles
    for (let i = 0; i < bones.length; i++) {
        let dx = points[i + 1]!.x - points[i]!.x;
        let dy = points[i + 1]!.y - points[i]!.y;
        bones[i]!.angle = Math.atan2(dy, dx);
    }

    return bones;
}