const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-btns')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

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

function resetState () {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
        
    }
}

function selectAnswer(event) {
    const selectedButton = event.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    nextButton.classList.remove('hide')
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')

}

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


