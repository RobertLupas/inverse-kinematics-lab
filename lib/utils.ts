export function getSlider(id: string): number {
    return parseFloat((document.getElementById(id) as HTMLInputElement).value);
}

export function getSelector(id: string): string {
    return (document.getElementById(id) as HTMLSelectElement).value;
}
