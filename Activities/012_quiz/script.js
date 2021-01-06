const generate = document.getElementById('generate');

let Question = (function() {
    return {
        q1() {
            let choices = ["1. Hyper Text Markup Language", "2. Hot Mail", "3. How to Make Lasagna"];
            let  mainQ = ["What does HTML stand for?", choices, 1];
            return mainQ;
        },
        q2() {
            let choices = ["1. Three", "2. Two", "3. One"];
            let mainQ = ["How many tags are in a regular element?", choices, 2];
            return mainQ;
        },
        q3() {
            let choices = ["1. Opening tag has a / in front", "2. Closing tag has a / in front", "3. There is no difference"];
            let mainQ = ["What is the difference in an opening tag and a closing tag?", choices, 2];
            return mainQ;
        },
        q4() {
            let choices = ["1. Break tag", "2. A broken one", "3. An opening tag"];
            let mainQ = ["< br  / > What type of tag is this?", choices, 1];
            return mainQ;
        },
        q5() {
            let choices = ["1. Guten", "2. Closing", "3. Opening"];
            let mainQ = ["< body > Is this an opening tag or a closing tag?", choices, 3];
            return mainQ;
        }
    };
})();

generateQuestion();
// console.log(Question.q1()[1]);
function generateQuestion() {
    console.clear();
    let randomize = 'q' + (Math.floor(Math.random() * (1 + 5 - 1)) + 1);
    let selected = eval('Question.'+ randomize +'()')
    console.log('You are answering Question #' + randomize.charAt(1) + ':')
    console.log(selected[0]);
    for(const picks of selected[1]) {
        console.log(picks);
    }
    let answer = prompt("Please enter your answer");
    checkAnswer(selected[2], parseInt(answer));
}

function checkAnswer(correctAnswer, answer) {
    // console.log(typeof(correctAnswer));
    // console.log(typeof(answer));
    // console.log("this is the CORRECT ANSWER: " + correctAnswer);
    // console.log("this is YOUR ANSWER: " + answer);
    if ((answer != null) && (answer > 0) && (answer < 4)) {
        if(answer === correctAnswer) {
            alert("You are CORRECT!");
        } else {
            alert("Please review your life choices.");
        }
    } else {
        alert("Invalid Input");
    }
}