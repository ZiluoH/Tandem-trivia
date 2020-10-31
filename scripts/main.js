// use fetch API to read json data
// fetch('data.json').then(function(response){
//     return response.json()
// }).then(function(obj){
//     console.log(obj);
// }).catch(function(error){
//     console.error('Something went wrong with retrieving the data!')
//     console.error(error)
// })

// function createQuestionList(data){
//     let questionList = [];

// }

class Quiz{
    constructor() {
        this.data = null;
        this.questionList = []; //array of random question idx
        this.questionCounter = 0; //track current question idx
        this.correctCounter = 0; //track correct answer number
        this.answersDiv = document.getElementById('answers');   //get answers div
    }

    fetchData(data){
        this.data = data;
    }

    //generate a random array
    generateQuestionIdx(){
        this.questionList = [];
        while(this.questionList.length < 10){
            let idx = Math.floor(Math.random() * this.data.length);
            if(this.questionList.indexOf(idx) === -1){
                this.questionList.push(idx)
            }
        }
    }

    //update text content of question according to the current quesion idx
    initialQuestion(){
        let question = document.getElementById('questionContent'); //get question div
        question.textContent = this.questionCounter + 1 + ". " + this.data[this.questionList[this.questionCounter]].question;
    }

    
}

// use fetch API to read json data
fetch('data.json').then(function(response){
    return response.json()
}).then(function(obj){
    quiz.fetchData(obj);
    quiz.generateQuestionIdx();
    quiz.initialQuestion();
}).catch(function(error){
    console.error('Something went wrong with retrieving the data!')
    console.error(error)
})

// create quiz when DOM ready
let quiz = new Quiz();
window.addEventListener('DOMContentLoaded', () => {
    quiz.fetchData();
})

window.quiz = quiz
