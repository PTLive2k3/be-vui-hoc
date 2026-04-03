
import { Course, SubjectType, User, TutorialStep } from './types';

// NOTE: Để sử dụng file âm thanh, bạn hãy copy file .mp3 vào thư mục public/sounds/
// Ví dụ: public/sounds/intro.mp3

export const TUTORIAL_STEPS_CONFIG = {
  BUTTON_GUIDE: [
    {
      targetId: 'btn-global-assist',
      message: 'Bé ơi, khi nào cần giúp đỡ thì ấn vào nút này nhé!',
      audio: 'Bé ơi, khi nào cần giúp đỡ thì ấn vào nút này nhé!',
      audioUrl: '/sounds/tutorial/assist_button.mp3', // Example path
      position: 'right'
    }
  ] as TutorialStep[],
  HOME: [
    {
      targetId: 'user-info-bar',
      message: 'Chào bé! Đây là tên và ảnh đại diện của bé nè.',
      audio: 'Chào bé! Đây là tên và ảnh đại diện của bé nè.',
      // audioUrl: '/sounds/tutorial/home_user_info.mp3',
      position: 'top'
    },
    {
      targetId: 'course-MATH',
      message: 'Bé ấn vào đây để học Toán: Đếm số, cộng trừ...',
      audio: 'Bé ấn vào đây để học Toán: Đếm số, cộng trừ...',
      position: 'top'
    },
    {
      targetId: 'course-VIETNAMESE',
      message: 'Còn đây là Tiếng Việt: Học chữ cái và đánh vần.',
      audio: 'Còn đây là Tiếng Việt: Học chữ cái và đánh vần.',
      position: 'top'
    },
    {
      targetId: 'btn-stats',
      message: 'Bé xem ngôi sao và huy hiệu mình đạt được ở đây nhé.',
      audio: 'Bé xem ngôi sao và huy hiệu mình đạt được ở đây nhé.',
      position: 'bottom'
    }
  ] as TutorialStep[],
  SUBJECT: [
    {
      targetId: 'btn-back-home',
      message: 'Ấn vào đây để quay lại trang chủ chọn môn khác.',
      audio: 'Ấn vào đây để quay lại trang chủ chọn môn khác.',
      position: 'bottom'
    },
    {
      targetId: 'topic-list',
      message: 'Đây là danh sách các bài học. Bé chọn một bài để học nhé.',
      audio: 'Đây là danh sách các bài học. Bé chọn một bài để học nhé.',
      position: 'top'
    }
  ] as TutorialStep[],
  LESSON_PRACTICE: [
    {
        targetId: 'btn-quiz-question-audio',
        message: 'Bé ấn vào cái loa này để nghe câu hỏi nhé!',
        audio: 'Bé ấn vào cái loa này để nghe câu hỏi nhé!',
        position: 'left'
    },
    {
        targetId: 'btn-quiz-option-audio-0',
        message: 'Còn đây là loa để nghe đáp án.',
        audio: 'Còn đây là loa để nghe đáp án.',
        position: 'top'
    },
    {
        targetId: 'btn-next-question',
        message: 'Trả lời xong rồi, bé ấn vào đây để tiếp tục nhé!',
        audio: 'Trả lời xong rồi, bé ấn vào đây để tiếp tục nhé!',
        position: 'top'
    }
  ] as TutorialStep[],
  STATS: [
    {
      targetId: 'stats-summary',
      message: 'Đây là tổng kết kết quả học tập của bé.',
      audio: 'Đây là tổng kết kết quả học tập của bé.',
      position: 'bottom'
    },
    {
      targetId: 'stats-chart',
      message: 'Biểu đồ này cho biết bé đã học được bao nhiêu bài Toán và Tiếng Việt.',
      audio: 'Biểu đồ này cho biết bé đã học được bao nhiêu bài Toán và Tiếng Việt.',
      position: 'top'
    }
  ] as TutorialStep[]
};

