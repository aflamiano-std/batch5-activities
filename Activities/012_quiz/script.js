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

let add = (function () {
    var counter = 0;
    return function () {counter += 1; return counter}
})();

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
    checkAnswer(selected[2], answer);
}

function checkAnswer(correctAnswer, answer) {
    let parsed = parseInt(answer);
    if (answer == 'exit') {
        return;
    } else if ((parsed != null) && (parsed > 0) && (parsed < 4)) {
        if( parsed === correctAnswer) {
            alert("You are CORRECT!");
            if(add() % 5 === 0 ) {
                alert("5 in a row!");
            } else {
                //DO NOTHING
            }
        } else {
            alert("Please review your life choices.");
        }
    } else {
        alert("Invalid Input");
    }
    generateQuestion();
}
