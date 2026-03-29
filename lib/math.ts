export interface Point {
    x: number;
    y: number;
}

export interface Bone {
    length: number;
    angle: number;
}

export function distance(p1: Point, p2: Point): number {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

export function totalLength(bones: Bone[]) {
    return bones.reduce((sum, bone) => sum + bone.length, 0);
}