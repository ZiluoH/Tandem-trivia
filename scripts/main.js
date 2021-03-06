class Quiz{
    constructor() {
        this.data = null;
        this.questionList = []; //array of random question idx
        this.questionCounter = 0; //track current question idx
        this.correctCounter = 0; //track correct answer number
        this.chosenAnswers = new Array(10).fill(null); //track the chosen answer
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

    //update text content of question according to the current question idx
    initialQuestion(){
        let question = document.getElementById('questionContent'); //get question div
        question.textContent = this.questionCounter + 1 + ". " + this.data[this.questionList[this.questionCounter]].question;
    }

    //updata content of answer
    initialAnswers(){
        let answersDiv = document.getElementById('answers');   //get answers div
        answersDiv.innerHTML = "";
        //get all choice base on current question idx
        let allChoice = this.data[this.questionList[this.questionCounter]].incorrect.concat(this.data[this.questionList[this.questionCounter]].correct);

        allChoice = shuffle(allChoice);
        // if (answersDiv.childElementCount == 0) {
        for (let i = 0; i < allChoice.length; i++) {
            const choiceInput = document.createElement('input');
            const choiceLabel = document.createElement('label');
            const choiceDiv = document.createElement('div');
            choiceInput.setAttribute('type','radio');
            choiceInput.setAttribute('name','answer');
            choiceInput.setAttribute('value', allChoice[i]);
            choiceInput.setAttribute('id', `choice${i}`);
            choiceLabel.setAttribute('for', `choice${i}`);
            choiceLabel.textContent = allChoice[i];
            choiceDiv.appendChild(choiceInput);
            choiceDiv.appendChild(choiceLabel);
            answersDiv.appendChild(choiceDiv);

            let answers = document.getElementsByName('answer');
            for(let answer of answers){
                if(this.chosenAnswers[this.questionCounter] === null){
                    answer.checked = false;
                }else{
                    if(answer.value === this.chosenAnswers[this.questionCounter]){
                        answer.checked = true;
                    }
                }
            }
        }
    }

    //update checked answer to chosen answers array
    getCheckedAnswer(){
        let answers = document.getElementsByName('answer');
        for(let answer of answers){
            if(answer.checked){
                this.chosenAnswers[this.questionCounter] = answer.value;
            }
        }
    }

    //get the next question and answer and update chosen answer
    nextQuestion(){
        if(this.questionCounter >= 0 && this.questionCounter < 9){
            this.getCheckedAnswer();
            this.questionCounter += 1;
            this.initialQuestion();
            this.initialAnswers();
        }
        if(this.questionCounter>0){
            document.getElementById('prev').style.display = 'inline-block';
        }
        if(this.questionCounter === 9){
            document.getElementById('next').style.display = 'none';
            document.getElementById('submit').style.display = 'inline-block';
        }
    }

    //get the previous question and answer update chosen answer
    prevQuestion(){
        if(this.questionCounter >= 1 && this.questionCounter <=9){
            this.getCheckedAnswer();
            this.questionCounter -=1;
            this.initialQuestion();
            this.initialAnswers();
        }
        if(this.questionCounter === 0){
            document.getElementById('prev').style.display = 'none';
        }
        if(this.questionCounter < 9){
            document.getElementById('submit').style.display = 'none';
            document.getElementById('next').style.display = 'inline-block';
        }
    }

    //submit quiz and get the total score
    submitQuiz(){
        this.getCheckedAnswer();
        //generate the correct answer
        let correctAnswer = [];
        for(let i = 0; i< this.questionList.length;i++){
            correctAnswer.push(this.data[this.questionList[i]].correct);
        }

        //check if all question is answered
        if(this.chosenAnswers.every((answer) => answer !== null)){
            for(let i = 0; i< this.chosenAnswers.length;i++){
                if(this.chosenAnswers[i] === correctAnswer[i]){
                    this.correctCounter += 1;
                }
            }
            document.getElementById('answers').innerHTML = "";
            document.getElementById('questionContent').textContent = `You score ${this.correctCounter} out of 10 questions.`
            document.getElementById('start').style.display = 'inline-block';
            document.getElementById('prev').style.display = 'none';
            document.getElementById('submit').style.display = 'none';
        }else{
            alert('You need to answer all question before submitting quiz');
            return;
        }
    }
}

// use fetch API to read json data
fetch('data.json').then(function(response){
    return response.json()
}).then(function(obj){
    quiz.fetchData(obj);
    quiz.generateQuestionIdx();
    quiz.initialQuestion();
    quiz.initialAnswers();
}).catch(function(error){
    console.error('Something went wrong with retrieving the data!')
    console.error(error)
})

// shuffle answers
function shuffle(arr){
    for(let i = arr.length - 1; i > 0; i--){
        let j = Math.floor(Math.random()*(i + 1));
        [arr[i], arr[j]] = [arr[j],arr[i]];
    }
    return arr
}

// create quiz when DOM ready
let quiz = new Quiz();
window.addEventListener('DOMContentLoaded', () => {
    quiz.fetchData();
})

function start(){
    document.getElementById('start').style.display = 'none';
    document.getElementById('next').style.display = 'inline-block';
    quiz = new Quiz();
    fetch('data.json').then(function(response){
        return response.json()
    }).then(function(obj){
        quiz.fetchData(obj);
        quiz.generateQuestionIdx();
        quiz.initialQuestion();
        quiz.initialAnswers();
    }).catch(function(error){
        console.error('Something went wrong with retrieving the data!')
        console.error(error)
    })
}

window.quiz = quiz
