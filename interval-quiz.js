document.addEventListener('DOMContentLoaded', function () {
    // Hardcoded questions (1-8)
    const hardcodedQuestions = [
        { notes: ['e/4', 'f/4'], interval: 'Second' },
        { notes: ['e/4', 'g/4'], interval: 'Third' },
        { notes: ['e/4', 'a/4'], interval: 'Fourth' },
        { notes: ['e/4', 'b/4'], interval: 'Fifth' },
        { notes: ['e/4', 'c/5'], interval: 'Sixth' },
        { notes: ['e/4', 'd/5'], interval: 'Seventh' },
        { notes: ['e/4', 'e/5'], interval: 'Octave' },
        { notes: ['e/4', 'e/4'], interval: 'Unison' },
    ];

    let currentQuestionIndex = 0;
    let streak = 0;
    let startTime = 0;

    function renderNotesOnStaff(notes) {
        const VF = Vex.Flow;

        // Clear the rendering context
        const div = document.getElementById("staffCanvas");
        div.innerHTML = ""; // Clear previous content

        // Set up renderer and context with smaller width
        const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        renderer.resize(300, 150); // Adjust width and height
        const context = renderer.getContext();

        // Create a stave without a clef
        const stave = new VF.Stave(10, 40, 250);
        stave.setContext(context).draw();

        // Create VexFlow notes from input
        const vexNotes = notes.map(note => new VF.StaveNote({
            clef: "treble",
            keys: [note],
            duration: "q",
        }));

        // Format and draw the notes on the stave
        VF.Formatter.FormatAndDraw(context, stave, vexNotes);
    }

    function displayQuestion() {
        const question = hardcodedQuestions[currentQuestionIndex];
        renderNotesOnStaff(question.notes);
        startTime = new Date().getTime(); // Start the timer
    }

    // Handle interval button clicks
    document.querySelectorAll('.interval-btn').forEach(button => {
        button.addEventListener('click', function () {
            const selectedInterval = this.getAttribute('data-interval');
            checkAnswer(selectedInterval);
        });
    });

    // Check the user's answer
    function checkAnswer(selectedInterval) {
        const correctInterval = hardcodedQuestions[currentQuestionIndex].interval;
        const timeTaken = ((new Date().getTime() - startTime) / 1000).toFixed(1); // Display to one decimal place
    
        if (selectedInterval === correctInterval) {
            streak++;
            document.getElementById('streak-indicator').innerText = `Streak: ${streak}`;
            // Move to next question or randomize based on performance criteria
            currentQuestionIndex = (currentQuestionIndex + 1) % hardcodedQuestions.length; // Loop through questions
            displayQuestion();
        } else {
            streak = 0; // Reset streak on wrong answer
            document.getElementById('streak-indicator').innerText = `Streak: ${streak}`;
        }
    
        // Update timer indicator
        document.getElementById('timer-indicator').innerText = `Time: ${timeTaken} sec`;
    }

    // Start the quiz with the first question
    displayQuestion();
});
