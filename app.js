document.addEventListener('DOMContentLoaded', function () {
    // Handle Learn Button (only for intervals page)
    const learnBtn = document.getElementById('start-learn-btn');
    if (learnBtn) {
        learnBtn.addEventListener('click', function () {
            // Redirect to the first interval quiz/learning page
            window.location.href = 'interval-quiz.html'; // This page will be created later
        });
    }
});
