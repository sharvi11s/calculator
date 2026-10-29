
 // Stores the calculator's current angle mode.
export let angleMode = "DEG";

// Switches between degrees and radians.
function toggleAngleMode() {
    angleMode = angleMode === "DEG" ? "RAD" : "DEG";

    // Update the button to show the selected mode.
    const button = document.getElementById("angleModeBtn");

    if (button) {
        button.textContent = angleMode;
    }
}

export { toggleAngleMode };
