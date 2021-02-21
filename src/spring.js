const $ = (s) => document.querySelector(s);
const square = $(".square");

const DISPL_THRESHOLD = 3;

let mouseX;
let mouseY;

let dragDx = 0;
let dragDy = 0;

let animation;

function transformDrag(dx, dy) {
    square.style.transform = `translate(${dx}px, ${dy}px)`;
}

function handleMouseMove(e) {
    const dx = e.clientX - mouseX;
    const dy = e.clientY - mouseY;
    dragDx = dragDx + dx;
    dragDy = dragDy + dy;
    mouseX = e.clientX;
    mouseY = e.clientY;
    transformDrag(dragDx, dragDy);
}

function handleMouseDown(e) {
    if (animation) {
        animation.cancel();
    }

    mouseX = e.clientX;
    mouseY = e.clientY;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
}

function handleMouseUp(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    console.debug(`Displacement on X axis: ${dragDx}`);
    console.debug(`Displacement on Y axis: ${dragDy}`);

    const {
        positions,
        frames
    } = createSpringAnimation(dragDx, dragDy);

    dragDx = 0;
    dragDy = 0;

    square.style.transform = ""; // Cancel all transforms right before animation

    if (positions.length > 0) {
        const keyframes = new KeyframeEffect(square, positions, {
            duration: (frames / 60) * 1000,
            fill: "both",
            easing: "linear",
            iterations: 1
        });

        animation = new Animation(keyframes);

        animation.play();
    }

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
}

/*
  Fspring + Fdamping = a * m
  a = (Fspring + Fdamping) / m
  a = (-k * x + d * v)  / m (where k = stiffness, d = damping ratio)
  Calculate next speed from acceleration: v2 = v1 + a * t
  Calculate next position from previous position and speed: p2 = p1 + v * t
*/
function createSpringAnimation(
    dx,
    dy,
    stiffness = 600,
    damping = 7,
    mass = 1
) {
    if (dx === 0 && dy === 0) return {
        positions: [],
        frames: 0
    };

    const spring_length = 0;
    const k = -stiffness;
    const d = -damping;
    const frame_rate = 1 / 60;

    let x = dx;
    let y = dy;

    let velocity_x = 0;
    let velocity_y = 0;

    let positions = [];

    let frames = 0;
    let frames_below_threshold = 0;
    let largest_displ;

    for (let step = 0; step <= 1000; step += 1) {
        let Fspring_x = k * (x - spring_length);
        let Fspring_y = k * (y - spring_length);
        let Fdamping_x = d * velocity_x;
        let Fdamping_y = d * velocity_y;

        let accel_x = (Fspring_x + Fdamping_x) / mass;
        let accel_y = (Fspring_y + Fdamping_y) / mass;

        velocity_x += accel_x * frame_rate;
        velocity_y += accel_y * frame_rate;

        x += velocity_x * frame_rate;
        y += velocity_y * frame_rate;

        positions.push({
            transform: `translate(${x}px, ${y}px)`
        });

        // Save the last largest displacement so that we can compare it with threshold later
        largest_displ =
            largest_displ < 0 ?
            Math.max(largest_displ || -Infinity, Math.sqrt(x ** 2 + y ** 2)) :
            Math.min(largest_displ || Infinity, Math.sqrt(x ** 2 + y ** 2));

        if (Math.abs(largest_displ) < DISPL_THRESHOLD) {
            frames_below_threshold += 1;
        } else {
            frames_below_threshold = 0; // Reset the frame counter
        }

        if (frames_below_threshold >= 60) {
            frames = step;
            break;
        }
    }

    if (frames == 0) {
        frames = 1000;
    }



    return {
        positions,
        frames
    };
}

square.addEventListener("mousedown", handleMouseDown);