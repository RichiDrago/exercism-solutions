//
// This is only a SKELETON file for the 'Bob' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const BOB_RESPONSES = {
  question: 'Sure.',
  yell: 'Whoa, chill out!',
  yellQuestion: 'Calm down, I know what I\'m doing!',
  silence: 'Fine. Be that way!',
  default: 'Whatever.'
};

export const hey = (message) => {

  const isQuestion = message.trim().endsWith('?');
  const isYell = message.toUpperCase() === message && /[A-Z]/.test(message);

  // Yelling question
  if (isYell && isQuestion) {
    return BOB_RESPONSES.yellQuestion;
  }

  // Yelling
  if (isYell) {
    return BOB_RESPONSES.yell;
  }

  // Question
  if (isQuestion) {
    return BOB_RESPONSES.question;
  }

  // All white space
  if (message.trim().length === 0) {
    return BOB_RESPONSES.silence;
  }

  return BOB_RESPONSES.default;
};
