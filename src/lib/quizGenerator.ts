import { Course, Quiz } from '../types';

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SHAPES = ["⭕", "🟥", "🔺", "▭"];
const SHAPE_NAMES = ["Hình tròn", "Hình vuông", "Hình tam giác", "Hình chữ nhật"];
const FRUITS = ["🍎", "🍊", "🍓", "🍉", "🍌", "🍇"];
const FRUIT_NAMES = ["Quả táo", "Quả cam", "Quả dâu", "Dưa hấu", "Quả chuối", "Quả nho"];
const ANIMALS = ["🐶", "🐱", "🐭", "🐰", "🦊", "🐻", "🐼", "🐯", "🦁", "🐮", "🐷", "🐸", "🐔", "🐧", "🐦", "🐤", "🦆", "🦅", "🦉", "🦇"];
const ANIMAL_NAMES = ["Chó", "Mèo", "Chuột", "Thỏ", "Cáo", "Gấu", "Gấu trúc", "Hổ", "Sư tử", "Bò", "Lợn", "Ếch", "Gà", "Chim cánh cụt", "Chim", "Gà con", "Vịt", "Đại bàng", "Cú", "Dơi"];
const LETTERS = "AĂÂBCDĐEÊGHIKLMNOÔƠPQRSTUƯVXY".split('');
const LOWER_LETTERS = "aăâbcdđeêghiklmnoôơpqrstuưvxy".split('');

function generateMathQuiz(lessonId: string): Quiz | null {
  if (lessonId.startsWith('m-t1') || lessonId.startsWith('m-t4')) {
    let a = getRandomInt(0, 20);
    let b = getRandomInt(0, 20);
    while (a === b) b = getRandomInt(0, 20);
    
    const type = getRandomInt(0, 2);
    if (type === 0) {
      const count = getRandomInt(1, 10);
      const icon = FRUITS[getRandomInt(0, FRUITS.length - 1)];
      const illustration = Array(count).fill(icon).join('');
      const options = [count.toString(), getRandomInt(1, 15).toString(), getRandomInt(1, 15).toString()];
      while (options[1] === options[0]) options[1] = getRandomInt(1, 15).toString();
      while (options[2] === options[0] || options[2] === options[1]) options[2] = getRandomInt(1, 15).toString();
      const correctAnswer = getRandomInt(0, 2);
      const temp = options[0];
      options[0] = options[correctAnswer];
      options[correctAnswer] = temp;
      return { question: `Có mấy ${icon}?`, speakText: `Có bao nhiêu đồ vật trong hình?`, illustration, options, correctAnswer };
    } else {
      const options = ["Lớn hơn", "Bé hơn", "Bằng nhau"];
      let ans = a > b ? 0 : 1;
      return { question: `Số ${a} và số ${b}?`, speakText: `Số ${a} lớn hơn, bé hơn hay bằng số ${b}?`, illustration: `${a} ... ${b}`, options, correctAnswer: ans };
    }
  } else if (lessonId.startsWith('m-t2')) {
    let a = getRandomInt(0, 10);
    let b = getRandomInt(0, 10 - a);
    let sum = a + b;
    const options = [sum.toString(), (sum+1).toString(), Math.max(0, sum-1).toString()];
    const correctAnswer = getRandomInt(0, 2);
    const temp = options[0];
    options[0] = options[correctAnswer];
    options[correctAnswer] = temp;
    return { question: `${a} + ${b} = ?`, speakText: `${a} cộng ${b} bằng mấy?`, illustration: `${a} + ${b}`, options, correctAnswer };
  } else if (lessonId.startsWith('m-t3')) {
    let a = getRandomInt(0, 10);
    let b = getRandomInt(0, a);
    let diff = a - b;
    const options = [diff.toString(), (diff+1).toString(), Math.max(0, diff-1).toString()];
    const correctAnswer = getRandomInt(0, 2);
    const temp = options[0];
    options[0] = options[correctAnswer];
    options[correctAnswer] = temp;
    return { question: `${a} - ${b} = ?`, speakText: `${a} trừ ${b} bằng mấy?`, illustration: `${a} - ${b}`, options, correctAnswer };
  } else if (lessonId.startsWith('m-t5')) {
    const idx = getRandomInt(0, 3);
    const shape = SHAPES[idx];
    const shapeName = SHAPE_NAMES[idx];
    const options = [shapeName, SHAPE_NAMES[(idx+1)%4], SHAPE_NAMES[(idx+2)%4]];
    const correctAnswer = getRandomInt(0, 2);
    const temp = options[0];
    options[0] = options[correctAnswer];
    options[correctAnswer] = temp;
    return { question: `Đây là hình gì?`, speakText: `Đây là hình gì?`, illustration: shape, options, correctAnswer };
  } else if (lessonId.startsWith('m-t6')) {
    let hour = getRandomInt(1, 12);
    const options = [`${hour} giờ`, `${(hour % 12) + 1} giờ`, `${(hour + 2) % 12 || 12} giờ`];
    const correctAnswer = getRandomInt(0, 2);
    const temp = options[0];
    options[0] = options[correctAnswer];
    options[correctAnswer] = temp;
    return { question: `Đồng hồ chỉ mấy giờ?`, speakText: `Kim ngắn chỉ số ${hour}, là mấy giờ?`, illustration: `🕒 (${hour}:00)`, options, correctAnswer };
  }
  return { question: `1 + 1 = ?`, speakText: `Một cộng một bằng mấy?`, illustration: `1 + 1`, options: ["2", "3", "4"], correctAnswer: 0 };
}

