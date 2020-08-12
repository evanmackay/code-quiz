// creating variables based on the ID's set in the HTML
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-btns')
const timeElement = document.getElementById('timer')
const header = document.getElementById('header')
const gameOverElement = document.getElementById('game-over')
const highScoresButton = document.getElementById('high-scores')
// creating variables that will be undefined
let shuffledQuestions, currentQuestionIndex
// creating a score counter
let countRightAnswers =0
// setting the amount of seconds the user has left to complet quiz
let secondsLeft = 60

// start button and next button event listeners
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
highScoresButton.addEventListener('click', setHighScore)


// function that starts the game and selects which questions will be asked at random
function startGame() {
    startButton.classList.add('hide')
    header.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    timeElement.classList.remove('hide')
    startTimer()
    setNextQuestion()
    countRightAnswers = 0
}
// sets the next question once the 'next' button is pressed
function setNextQuestion () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
// shows questions and answers in the quiz instead of text from HTML
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
// resets the state of the game once the next is pressed
function resetState () {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
        
    }
}
// function to tell the app whether or not the app should continue to the next question or not. Also keeps the score count and subtracts time if the users answer choice is wrong
function selectAnswer(event) {
    const selectedButton = event.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        gameOver()
    }
    if (selectedButton.dataset = correct) {
        countRightAnswers++
    } else {
        secondsLeft = secondsLeft-10
    }
    document.getElementById('right-answers').innerHTML = 'Score: ' +countRightAnswers + ' out of 5'
}
// function to display the color in the background that corresponds to the right or wrong answer
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}
// clears the status that is set by selecting a right or wrong answer
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')

}
// timer that will start when the quiz starts and ends when time runs out
function startTimer() {
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timeElement.textContent = "You have " + secondsLeft + " seconds left!";

        if (secondsLeft <= 0) {
            clearInterval(timerInterval)
            gameOver()
        }
    }, 1000)
}
// function that shows the game over section of the HTML. Users can enter their intials to save their score and view their high scores.
function gameOver () {

    gameOverElement.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    timeElement.classList.add('hide')
    resetState()
}

function setHighScore() {
    let highScoreData = prompt('Enter your intials to save your high score to your local storage!')
    localStorage.setItem(highScoreData, countRightAnswers)
}


// group of objects that defines the questions and answers
const questions= [{
    question: 'What is an array?',
    answers: [
        {text: 'A special variable which can hold more than 1 value', correct: true}, 
    {text: 'A variable that can store a single item of text', correct: false}, 
    {text: 'A single number', correct: false},
    {text: 'A way to create a proccess that will perform a task for you.', correct: false}]
    
},
{
    question: 'What would farmAnimals.length be for this array? farmAnimals = ["cow", "chicken", "pig", "goat"]?',
    answers: [
    {text: '3', correct: false},
    {text: '4', correct: true},
    {text: '2', correct: false},
    {text: '5', correct: false}]
},
{
    question: 'What does API stand for?',
    answers: [
    {text: 'Aritficial Proportions Interface', correct: false},
    {text: 'Application Property Inspector', correct: false},
    {text: 'Aggregating Personal Identificaiton', correct: false},
    {text: 'Application Programmnig Interface', correct: true}]
},
{
    question: 'What are the 3 fundamental programs we use for front-end web development?',
    answers: [
    {text: 'HTML, Bootstrap, Jquery', correct: false},
    {text: 'Github, StackOverflow, MDN', correct: false},
    {text: 'HTML, CSS, JavaScript', correct: true},
    {text: 'JavaScript, React, Node.js', correct: false}]
},
{
    question: 'Which of these would I use to apply text to an element in an HTML file using JavaScript?',
    answers: [
    {text: '.createText', correct: false},
    {text: '.textInclude', correct: false},
    {text: '.textContent', correct: true},
    {text: '.addText', correct: false}]
}]







