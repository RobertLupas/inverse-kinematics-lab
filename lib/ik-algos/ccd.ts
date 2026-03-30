import { type Bone, type Point, totalLength, distance } from "../math";

export function ccd(base: Point, target: Point, bones: Bone[], tolerance: number = 0.1): Bone[] {
    if (totalLength(bones) < distance(base, target))
        throw new Error("Target unreachable");

    let result: Bone[] = bones.map(b => ({ ...b }));
    let points: Point[] = [];

    function rebuildPoints() {
        points = [{ x: base.x, y: base.y }];
        for (let i = 0; i < result.length; i++) {
            let prev = points[i]!;
            let bone = result[i]!;
            points.push({
                x: prev.x + bone.length * Math.cos(bone.angle),
                y: prev.y + bone.length * Math.sin(bone.angle)
            });
        }
    }

    function rotatePointAroundPivot(point: Point, pivot: Point, delta: number): Point {
        let dx = point.x - pivot.x;
        let dy = point.y - pivot.y;
        let cos = Math.cos(delta);
        let sin = Math.sin(delta);
        return {
            x: pivot.x + dx * cos - dy * sin,
            y: pivot.y + dx * sin + dy * cos
        };
    }

    rebuildPoints();

    for (let iter = 0; iter < 100; iter++) {
        let endEffector = points.at(-1)!;
        if (distance(endEffector, target) <= tolerance) break;

        for (let i = result.length - 1; i >= 0; i--) {
            let joint = points[i]!;
            endEffector = points.at(-1)!;

            let toEnd = { x: endEffector.x - joint.x, y: endEffector.y - joint.y };
            let toTarget = { x: target.x - joint.x, y: target.y - joint.y };

            let endMag = Math.hypot(toEnd.x, toEnd.y);
            let targetMag = Math.hypot(toTarget.x, toTarget.y);
            if (endMag < 1e-8 || targetMag < 1e-8) continue;

            let cross = toEnd.x * toTarget.y - toEnd.y * toTarget.x;
            let dot = toEnd.x * toTarget.x + toEnd.y * toTarget.y;
            let delta = Math.atan2(cross, dot);
            if (Math.abs(delta) < 1e-10) continue;

            for (let j = i + 1; j < points.length; j++)
                points[j] = rotatePointAroundPivot(points[j]!, joint, delta);

            for (let k = i; k < result.length; k++)
                result[k]!.angle += delta;
        }
    }

    for (let i = 0; i < result.length; i++) {
        let dx = points[i + 1]!.x - points[i]!.x;
        let dy = points[i + 1]!.y - points[i]!.y;
        result[i]!.angle = Math.atan2(dy, dx);
    }

    return result;
}