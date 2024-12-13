export default class Question{
    constructor({category,correct_answer,difficulty,incorrect_answers,question,type}){
        this.category=category ;
        this.correct_answer=correct_answer;
        this.difficulty=difficulty;
        this.incorrect_answers=incorrect_answers
        this.question=question
        this.type=type
    }

    isCorrectAnswer(answer){
        return answer===this.correct_answer
    }
}
