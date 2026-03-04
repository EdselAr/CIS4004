const title = document.getElementById('site-title');
const splashContainer = document.getElementById('splash-container');
const notesContainer = document.getElementById('falling-notes-container');
const mainContent = document.getElementById('main-content');

let fillPercentage = 0;
const totalNotes = 20;
const increment = 100 / totalNotes; // 5% per note
const noteSymbols = ['♪', '♫', '♩', '♬'];

function spawnNote() {
    // 1. Create the note
    const note = document.createElement('div');
    note.classList.add('music-note');
    note.innerText = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];
    
    // Randomize starting horizontal position
    note.style.left = Math.random() * 90 + 5 + 'vw';
    
    notesContainer.appendChild(note);

    // 2. Increase the fill percentage of the title
    fillPercentage += increment;
    title.style.setProperty('--fill-percent', `${fillPercentage}%`);

    // 3. Clean up the note from the DOM after it finishes falling (2 seconds)
    setTimeout(() => {
        note.remove();
    }, 2000);

    // 4. Check if we are done
    if (fillPercentage >= 100) {
        clearInterval(noteInterval);
        triggerSiteReveal();
    }
}

// Start spawning notes every 150ms
const noteInterval = setInterval(spawnNote, 150);

function triggerSiteReveal() {
    // Wait a brief moment after filling up before moving
    setTimeout(() => {
        // Move title to top
        title.classList.add('move-to-top');
        
        // Hide the falling notes container
        notesContainer.style.opacity = '0';

        // Wait for the title to finish moving (1.5s as set in CSS), then show the rest of the site
        setTimeout(() => {
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
        }, 1500);

    }, 800);
}
