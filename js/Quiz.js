import Question from "./Question.js";
function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export default class Quiz {
  constructor(Quistions) {
    this.Quistions = [...Quistions.map((Q) => new Question(Q))];
    this.currentQuestion = document.getElementById("currentQuestion");
    this.counter = 0;
    this.MAX_NUMBEROFQuestions = this.Quistions.length;
    this.nextBtn = document.getElementById("next");
    this.inCorrectSpan = document.getElementById("inCorrect");
    this.CorrectSpan = document.getElementById("Correct");
    this.alert = document.getElementById("alert");
    this.corretcounter = 0;
    this.nextBtn.addEventListener("click", () => {
      const userAnswer = this.#isAnswered();
      if (!userAnswer) {
        this.alert.classList.add("show");
      } else {
        this.alert.classList.remove("show");
        if (this.Quistions[this.counter].isCorrectAnswer(userAnswer.value)) {
          this.CorrectSpan.classList.add("show");
          this.corretcounter++;
        } else {
          this.inCorrectSpan.classList.add("show");
        }
        const x = setInterval(() => {
          this.CorrectSpan.classList.remove("show");
          this.inCorrectSpan.classList.remove("show");
          this.counter++;
          if (this.counter >= this.MAX_NUMBEROFQuestions) {
            this.#Finalize();
          } else {
            this.#showQuestion();
          }
          clearInterval(x)
        }, 1500);
      }
    });
    this.#showQuestions();
  }
  #showQuestions() {
    document.getElementById("setting").classList.replace("show", "d-none");
    document.getElementById("quiz").classList.add("show");
    document.getElementById("totalNumberOfQuestions").innerText =
      this.MAX_NUMBEROFQuestions;
    this.#showQuestion();
  }
  #showQuestion() {
    this.currentQuestion.innerText = this.counter + 1;
    const currentQuestionx = this.Quistions[this.counter];
    document.getElementById("question").innerText = currentQuestionx.question;
    const answers = shuffle([
      ...currentQuestionx.incorrect_answers,
      currentQuestionx.correct_answer,
    ]);
    document.getElementById("rowAnswer").innerHTML = answers
      .map(
        (answer) => `<li class="my-3 animate__animated">
                    <div class="d-flex align-items-center">
                        <input  type="radio" name="answer" value="${answer}" />
                        <div class="state p-success-o">
                            <label class="m-0 p-2"> ${answer} </label>
                        </div>
                    </div>
                </li>`
      )
      .join(" ");
    this.answers = Array.from(document.getElementsByName("answer"));
  }
  #isAnswered() {
    const selected = this.answers.find((q) => q.checked);
    return selected;
  }
  #Finalize() {
    document.getElementById("quiz").classList.replace("show", "d-none");
    document.getElementById("finish").classList.add("show");
    document.getElementById("score").innerText = this.corretcounter;
    document.getElementById("tryBtn").addEventListener("click" , ()=>{
        window.location.reload();
    })
  }
}
