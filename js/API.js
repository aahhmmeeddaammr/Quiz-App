export const getQuestions = async ({
  category,
  difficulty,
  numberOfQuestions,
}) => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`
  );
  const { results } = await res.json();
  return results;
};