function generateVietnameseQuiz(lessonId: string): Quiz | null {
  if (lessonId.startsWith('v-t1') || lessonId.startsWith('v-t2') || lessonId.startsWith('v-t3')) {
    const isUpper = getRandomInt(0, 1) === 0;
    const idx = getRandomInt(0, LETTERS.length - 1);
    const letter = isUpper ? LETTERS[idx] : LOWER_LETTERS[idx];
    const options = [letter, isUpper ? LETTERS[(idx+1)%LETTERS.length] : LOWER_LETTERS[(idx+1)%LOWER_LETTERS.length], isUpper ? LETTERS[(idx+2)%LETTERS.length] : LOWER_LETTERS[(idx+2)%LOWER_LETTERS.length]];
    const correctAnswer = getRandomInt(0, 2);
    const temp = options[0];
    options[0] = options[correctAnswer];
    options[correctAnswer] = temp;
    return { question: `Đâu là chữ ${LETTERS[idx]}?`, speakText: `Bé hãy chọn chữ ${LETTERS[idx]}`, illustration: "?", options, correctAnswer };
  } else {
    const idx = getRandomInt(0, ANIMALS.length - 1);
    const animal = ANIMALS[idx];
    const animalName = ANIMAL_NAMES[idx];
    const options = [animalName, ANIMAL_NAMES[(idx+1)%ANIMALS.length], ANIMAL_NAMES[(idx+2)%ANIMALS.length]];
    const correctAnswer = getRandomInt(0, 2);
    const temp = options[0];
    options[0] = options[correctAnswer];
    options[correctAnswer] = temp;
    return { question: `Đây là con gì?`, speakText: `Trong hình này là con gì?`, illustration: animal, options, correctAnswer };
  }
}

export function expandCourses(courses: Course[]): Course[] {
  return courses.map(course => {
    return {
      ...course,
      topics: course.topics.map(topic => {
        return {
          ...topic,
          lessons: topic.lessons.map(lesson => {
            const newQuizzes = [...(lesson.quizzes || [])];
            let loopCount = 0;
            while (newQuizzes.length < 20 && loopCount < 100) {
              let q = null;
              if (course.id === 'MATH') {
                q = generateMathQuiz(lesson.id);
              } else {
                q = generateVietnameseQuiz(lesson.id);
              }
              if (q) {
                newQuizzes.push(q);
              }
              loopCount++;
            }
            return {
              ...lesson,
              quizzes: newQuizzes
            };
          })
        };
      })
    };
  });
}