export const COURSES: Course[] = [
  {
    id: SubjectType.MATH,
    title: "Toán Lớp 1",
    icon: "Calculator",
    color: "bg-blue-500",
    topics: [
      {
        id: "m-t1",
        title: "Chủ đề 1: Đếm số (0-20)",
        lessons: [
          { 
            id: "m-t1-l1", 
            title: "Bài 1: Đếm từ 0 đến 10", 
            content: "Bé hãy nhìn hình và đếm xem có bao nhiêu đồ vật nhé. Một, Hai, Ba...", 
            contentAudioUrl: "/sounds/math/lesson1_content.mp3", // Example
            quizzes: [
              { 
                  question: "Có mấy quả táo?", 
                  illustration: "🍎🍎🍎🍎🍎",
                  speakText: "Bé đếm xem có mấy quả táo nào?",
                  // audioUrl: "/sounds/math/q1.mp3", 
                  options: ["4", "5", "6"], 
                  correctAnswer: 1 
              },
              { 
                  question: "Bàn tay có mấy ngón?", 
                  illustration: "🖐️",
                  speakText: "Bàn tay bé có mấy ngón nhỉ?",
                  options: ["4", "5", "10"], 
                  correctAnswer: 1 
              },
              { 
                  question: "Có mấy con vịt?", 
                  illustration: "🦆🦆",
                  speakText: "Đếm xem có bao nhiêu chú vịt?",
                  options: ["1", "2", "3"], 
                  correctAnswer: 1 
              },
              { 
                  question: "Hình nào có 3 cái kẹo?", 
                  illustration: "🍬",
                  speakText: "Đáp án nào có đúng 3 cái kẹo?",
                  options: ["🍬🍬", "🍬🍬🍬", "🍬"], 
                  correctAnswer: 1 
              },
              { 
                  question: "Số to nhất là số nào?", 
                  illustration: "🦁",
                  speakText: "Trong các số dưới đây, số nào to nhất?",
                  options: ["1", "5", "10"], 
                  correctAnswer: 2 
              }
            ]
          },
          { 
            id: "m-t1-l2", 
            title: "Bài 2: Đếm từ 11 đến 20", 
            content: "Chúng mình cùng đếm tiếp nhé. Mười, Mười một, Mười hai...", 
            quizzes: [
              { question: "Sau số 10 là số mấy?", illustration: "🔟 ➜ ❓", speakText: "Sau số mười là số mấy nào?", options: ["9", "11", "12"], correctAnswer: 1 },
              { question: "Xe buýt số 15. Số tiếp theo là?", illustration: "🚌 15", speakText: "Xe buýt số 15 chạy qua, số tiếp theo là bao nhiêu?", options: ["14", "16", "17"], correctAnswer: 1 },
              { question: "Bé chọn số 'Hai mươi' nhé?", illustration: "20", speakText: "Số hai mươi viết thế nào bé nhỉ?", options: ["2", "12", "20"], correctAnswer: 2 },
              { question: "18, 19, ... Số nào còn thiếu?", illustration: "18, 19, ...", speakText: "Mười tám, mười chín, rồi đến bao nhiêu?", options: ["17", "20", "21"], correctAnswer: 1 },
              { question: "Số nào lớn hơn số 12?", illustration: "🐘 > 12", speakText: "Số nào lớn hơn mười hai?", options: ["10", "11", "13"], correctAnswer: 2 }
            ]
          },
          { 
            id: "m-t1-l3", 
            title: "Bài 3: Nhận biết số", 
            content: "Số 0 tròn như quả trứng gà. Số 1 giống cái gậy.", 
            quizzes: [
              { question: "Số 'Mười hai' viết như thế nào?", illustration: "12", speakText: "Số mười hai viết là số một đứng trước hay đứng sau?", options: ["102", "12", "21"], correctAnswer: 1 },
              { question: "Số 0 giống hình gì nhỉ?", illustration: "0", speakText: "Số không trông giống cái gì?", options: ["Quả trứng", "Cây gậy", "Con vịt"], correctAnswer: 0 },
              { question: "Số 'Mười lăm' đâu bé ơi?", illustration: "15", speakText: "Bé chỉ cho mình số mười lăm nhé", options: ["15", "51", "5"], correctAnswer: 0 },
              { question: "Số 7 đọc là gì?", illustration: "7", speakText: "Số này đọc là gì?", options: ["Bảy", "Ba", "Năm"], correctAnswer: 0 },
              { question: "Số 6 quay ngược đầu thành số mấy?", illustration: "🙃 6", speakText: "Số sáu quay ngược đầu xuống thành số mấy?", options: ["6", "9", "0"], correctAnswer: 1 }
            ]
          },
          { 
            id: "m-t1-l4", 
            title: "Bài 4: Nhiều hơn - Ít hơn", 
            content: "Bên nào nhiều kẹo hơn nhỉ? Bên nào ít táo hơn?", 
            quizzes: [
              { question: "Bên nào nhiều hơn?", illustration: "5🍬 vs 3🍬", speakText: "Năm cái kẹo và ba cái kẹo, bên nào nhiều hơn?", options: ["5 kẹo", "3 kẹo", "Bằng nhau"], correctAnswer: 0 },
              { question: "Bên nào nhiều hơn?", illustration: "🍎🍎 vs 🍊🍊🍊", speakText: "Hai quả táo và ba quả cam, bên nào nhiều hơn?", options: ["Táo 🍎", "Cam 🍊", "Bằng nhau"], correctAnswer: 1 },
              { question: "Bên nào ít hơn?", illustration: "2🍰 vs 4🍰", speakText: "Hai cái bánh và bốn cái bánh, bên nào ít hơn?", options: ["2 bánh", "4 bánh", "Không biết"], correctAnswer: 0 },
              { question: "Hai tay đều có 5 ngón. Vậy là?", illustration: "🖐️ vs 🖐️", speakText: "Hai tay đều có năm ngón, vậy là nhiều hơn hay bằng nhau?", options: ["Nhiều hơn", "Ít hơn", "Bằng nhau"], correctAnswer: 2 }
            ]
          }
        ]
      },
      {
        id: "m-t2",
        title: "Chủ đề 2: Phép cộng (Phạm vi 10)",
        lessons: [
          { 
            id: "m-t2-l1", 
            title: "Bài 1: Làm quen phép cộng", 
            content: "Cộng là gộp lại nhé. Một cái kẹo thêm một cái kẹo là hai cái.", 
            quizzes: [
              { question: "Gộp lại có mấy quả?", illustration: "🍎 + 🍎", speakText: "Một quả táo cộng một quả táo là mấy quả?", options: ["1", "2", "3"], correctAnswer: 1 },
              { question: "1 con 🐈 thêm 1 con 🐈 là mấy?", illustration: "🐈 + 🐈", speakText: "Một con mèo thêm một con mèo là mấy con?", options: ["1", "2", "3"], correctAnswer: 1 },
              { question: "Dấu cộng hình gì nhỉ?", illustration: "➕", speakText: "Dấu cộng có hình gì?", options: ["Dấu -", "Dấu +", "Dấu ="], correctAnswer: 1 }
            ]
          },
          { 
            id: "m-t2-l2", 
            title: "Bài 2: Cộng thêm 1, 2, 3", 
            content: "Thử tài toán học của bé nào.", 
            quizzes: [
              { question: "1 + 1 = ?", illustration: "🍭 + 🍭", speakText: "Một cộng một bằng mấy?", options: ["1", "2", "3"], correctAnswer: 1 },
              { question: "2 + 1 = ?", illustration: "🎈🎈 + 🎈", speakText: "Hai cộng một bằng mấy?", options: ["2", "3", "4"], correctAnswer: 1 },
              { question: "4 + 2 = ?", illustration: "🚗🚗🚗🚗 + 🚗🚗", speakText: "Bốn cộng hai bằng mấy?", options: ["5", "6", "7"], correctAnswer: 1 },
              { question: "1 + 3 = ?", illustration: "🦁 + 🦁🦁🦁", speakText: "Một cộng ba bằng mấy?", options: ["3", "4", "5"], correctAnswer: 1 },
              { question: "3 + ❓ = 5", illustration: "⭐⭐⭐ + ❓ = ⭐⭐⭐⭐⭐", speakText: "Ba cộng mấy thì bằng năm?", options: ["1", "2", "3"], correctAnswer: 1 }
            ]
          },
          { 
            id: "m-t2-l3", 
            title: "Bài 3: Cộng trong phạm vi 10", 
            content: "Bé giỏi quá, làm bài khó hơn xíu nhé.", 
            quizzes: [
              { question: "5 + 0 = ?", illustration: "5 + 0", speakText: "Năm cộng không bằng mấy?", options: ["0", "5", "10"], correctAnswer: 1 },
              { question: "5 + 5 = ?", illustration: "🖐️ + 🖐️", speakText: "Năm ngón tay cộng năm ngón tay bằng bao nhiêu?", options: ["9", "10", "11"], correctAnswer: 1 },
              { question: "3 + 4 = ?", illustration: "🐠🐠🐠 + 🐠🐠🐠🐠", speakText: "Ba cộng bốn bằng mấy?", options: ["6", "7", "8"], correctAnswer: 1 },
              { question: "2 + 2 = ?", illustration: "2 + 2", speakText: "Hai cộng hai bằng mấy?", options: ["3", "4", "5"], correctAnswer: 1 },
              { question: "2 + 3 + 1 = ?", illustration: "2+3+1", speakText: "Hai cộng ba, rồi cộng thêm một nữa là mấy?", options: ["5", "6", "7"], correctAnswer: 1 }
            ]
          },
          { 
            id: "m-t2-l4", 
            title: "Bài 4: Đố vui có hình ảnh", 
            content: "Nghe kể chuyện và tính toán nhé.", 
            quizzes: [
              { question: "Bé có tất cả mấy kẹo?", illustration: "2🍬 + 1🍬", speakText: "Bé có 2 cái kẹo, mẹ cho thêm 1 cái nữa. Bé có tất cả mấy cái?", options: ["2", "3", "4"], correctAnswer: 1 },
              { question: "Có tất cả mấy con chim?", illustration: "🐦🐦🐦 + 🐦🐦", speakText: "Ba con chim trên cây, hai con nữa bay đến. Có tất cả mấy con?", options: ["4", "5", "6"], correctAnswer: 1 },
              { question: "Nhà có mấy con vật?", illustration: "🐶 + 🐱🐱", speakText: "Một con chó và hai con mèo. Nhà có mấy con vật?", options: ["2", "3", "4"], correctAnswer: 1 },
              { question: "Cả hai ăn mấy cái bánh?", illustration: "🍰 + 🍰🍰", speakText: "Bé ăn một cái bánh, bạn ăn hai cái. Cả hai ăn mấy cái?", options: ["2", "3", "4"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "m-t3",
        title: "Chủ đề 3: Phép trừ (Phạm vi 10)",
        lessons: [
          { 
            id: "m-t3-l1", 
            title: "Bài 1: Làm quen phép trừ", 
            content: "Trừ là bớt đi, là ăn mất, là bay đi nhé.", 
            quizzes: [
              { question: "Còn mấy cái bánh?", illustration: "🍰🍰🍰 - 🍰", speakText: "Có ba cái bánh, ăn mất một cái. Còn mấy cái?", options: ["1", "2", "3"], correctAnswer: 1 },
              { question: "Dấu trừ hình gì?", illustration: "➖", speakText: "Dấu trừ trông như thế nào?", options: ["Dấu +", "Dấu -", "Dấu ="], correctAnswer: 1 },
              { question: "5 ngón, cụp 1 ngón. Còn?", illustration: "ANIMATION:FOLD_FINGER", speakText: "Năm ngón tay, cụp một ngón xuống, còn mấy ngón?", options: ["3", "4", "5"], correctAnswer: 1 }
            ]
          },
          { 
            id: "m-t3-l2", 
            title: "Bài 2: Tập trừ 1, 2, 3", 
            content: "Bớt đi thì còn lại bao nhiêu nhỉ?", 
            quizzes: [
              { question: "2 - 1 = ?", illustration: "🎈🎈 - 🎈", speakText: "Hai trừ một bằng mấy?", options: ["0", "1", "2"], correctAnswer: 1 },
              { question: "4 - 1 = ?", illustration: "🚗🚗🚗🚗 - 🚗", speakText: "Bốn trừ một bằng mấy?", options: ["2", "3", "4"], correctAnswer: 1 },
              { question: "5 - 2 = ?", illustration: "🌟🌟🌟🌟🌟 - 🌟🌟", speakText: "Năm trừ hai bằng mấy?", options: ["2", "3", "4"], correctAnswer: 1 },
              { question: "3 - 3 = ?", illustration: "🍬🍬🍬 - 🍬🍬🍬", speakText: "Ba cái kẹo, ăn hết cả ba cái, còn lại mấy?", options: ["0", "1", "3"], correctAnswer: 0 }
            ]
          },
          { 
            id: "m-t3-l3", 
            title: "Bài 3: Trừ trong phạm vi 10", 
            content: "Luyện tập tính trừ siêu tốc.", 
            quizzes: [
              { question: "10 - 5 = ?", illustration: "👐 - 🖐️", speakText: "Mười ngón tay trừ đi năm ngón tay bằng mấy?", options: ["4", "5", "6"], correctAnswer: 1 },
              { question: "8 - 3 = ?", illustration: "8 - 3", speakText: "Tám trừ ba bằng mấy?", options: ["4", "5", "6"], correctAnswer: 1 },
              { question: "9 - 0 = ?", illustration: "9 - 0", speakText: "Chín mà không trừ đi gì cả, thì bằng mấy?", options: ["0", "9", "8"], correctAnswer: 1 },
              { question: "7 - ❓ = 5", illustration: "7 - ? = 5", speakText: "Bảy trừ mấy thì bằng năm?", options: ["1", "2", "3"], correctAnswer: 1 },
              { question: "5 - 3 = ?", illustration: "5 - 3", speakText: "Năm trừ ba bằng mấy?", options: ["2", "3", "4"], correctAnswer: 0 }
            ]
          },
          { 
            id: "m-t3-l4", 
            title: "Bài 4: Đố vui trừ", 
            content: "Nghe chuyện và làm toán trừ.", 
            quizzes: [
              { question: "Còn lại mấy con chim?", illustration: "🐦🐦🐦🐦🐦 - 🐦🐦", speakText: "Năm con chim, bay mất hai con. Còn mấy con?", options: ["2", "3", "4"], correctAnswer: 1 },
              { question: "Mẹ còn mấy quả?", illustration: "🍊🍊🍊🍊🍊🍊 - 🍊🍊🍊", speakText: "Có sáu quả cam, cho bà ba quả. Mẹ còn mấy quả?", options: ["2", "3", "4"], correctAnswer: 1 },
              { question: "Còn mấy viên bi?", illustration: "🎱🎱🎱🎱 - 🎱", speakText: "Bốn viên bi, làm mất một viên. Còn mấy viên?", options: ["3", "4", "5"], correctAnswer: 0 }
            ]
          }
        ]
      },
      {
        id: "m-t4",
        title: "Chủ đề 4: So sánh số",
        lessons: [
          { 
            id: "m-t4-l1", 
            title: "Bài 1: Lớn - Bé - Bằng", 
            content: "Số nào to hơn, số nào bé hơn?", 
            quizzes: [
              { question: "Số nào to hơn?", illustration: "9 vs 1", speakText: "Số chín và số một, số nào to hơn?", options: ["Số 1", "Số 9"], correctAnswer: 1 },
              { question: "Số 2 bé hơn số mấy?", illustration: "2 < ?", speakText: "Số hai bé hơn số nào dưới đây?", options: ["Số 1", "Số 3", "Số 0"], correctAnswer: 1 },
              { question: "Số nào bằng số 5?", illustration: "5 = ?", speakText: "Số nào bằng với số năm?", options: ["4", "5", "6"], correctAnswer: 1 }
            ]
          },
          { 
            id: "m-t4-l2", 
            title: "Bài 2: Dấu Cá Sấu (>, <, =)", 
            content: "Cá sấu tham ăn luôn quay miệng về bên số lớn hơn.", 
            quizzes: [
              { question: "3 ... 5. Dấu gì?", illustration: "🐭🐭🐭 ... 🐭🐭🐭🐭🐭", speakText: "Ba con chuột và năm con chuột. Điền dấu gì?", options: [">", "<", "="], correctAnswer: 1 },
              { question: "9 ... 9. Dấu gì?", illustration: "🍎9 ... 🍎9", speakText: "Chín quả táo và chín quả táo. Điền dấu gì?", options: [">", "<", "="], correctAnswer: 2 },
              { question: "7 ... 4. Cá sấu ăn bên nào?", illustration: "7 ... 4", speakText: "Bảy và bốn, cá sấu quay miệng về bên nào?", options: ["> (ăn 7)", "< (ăn 4)", "="], correctAnswer: 0 }
            ]
          },
          { 
            id: "m-t4-l3", 
            title: "Bài 3: Xếp hàng các số", 
            content: "Xếp các bạn số theo thứ tự nhé.", 
            quizzes: [
              { question: "Xếp từ bé đến lớn", illustration: "2, 5, 1", speakText: "Bé hãy xếp các số 2, 5, 1 từ bé đến lớn nhé", options: ["1, 2, 5", "5, 2, 1", "2, 1, 5"], correctAnswer: 0 },
              { question: "Số nào bé nhất?", illustration: "8, 3, 10", speakText: "Trong các số: tám, ba, mười. Số nào bé nhất?", options: ["8", "3", "10"], correctAnswer: 1 },
              { question: "Số nào lớn nhất?", illustration: "1, 9, 4", speakText: "Trong các số: một, chín, bốn. Số nào lớn nhất?", options: ["1", "4", "9"], correctAnswer: 2 },
              { question: "3, 2, ...?", illustration: "3, 2, ?", speakText: "Ba, rồi đến hai, rồi đến mấy?", options: ["1", "4", "5"], correctAnswer: 0 }
            ]
          }
        ]
      },
      {
        id: "m-t5",
        title: "Chủ đề 5: Hình học vui nhộn",
        lessons: [
          { 
            id: "m-t5-l1", 
            title: "Bài 1: Hình Tròn, Vuông, Tam Giác", 
            content: "Nhìn đồ vật đoán hình khối nhé.", 
            quizzes: [
              { question: "Cái bánh xe hình gì?", illustration: "🚲", speakText: "Cái bánh xe đạp hình gì?", options: ["Vuông 🟥", "Tròn ⭕", "Tam giác 🔺"], correctAnswer: 1 },
              { question: "Cái bảng đen hình gì?", illustration: "🏫", speakText: "Cái bảng đen ở lớp học hình gì?", options: ["Chữ nhật ▭", "Tròn ⭕", "Tam giác 🔺"], correctAnswer: 0 },
              { question: "Miếng dưa hấu hình gì?", illustration: "🍉", speakText: "Miếng dưa hấu cắt ra trông giống hình gì?", options: ["Tròn ⭕", "Tam giác 🔺", "Vuông 🟥"], correctAnswer: 1 }
            ]
          },
          { 
            id: "m-t5-l2", 
            title: "Bài 2: Đếm hình", 
            content: "Mắt tinh nhìn hình đoán số.", 
            quizzes: [
              { question: "Hình tam giác có mấy cạnh?", illustration: "🔺", speakText: "Hình tam giác có mấy cạnh?", options: ["2", "3", "4"], correctAnswer: 1 },
              { question: "Hình vuông có mấy góc nhọn?", illustration: "🟥", speakText: "Hình vuông có mấy góc nhọn?", options: ["3", "4", "5"], correctAnswer: 1 },
              { question: "Hình tròn có góc không?", illustration: "⭕", speakText: "Hình tròn có góc nhọn không?", options: ["Có", "Không"], correctAnswer: 1 }
            ]
          },
          { 
            id: "m-t5-l3", 
            title: "Bài 3: Màu sắc và Hình", 
            content: "Tô màu cho cuộc sống thêm rực rỡ.", 
            quizzes: [
              { question: "Ông mặt trời màu gì?", illustration: "☀️", speakText: "Ông mặt trời thường tô màu gì?", options: ["Xanh lá 🟢", "Đỏ/Vàng 🔴", "Tím 🟣"], correctAnswer: 1 },
              { question: "Lá cây màu gì?", illustration: "🍃", speakText: "Lá cây màu gì?", options: ["Xanh lá 🟢", "Đỏ 🔴", "Vàng 🟡"], correctAnswer: 0 },
              { question: "Biển báo cấm viền màu gì?", illustration: "⛔", speakText: "Biển báo cấm hình tròn có viền màu gì?", options: ["Xanh 🔵", "Đỏ 🔴", "Đen ⚫"], correctAnswer: 1 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: SubjectType.VIETNAMESE,
    title: "Tiếng Việt Lớp 1",
    icon: "BookOpen",
    color: "bg-emerald-500",
    topics: [
      {
        id: "v-t1",
        title: "Chủ đề 1: Bảng chữ cái",
        lessons: [
          { 
            id: "v-t1-l1", 
            title: "Bài 1: Chữ a, ă, â", 
            content: "Bé nghe và chọn chữ đúng nhé.", 
            quizzes: [
              { 
                  question: "Chữ cái nào là chữ A?", 
                  illustration: "A a",
                  speakText: "Bé hãy tìm xem đâu là chữ A?",
                  options: ["b", "A", "c"], 
                  correctAnswer: 1 
              },
              { 
                  question: "Chữ cái nào là chữ Ă?", 
                  illustration: "Ă ă",
                  speakText: "Bé tìm giúp mình chữ Á, chữ Á có cái mũ ngược ở trên đầu nhé.",
                  options: ["A", "Ă", "Â"], 
                  correctAnswer: 1 
              },
              { 
                  question: "Chữ cái nào là chữ Â?", 
                  illustration: "Â â",
                  speakText: "Đâu là chữ ớ? Chữ ớ đội cái mũ xuôi.",
                  options: ["Ă", "e", "Â"], 
                  correctAnswer: 2 
              },
              { 
                  question: "Trong từ CON CÁ có chữ gì?", 
                  illustration: "🐟",
                  speakText: "Trong từ Con Cá, có chứa chữ cái nào bé vừa học?",
                  options: ["a", "u", "e"], 
                  correctAnswer: 0 
              },
              { 
                  question: "Trong từ CÁI ẤM có chữ gì?", 
                  illustration: "🫖",
                  speakText: "Trong từ Cái Ấm, có chứa chữ cái nào?",
                  options: ["i", "â", "o"], 
                  correctAnswer: 1 
              }
            ]
          },
          { 
            id: "v-t1-l2", 
            title: "Bài 2: Chữ Hoa và Chữ Thường", 
            content: "Chữ to là anh, chữ nhỏ là em.", 
            quizzes: [
              { question: "Chữ B in hoa đâu?", illustration: "B", speakText: "Bé hãy chỉ vào chữ Bờ in hoa?", options: ["c", "d", "B"], correctAnswer: 2 },
              { question: "Chữ e thường đâu nhỉ?", illustration: "e", speakText: "Chữ e viết thường ở đâu?", options: ["E", "e", "ê"], correctAnswer: 1 },
              { question: "Chữ nào là chữ A in hoa?", illustration: "🅰️", speakText: "Trong hình bên dưới, chữ A in hoa là chữ nào?", options: ["a", "A", "ă"], correctAnswer: 1 },
              { question: "Tên riêng viết thế nào?", illustration: "Lan", speakText: "Tên riêng của bé thì viết hoa hay viết thường?", options: ["Viết hoa (Lan)", "Viết thường (lan)"], correctAnswer: 0 }
            ]
          },
          { 
            id: "v-t1-l3", 
            title: "Bài 3: Bé tập nói (Phát âm)", 
            content: "Há miệng to đọc chữ A nào.", 
            quizzes: [
              { question: "Chữ O tròn như quả gì?", illustration: "O", speakText: "Chữ O đọc tròn miệng giống quả gì?", options: ["Quả Trứng 🥚", "Cái Kéo ✂️", "Cái Ly 🥛"], correctAnswer: 0 },
              { question: "Đâu là chữ O?", illustration: "O, Ô, Ơ", speakText: "Bé chọn chữ O nhé", options: ["O", "Ô", "Ơ"], correctAnswer: 0 },
              { question: "Đâu là chữ Ê?", illustration: "Ê", speakText: "Chữ Ê có mũ, bé tìm xem?", options: ["e", "ê", "a"], correctAnswer: 1 },
              { question: "Con gà gáy thế nào?", illustration: "🐓", speakText: "Con gà trống gáy như thế nào?", options: ["Ò ó o", "Meo meo", "Gâu gâu"], correctAnswer: 0 }
            ]
          },
          { 
            id: "v-t1-l4", 
            title: "Bài 4: Tìm chữ trong tranh", 
            content: "Chơi trốn tìm với các chữ cái.", 
            quizzes: [
              { question: "Trong từ EM BÉ có chứa chữ e không?", illustration: "👶", speakText: "Trong từ Em Bé, có chữ e không nhỉ?", options: ["Có", "Không"], correctAnswer: 0 },
              { question: "Trong từ CON GÀ có chứa chữ gì?", illustration: "🐔", speakText: "Trong từ Con Gà, có chữ cái nào?", options: ["i", "a", "u"], correctAnswer: 1 },
              { question: "Trong từ QUẢ TÁO có chứa chữ a mấy lần?", illustration: "🍎", speakText: "Trong từ Quả Táo, chữ a xuất hiện mấy lần?", options: ["1 lần", "2 lần"], correctAnswer: 1 },
              { question: "Trong từ BÀ BA. Chữ gì lặp lại?", illustration: "👵3️⃣", speakText: "Trong từ Bà Ba, có những chữ gì lặp lại?", options: ["b, a", "c, d"], correctAnswer: 0 }
            ]
          }
        ]
      },
      {
        id: "v-t2",
        title: "Chủ đề 2: Ghép vần",
        lessons: [
          { 
            id: "v-t2-l1", 
            title: "Bài 1: Âm B (Bờ)", 
            content: "B a ba. B e be.", 
            quizzes: [
              { question: "B - a - ...?", illustration: "B - a", speakText: "Bờ a ba, đáp án nào là ba?", options: ["ba", "be", "bo"], correctAnswer: 0 },
              { question: "B - ô - ...?", illustration: "B - ô", speakText: "Bờ ô bô, bé chọn chữ bô nhé", options: ["bô", "ba", "bơ"], correctAnswer: 0 },
              { question: "Trong từ CON BÒ, tiếng BÒ bắt đầu bằng chữ gì?", illustration: "🐮", speakText: "Trong từ Con Bò, tiếng Bò bắt đầu bằng chữ gì?", options: ["B", "C", "D"], correctAnswer: 0 },
              { question: "Trong từ QUẢ BÓNG, tiếng BÓNG bắt đầu bằng chữ gì?", illustration: "⚽", speakText: "Trong từ Quả Bóng, tiếng Bóng bắt đầu bằng chữ gì?", options: ["b", "c", "d"], correctAnswer: 0 }
            ]
          },
          { 
            id: "v-t2-l2", 
            title: "Bài 2: Âm C, D, Đ", 
            content: "C, D, Đ.", 
            quizzes: [
              { question: "C - a - ...?", illustration: "C - a", speakText: "Cờ a ca, bé tìm chữ ca nhé", options: ["ca", "co", "ce"], correctAnswer: 0 },
              { question: "Trong từ CON DÊ, tiếng DÊ bắt đầu bằng chữ?", illustration: "🐐", speakText: "Trong từ Con Dê, tiếng Dê bắt đầu bằng chữ Dờ hay Đờ?", options: ["D", "Đ", "B"], correctAnswer: 0 },
              { question: "Từ ĐỒNG HỒ bắt đầu bằng chữ gì?", illustration: "⏰", speakText: "Từ Đồng hồ, bắt đầu bằng chữ gì?", options: ["Đ", "D", "C"], correctAnswer: 0 }
            ]
          },
          { 
            id: "v-t2-l3", 
            title: "Bài 3: Âm G, H, K", 
            content: "Con Gà, Bông Hoa, Cái Kéo.", 
            quizzes: [
              { question: "G - a - ... huyền?", illustration: "🐔", speakText: "Gờ a ga huyền gà. Chữ Gà đâu nhỉ?", options: ["gà", "gá", "gả"], correctAnswer: 0 },
              { question: "Trong từ BÔNG HOA, tiếng HOA bắt đầu bằng chữ?", illustration: "🌺", speakText: "Trong từ Bông Hoa, tiếng Hoa bắt đầu bằng chữ gì?", options: ["H", "G", "K"], correctAnswer: 0 },
              { question: "Trong từ CÁI KÉO, tiếng KÉO bắt đầu bằng chữ?", illustration: "✂️", speakText: "Trong từ Cái Kéo, tiếng Kéo bắt đầu bằng chữ K hay C?", options: ["K", "C", "Q"], correctAnswer: 0 }
            ]
          },
          { 
            id: "v-t2-l4", 
            title: "Bài 4: Đọc vần", 
            content: "Ghép lại đọc trơn nhé.", 
            quizzes: [
              { question: "Tiếng nào đọc là 'BA'?", illustration: "👨", speakText: "Bé hãy chọn chữ Ba", options: ["ba", "bà", "bá"], correctAnswer: 0 },
              { question: "Đây là con gì: CÁ", illustration: "🐟", speakText: "Đây là con cá. Bé chọn chữ Cá nhé.", options: ["cá", "ca", "cà"], correctAnswer: 0 },
              { question: "Bé được mẹ ...?", illustration: "🤱", speakText: "Bé được mẹ bế. Bé tìm chữ Bế nào.", options: ["bế", "bề", "bễ"], correctAnswer: 0 }
            ]
          }
        ]
      },
      {
        id: "v-t3",
        title: "Chủ đề 3: Đọc từ",
        lessons: [
          { 
            id: "v-t3-l1", 
            title: "Bài 1: Từ ngắn (1 tiếng)", 
            content: "Ba, Mẹ, Cá, Gà...", 
            quizzes: [
              { question: "Ai sinh ra mình?", illustration: "🤰", speakText: "Ai là người sinh ra mình?", options: ["Mẹ 👩", "Cá 🐟", "Bàn 🪑"], correctAnswer: 0 },
              { question: "Con gì bơi dưới nước?", illustration: "🌊", speakText: "Con gì bơi dưới nước?", options: ["Cá 🐟", "Gà 🐔", "Chó 🐶"], correctAnswer: 0 },
              { question: "Màu của quả Gấc?", illustration: "🔴", speakText: "Quả gấc màu gì?", options: ["Đỏ 🔴", "Xanh 🔵", "Tím 🟣"], correctAnswer: 0 }
            ]
          },
          { 
            id: "v-t3-l2", 
            title: "Bài 2: Từ dài (2 tiếng)", 
            content: "Ba lô, Ca nô, Xe đạp...", 
            quizzes: [
              { question: "Cái gì để đeo đi học?", illustration: "🎒", speakText: "Cái gì bé đeo sau lưng đi học?", options: ["Ba lô 🎒", "Con mèo 🐈", "Cái cây 🌳"], correctAnswer: 0 },
              { question: "Phương tiện đi lại?", illustration: "🚲", speakText: "Cái gì có hai bánh để đạp?", options: ["Xe đạp 🚲", "Nhà cửa 🏠", "Cá thu 🐟"], correctAnswer: 0 },
              { question: "Con vật cục tác lá chanh?", illustration: "🐔", speakText: "Con gì cục tác lá chanh?", options: ["Con Gà 🐔", "Con Cá 🐟", "Con Hổ 🐯"], correctAnswer: 0 }
            ]
          },
          { 
            id: "v-t3-l3", 
            title: "Bài 3: Đọc câu", 
            content: "Bé đi học. Mẹ đi làm.", 
            quizzes: [
              { question: "Bé đi đâu mỗi sáng?", illustration: "🏫", speakText: "Mỗi sáng bé đi đâu?", options: ["Đi học 🏫", "Đi ngủ 🛌", "Đi bơi 🏊"], correctAnswer: 0 },
              { question: "Mẹ đi đâu?", illustration: "💼", speakText: "Còn mẹ thì đi đâu?", options: ["Đi làm 💼", "Đi chơi 🎡", "Đi ngủ 🛌"], correctAnswer: 0 },
              { question: "Bà bế ai?", illustration: "👵👶", speakText: "Bà bế ai?", options: ["Bế bé 👶", "Bế mèo 🐈", "Bế ghế 🪑"], correctAnswer: 0 }
            ]
          }
        ]
      },
      {
        id: "v-t4",
        title: "Chủ đề 4: Dấu câu (Thanh điệu)",
        lessons: [
          { 
            id: "v-t4-l1", 
            title: "Bài 1: Sắc, Huyền", 
            content: "Dấu sắc đi lên, dấu huyền đi xuống.", 
            quizzes: [
              { question: "Trong từ CON CÁ, tiếng CÁ có thanh gì?", illustration: "🐟 /", speakText: "Trong từ Con Cá, tiếng Cá có thanh sắc hay thanh huyền?", options: ["Sắc (/) ↗️", "Huyền (`) ↘️", "Ngang (--)"], correctAnswer: 0 },
              { question: "Trong từ BÀ NGOẠI, tiếng BÀ có thanh gì?", illustration: "👵 `", speakText: "Trong từ Bà Ngoại, tiếng Bà có thanh gì?", options: ["Sắc (/) ↗️", "Huyền (`) ↘️", "Nặng (.)"], correctAnswer: 1 },
              { question: "Trong từ CHIẾC LÁ, tiếng LÁ có thanh gì?", illustration: "🍃 /", speakText: "Trong từ Chiếc Lá, tiếng Lá có thanh gì?", options: ["Sắc", "Huyền"], correctAnswer: 0 }
            ]
          },
          { 
            id: "v-t4-l2", 
            title: "Bài 2: Hỏi, Ngã, Nặng", 
            content: "Dấu hỏi cong cong, dấu nặng chấm dưới.", 
            quizzes: [
              { question: "Trong từ MẸ YÊU, tiếng MẸ có thanh gì?", illustration: "👩 .", speakText: "Trong từ Mẹ Yêu, tiếng Mẹ có thanh nặng, thanh hỏi hay thanh ngã?", options: ["Nặng (.)", "Hỏi (?)", "Ngã (~)"], correctAnswer: 0 },
              { question: "Trong từ ĐI NGỦ, tiếng NGỦ có thanh gì?", illustration: "🛌 ?", speakText: "Trong từ Đi Ngủ, tiếng Ngủ có thanh gì?", options: ["Hỏi (?)", "Ngã (~)", "Nặng (.)"], correctAnswer: 0 },
              { question: "Cái gì cong như móc câu?", illustration: "❓", speakText: "Dấu nào cong cong như cái móc câu?", options: ["Dấu Hỏi (?)", "Dấu Chấm (.)", "Dấu Sắc (/)"], correctAnswer: 0 }
            ]
          },
          { 
            id: "v-t4-l3", 
            title: "Bài 3: Thi đọc dấu", 
            content: "Ma, Má, Mà...", 
            quizzes: [
              { question: "BÀ và BA. Tiếng nào giọng thấp hơn?", illustration: "👵 vs 👨", speakText: "Bà và Ba. Tiếng nào có giọng thấp hơn?", options: ["Bà (có huyền)", "Ba (không dấu)"], correctAnswer: 0 },
              { question: "BÉ và BẺ. Tiếng nào giọng cao hơn?", illustration: "👶 vs 🌽", speakText: "Bé và Bẻ. Tiếng nào giọng cao hơn?", options: ["Bé", "Bẻ"], correctAnswer: 0 },
              { question: "Trong tiếng MẸ. Giọng nặng hay nhẹ?", illustration: "👩", speakText: "Tiếng Mẹ. Giọng nặng hay nhẹ?", options: ["Nặng", "Nhẹ"], correctAnswer: 0 }
            ]
          },
          { 
            id: "v-t4-l4", 
            title: "Bài 4: Phân biệt từ", 
            content: "Dưa và Dừa khác nhau cái dấu.", 
            quizzes: [
              { question: "Trong từ QUẢ DỪA, tiếng DỪA có thanh gì?", illustration: "🥥", speakText: "Trong từ Quả Dừa, tiếng Dừa có thanh gì?", options: ["Huyền (` )", "Sắc (/)"], correctAnswer: 0 },
              { question: "Trong từ DƯA HẤU, tiếng DƯA có thanh gì?", illustration: "🍉", speakText: "Trong từ Dưa Hấu, tiếng Dưa có thanh gì không?", options: ["Không (Thanh ngang)", "Huyền"], correctAnswer: 0 },
              { question: "Từ CON CÒ và NGỌN CỎ khác nhau thanh gì?", illustration: "🕊️ vs 🌾", speakText: "Từ Con Cò và Ngọn Cỏ khác nhau ở thanh gì?", options: ["Huyền và Hỏi", "Sắc và Nặng"], correctAnswer: 0 }
            ]
          }
        ]
      },
      {
        id: "v-t5",
        title: "Chủ đề 5: Từ vựng quanh bé",
        lessons: [
          { 
            id: "v-t5-l1", 
            title: "Bài 1: Gia đình", 
            content: "Những người thân yêu.", 
            quizzes: [
              { question: "Người phụ nữ sinh ra bé gọi là gì?", illustration: "👩‍🍼", speakText: "Người phụ nữ sinh ra bé gọi là gì?", options: ["Mẹ yêu 👩", "Bà nội 👵", "Cô giáo 👩‍🏫"], correctAnswer: 0 },
              { question: "Bố của bố gọi là gì?", illustration: "👴", speakText: "Bố của bố gọi là gì?", options: ["Ông nội 👴", "Bà ngoại 👵", "Dì"], correctAnswer: 0 },
              { question: "Người đàn ông trong nhà gọi là?", illustration: "👨", speakText: "Người đàn ông trụ cột trong nhà gọi là gì?", options: ["Bố 👨", "Mẹ 👩", "Chị 👧"], correctAnswer: 0 }
            ]
          },
          { 
            id: "v-t5-l2", 
            title: "Bài 2: Con vật", 
            content: "Thế giới động vật.", 
            quizzes: [
              { question: "Con gì kêu Meo Meo?", illustration: "🐈", speakText: "Con gì kêu Meo Meo?", options: ["Mèo", "Chó", "Lợn"], correctAnswer: 0 },
              { question: "Con gì đẻ trứng cục tác?", illustration: "🐔", speakText: "Con gì đẻ trứng cục tác?", options: ["Gà", "Chó", "Trâu"], correctAnswer: 0 },
              { question: "Con gì sủa Gâu Gâu?", illustration: "🐕", speakText: "Con gì sủa Gâu Gâu?", options: ["Chó", "Mèo", "Cá"], correctAnswer: 0 },
              { question: "Con gì to đùng có vòi dài?", illustration: "🐘", speakText: "Con gì to đùng có cái vòi dài?", options: ["Voi", "Kiến", "Gà"], correctAnswer: 0 }
            ]
          },
          { 
            id: "v-t5-l3", 
            title: "Bài 3: Trái cây", 
            content: "Ăn quả nhớ kẻ trồng cây.", 
            quizzes: [
              { question: "Quả gì khỉ thích ăn?", illustration: "🍌", speakText: "Quả gì dài dài, vỏ vàng, con khỉ rất thích ăn?", options: ["Chuối", "Táo", "Nho"], correctAnswer: 0 },
              { question: "Quả gì vỏ xanh ruột đỏ?", illustration: "🍉", speakText: "Quả gì vỏ xanh ruột đỏ?", options: ["Dưa hấu", "Cam", "Xoài"], correctAnswer: 0 },
              { question: "Quả CAM màu gì?", illustration: "🍊", speakText: "Quả cam thường có màu gì?", options: ["Cam", "Tím", "Đen"], correctAnswer: 0 }
            ]
          },
          { 
            id: "v-t5-l4", 
            title: "Bài 4: Đồ vật", 
            content: "Đồ dùng trong nhà.", 
            quizzes: [
              { question: "Cái gì để ngồi?", illustration: "🪑", speakText: "Cái gì dùng để ngồi?", options: ["Ghế", "Bàn", "Tủ"], correctAnswer: 0 },
              { question: "Cái gì xem hoạt hình?", illustration: "📺", speakText: "Cái gì để xem phim hoạt hình?", options: ["Tivi", "Tủ lạnh", "Máy giặt"], correctAnswer: 0 },
              { question: "Cái gì quét nhà sạch bong?", illustration: "🧹", speakText: "Cái gì dùng để quét nhà?", options: ["Chổi", "Nồi", "Bát"], correctAnswer: 0 }
            ]
          }
        ]
      }
    ]
  }
];

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Bé Na', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Na' },
  { id: 'u2', name: 'Bé Bo', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Bo' },
];
