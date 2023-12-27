function createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.border = '1px solid black';
    document.body.appendChild(canvas);
    return {
        canvas,
        getContext() {
            return canvas.getContext('2d');
        },
        clean() {
            const ctx = canvas.getContext('2d');
            ctx!.clearRect(0, 0, 400, 400);
        }
    }
}

export { createCanvas };
