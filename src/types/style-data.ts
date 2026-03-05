export interface TransformData {
    value: number;
    unit: string;
}

export interface StyleData {
    x: number;
    y: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
    marginRight: number;
    marginBottom: number;
    opacity: number;
    scale: TransformData;
    translateX: TransformData;
    translateY: TransformData;
    translateZ: TransformData;
    rotateX: TransformData;
    rotateY: TransformData;
    rotateZ: TransformData;
}

export interface TransformDefaults extends StyleData {}

export interface IMoveData {
    posIn: StyleData | null;
    posOut: StyleData | null;
    operation: unknown;
    callback: (() => void) | null;
    statusChange: string;
    duration: number;
    staggerIndex: number;
}
