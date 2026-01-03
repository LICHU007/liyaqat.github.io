document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "Which of these is NOT a core principle of Glassmorphism?",
            options: ["Translucency", "Multi-layered shadows", "Vibrant colors", "Opaque backgrounds"],
            correctAnswer: "Opaque backgrounds"
        },
        {
            question: "What CSS property creates the 'frosted glass' effect?",
            options: ["filter: blur()", "backdrop-filter: blur()", "opacity: 0.5", "background-blend-mode"],
            correctAnswer: "backdrop-filter: blur()"
        },
        {
            question: "Which OS famously adopted Glassmorphism in its UI?",
            options: ["Windows XP", "iOS (post-iOS 7)", "Android Lollipop", "Ubuntu Linux"],
            correctAnswer: "iOS (post-iOS 7)"
        },
        {
            question: "What element provides depth in Glassmorphism?",
            options: ["Strong border-radius", "Text shadows", "Subtle multi-layered shadows", "Solid color fills"],
            correctAnswer: "Subtle multi-layered shadows"
        }
    ];

    const quizStatusElement = document.getElementById('quizStatus');
    const questionTextElement = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const nextButton = document.getElementById('nextButton');
    const restartButton = document.getElementById('restartButton');
    const quizCard = document.getElementById('quizCard'); // For animation

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;
    let questionAnswered = false;

    function loadQuestion() {
        if (currentQuestionIndex < quizData.length) {
            quizStatusElement.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
            questionTextElement.textContent = quizData[currentQuestionIndex].question;
            optionsContainer.innerHTML = '';
            selectedOption = null;
            questionAnswered = false;
            nextButton.classList.remove('hidden'); // Show next button
            restartButton.classList.add('hidden'); // Hide restart button

            quizData[currentQuestionIndex].options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('option');
                button.textContent = option;
                button.addEventListener('click', () => selectOption(button, option));
                optionsContainer.appendChild(button);
            });
        } else {
            showResults();
        }
    }

    function selectOption(button, option) {
        if (questionAnswered) return; // Prevent changing selection after answering

        // Remove 'selected' from previously selected option
        if (selectedOption) {
            selectedOption.classList.remove('selected');
        }
        
        button.classList.add('selected');
        selectedOption = button;
    }

    function checkAnswer() {
        if (!selectedOption || questionAnswered) return; // Don't check if no option selected or already answered
        
        questionAnswered = true; // Mark question as answered

        const correctAnswer = quizData[currentQuestionIndex].correctAnswer;
        const selectedAnswer = selectedOption.textContent;

        if (selectedAnswer === correctAnswer) {
            score++;
            selectedOption.classList.add('correct');
        } else {
            selectedOption.classList.add('wrong');
            // Optionally, highlight the correct answer
            Array.from(optionsContainer.children).forEach(optionBtn => {
                if (optionBtn.textContent === correctAnswer) {
                    optionBtn.classList.add('correct');
                }
            });
        }

        // Disable all options after an answer is chosen
        Array.from(optionsContainer.children).forEach(optionBtn => {
            optionBtn.style.pointerEvents = 'none';
        });

        // Small delay before moving to next question (for visual feedback)
        // setTimeout(() => {
        //     currentQuestionIndex++;
        //     loadQuestion();
        // }, 1500); // 1.5 seconds delay
    }

    function showResults() {
        quizStatusElement.textContent = `Quiz Finished!`;
        questionTextElement.textContent = `You scored ${score} out of ${quizData.length} questions!`;
        optionsContainer.innerHTML = ''; // Clear options
        nextButton.classList.add('hidden'); // Hide next button
        restartButton.classList.remove('hidden'); // Show restart button
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        loadQuestion();
    }

    nextButton.addEventListener('click', () => {
        // If not answered yet, check the answer first
        if (!questionAnswered && selectedOption) {
            checkAnswer();
            // Allow user to see feedback, then click next again
            // Or auto advance after a timeout (currently manual for feedback)
            setTimeout(() => {
                currentQuestionIndex++;
                loadQuestion();
            }, 1000); // 1-second delay for feedback before loading next
        } else if (questionAnswered) { // If answered, just go to next question
            currentQuestionIndex++;
            loadQuestion();
        } else {
            // Optional: Provide feedback to user to select an option
            alert('Please select an option before proceeding!');
        }
    });

    restartButton.addEventListener('click', restartQuiz);

    // Initial load
    loadQuestion();
});
