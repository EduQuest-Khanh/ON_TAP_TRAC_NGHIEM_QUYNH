import { Question, QuizConfig } from "../types";

// Helper function to shuffle array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Dữ liệu câu hỏi cố định từ người dùng
const FIXED_QUESTIONS = [
  {
    questionText: "Yếu tố chính nào tạo nên 'thế giới số' xung quanh chúng ta?",
    options: [
      "Sự đa dạng của các thiết bị có gắn bộ xử lí thông tin.",
      "Sự phát triển của mạng Internet toàn cầu.",
      "Chỉ các loại máy tính cá nhân và siêu máy tính.",
      "Các phần mềm và ứng dụng trên điện thoại di động."
    ],
    correctAnswerIndex: 0,
    explanation: "Thế giới số được hình thành bởi sự hiện diện rộng khắp của các thiết bị điện tử có bộ xử lý thông tin."
  },
  {
    questionText: "Trong các vật dụng dưới đây, đâu là một thiết bị \"thông minh\" có bộ xử lí bên trong?",
    options: [
      "Nồi cơm điện thông minh.",
      "Ấm đun nước siêu tốc.",
      "Bàn là (bàn ủi) cơ.",
      "Dao và thớt."
    ],
    correctAnswerIndex: 0,
    explanation: "Nồi cơm điện thông minh có vi xử lý để điều chỉnh chế độ nấu, trong khi các vật dụng khác hoạt động cơ học hoặc nhiệt đơn thuần."
  },
  {
    questionText: "Máy tính có khả năng nào cực kỳ \"siêu\" và nổi bật so với con người?",
    options: [
      "Khả năng sáng tạo nghệ thuật độc lập.",
      "Khả năng tính toán nhanh và chính xác.",
      "Khả năng tự sửa chữa phần cứng khi hỏng hóc.",
      "Khả năng thấu hiểu cảm xúc của con người."
    ],
    correctAnswerIndex: 1,
    explanation: "Máy tính vượt trội hơn con người về tốc độ xử lý dữ liệu và khả năng tính toán chính xác tuyệt đối."
  },
  {
    questionText: "Tại sao việc dùng thông tin không tốt (kém chất lượng) lại nguy hiểm khi chúng ta cần đưa ra một quyết định quan trọng?",
    options: [
      "Vì thông tin chất lượng cao luôn miễn phí.",
      "Vì thông tin là cơ sở để đưa ra quyết định, thông tin kém chất lượng có thể dẫn đến quyết định sai lầm.",
      "Vì thông tin chất lượng cao giúp tiết kiệm bộ nhớ máy tính.",
      "Vì chỉ có thông tin mới nhất mới là thông tin có chất lượng."
    ],
    correctAnswerIndex: 1,
    explanation: "Quyết định dựa trên thông tin sai lệch hoặc không đầy đủ sẽ dẫn đến hậu quả không mong muốn."
  },
  {
    questionText: "Khi xem xét một thông tin trên mạng, chúng ta cần dựa vào tiêu chí nào dưới đây để biết nó có \"chất lượng\" hay không?",
    options: [
      "Tính phổ biến.",
      "Tính phức tạp.",
      "Tính đầy đủ.",
      "Tính giải trí."
    ],
    correctAnswerIndex: 2,
    explanation: "Tính đầy đủ là một trong những tiêu chí quan trọng để đánh giá chất lượng thông tin, bên cạnh tính chính xác và tính mới."
  },
  {
    questionText: "An tìm một hướng dẫn sử dụng phần mềm trên mạng, nhưng tài liệu đó đã được viết từ rất lâu và phần mềm giờ đã khác. Thông tin An tìm được đã không còn đảm bảo tiêu chí nào?",
    options: [
      "Tính chính xác.",
      "Tính mới (tính cập nhật).",
      "Tính đầy đủ.",
      "Tính sử dụng được."
    ],
    correctAnswerIndex: 1,
    explanation: "Thông tin đã lỗi thời so với phiên bản hiện tại, vi phạm tiêu chí về tính mới (tính cập nhật)."
  },
  {
    questionText: "Bình muốn tìm thông tin về các trường cấp 3 gần nhà, nhưng Google lại toàn hiện ra quảng cáo du học. Các quảng cáo này rõ ràng là không đáp ứng tiêu chí nào về chất lượng thông tin?",
    options: [
      "Tính mới.",
      "Tính đầy đủ.",
      "Tính chính xác.",
      "Tính sử dụng được (phù hợp)."
    ],
    correctAnswerIndex: 3,
    explanation: "Thông tin quảng cáo du học không phục vụ đúng mục đích tìm trường gần nhà của Bình, nên không có tính sử dụng/phù hợp."
  },
  {
    questionText: "Nhờ có công nghệ thông tin và Internet, việc học của chúng ta ngày nay có lợi ích lớn nào sau đây?",
    options: [
      "Giúp học sinh không cần phải đến trường học nữa.",
      "Làm cho tất cả các môn học trở nên dễ dàng hơn.",
      "Giúp chia sẻ và tiếp cận kiến thức dễ dàng mọi lúc, mọi nơi.",
      "Thay thế hoàn toàn vai trò của giáo viên trong lớp học."
    ],
    correctAnswerIndex: 2,
    explanation: "CNTT và Internet xóa bỏ khoảng cách địa lý, giúp việc truy cập kho tri thức nhân loại trở nên dễ dàng."
  },
  {
    questionText: "Thông tin nào sau đây có chất lượng cao nhất để một học sinh lớp 9 quyết định chọn ban học cho lớp 10?",
    options: [
      "Lời khuyên từ một anh chị cựu học sinh vừa tốt nghiệp đại học.",
      "Bảng mô tả chương trình học các ban của Bộ Giáo dục từ 5 năm trước.",
      "Một bài báo trên mạng phân tích về các ngành nghề \"hot\" trong tương lai.",
      "Tổng hợp thông tin về chương trình học mới nhất, điểm chuẩn các trường mục tiêu và một bài trắc nghiệm sở thích cá nhân."
    ],
    correctAnswerIndex: 3,
    explanation: "Đây là nguồn thông tin đầy đủ, cập nhật và phù hợp nhất với cá nhân học sinh để đưa ra quyết định."
  },
  {
    questionText: "Nếu chúng ta dành quá nhiều thời gian cho Internet và các thiết bị số, điều tồi tệ nào có thể xảy ra với bản thân?",
    options: [
      "Làm giảm khả năng tính toán của máy tính.",
      "Ảnh hưởng xấu đến sức khỏe thể chất và tinh thần.",
      "Làm cho thông tin trên mạng trở nên kém chính xác hơn.",
      "Khiến cho các thiết bị thông minh hoạt động chậm lại."
    ],
    correctAnswerIndex: 1,
    explanation: "Nghiện Internet gây hại cho mắt, cột sống, gây béo phì và các vấn đề tâm lý như trầm cảm, lo âu."
  }
];

const generateQuiz = async (config: QuizConfig): Promise<Question[]> => {
  // Giả lập độ trễ mạng nhỏ để tạo cảm giác "đang xử lý" (UX tốt hơn)
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    // Process questions: 
    // 1. Shuffle the order of questions.
    // 2. Shuffle the options within each question and update index.
    
    let processedQuestions: Question[] = FIXED_QUESTIONS.map((q: any, index: number) => {
      // Get the correct answer text before shuffling
      const correctAnswerText = q.options[q.correctAnswerIndex];
      
      // Shuffle options
      const shuffledOptions = shuffleArray(q.options as string[]);
      
      // Find new index of the correct answer
      const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);

      return {
        id: `q-${Date.now()}-${index}`,
        questionText: q.questionText,
        options: shuffledOptions,
        correctAnswerIndex: newCorrectIndex,
        explanation: q.explanation
      };
    });

    // Shuffle the list of questions itself
    processedQuestions = shuffleArray(processedQuestions);

    return processedQuestions;

  } catch (error) {
    console.error("Lỗi khi tạo câu hỏi:", error);
    throw error;
  }
};

export { generateQuiz };