// --- UI & ANIMATION LOGIC ---
const title = document.getElementById('site-title');
const mainContent = document.getElementById('main-content');

let fillPercentage = 0;
const totalNotesToFill = 20;
const increment = 100 / totalNotesToFill; 
let isRevealed = false; 

function createNote() {
    const note = document.createElement('div');
    note.classList.add('note');

    const noteShapes = ['&#9833;', '&#9834;', '&#9835;', '&#9836;']; 
    note.innerHTML = noteShapes[Math.floor(Math.random() * noteShapes.length)];

    const colors = ['#d8b4e2', '#a64d79', '#674ea7', '#ffffff', '#ff00ff', '#8a2be2'];
    
    const leftPosition = Math.random() * 100;
    const animationDuration = Math.random() * 5 + 4; 
    const size = Math.random() * 20 + 12; 
    const color = colors[Math.floor(Math.random() * colors.length)]; 
    const opacity = Math.random() * 0.6 + 0.2; 

    note.style.left = `${leftPosition}vw`;
    note.style.animationDuration = `${animationDuration}s`;
    note.style.fontSize = `${size}px`;
    note.style.color = color;
    note.style.opacity = opacity;
    note.style.textShadow = `0 0 ${size / 2}px ${color}, 0 0 ${size}px ${color}`;

    document.body.appendChild(note);

    setTimeout(() => {
        note.remove();
    }, animationDuration * 1000);
}

// --- NEW: COLLISION DETECTION LOGIC ---
function checkCollisions() {
    if (isRevealed) return; // Stop checking once it's fully revealed

    // Get the exact position of the invisible title on the screen
    const titleRect = title.getBoundingClientRect();
    
    // Grab all notes that haven't triggered a collision yet
    const notes = document.querySelectorAll('.note:not(.hit)');

    notes.forEach(note => {
        // Get the exact position of this specific falling note
        const noteRect = note.getBoundingClientRect();

        // Check if the note's box overlaps with the title's box
        if (
            noteRect.bottom >= titleRect.top &&
            noteRect.top <= titleRect.bottom &&
            noteRect.right >= titleRect.left &&
            noteRect.left <= titleRect.right
        ) {
            // Mark this note as "hit"
            note.classList.add('hit');

            // NEW: Freeze the note in place so it stops falling
            note.style.animationPlayState = 'paused';

            // NEW: Delete the note completely after the absorb animation finishes (400ms)
            setTimeout(() => note.remove(), 400);

            // Increase the fill percentage
            fillPercentage += increment;
            if (fillPercentage > 100) fillPercentage = 100;
            title.style.setProperty('--fill-percent', `${fillPercentage}%`);

            // If it's full, trigger the reveal!
            if (fillPercentage >= 100) {
                isRevealed = true;
                triggerSiteReveal();
            }
        }
    });

    // Run this check again on the next animation frame
    requestAnimationFrame(checkCollisions);
}

// Start the continuous collision loop
requestAnimationFrame(checkCollisions);

function triggerSiteReveal() {
    setTimeout(() => {
        title.classList.add('move-to-top');
        
        setTimeout(() => {
            document.body.style.overflow = 'auto'; 
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
        }, 1500);

    }, 500);
}

// Spawn a new note every 150 milliseconds
setInterval(createNote, 150);
