import { getQuestions } from "./API.js";
import Quiz from "./Quiz.js";
export default class QuizManager {
    #Q
  constructor() {
    this.categoryInput = document.getElementById("category");
    this.difficultyInputs = Array.from(
      document.getElementsByName("difficulty")
    );
    this.numberOfQuestionsInput = document.getElementById("numberOfQuestions");
    this.startBtn = document.getElementById("startBtn");
  }
  run(){
    this.startBtn.addEventListener("click", async() => {
        const Data = this.#getInputsValue();
        if (Data) {
          const Quistions = await getQuestions(Data)
          const quiz = new Quiz(Quistions)
        }
      });
  }
  #getInputsValue() {
    const difficulty = this.difficultyInputs.find(
      (elemnt) => elemnt.checked
    ).value;
    const category = this.categoryInput.value;
    const numberOfQuestions = +this.numberOfQuestionsInput.value;
    return this.#validateInputs()
      ? { category, difficulty, numberOfQuestions }
      : null;
  }

  #validateInputs() {
    if (+this.numberOfQuestionsInput.value > 50 || +this.numberOfQuestionsInput.value <= 0) {
      document.getElementById("alert1").style.display = "block";
      return false;
    } else {
      document.getElementById("alert1").style.display = "none";
      return true;
    }
  }
}
