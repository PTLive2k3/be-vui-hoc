import { GoogleGenAI, Modality } from "@google/genai";
import { Quiz } from "../types";

// Initialize Gemini Client
const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is handled securely
const ai = new GoogleGenAI({ apiKey });

export const askAiTutor = async (prompt: string, context: string): Promise<string> => {
  if (!apiKey) return "Chưa cấu hình API Key. Vui lòng kiểm tra cài đặt.";

  try {
    const fullPrompt = `
      Bạn là một trợ lý ảo gia sư thân thiện, vui tính dành cho trẻ em lớp 1 (6-7 tuổi) ở Việt Nam.
      Hãy trả lời ngắn gọn, dễ hiểu, dùng ngôn ngữ khích lệ.
      Không dùng từ ngữ chuyên ngành phức tạp. Dùng emoji vui nhộn.
      
      Bối cảnh bài học hiện tại: ${context}
      
      Câu hỏi của bé: ${prompt}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: fullPrompt,
    });

    return response.text || "Xin lỗi bé, thầy AI đang suy nghĩ, bé hỏi lại sau nhé!";
  } catch (error: any) {
    if (error?.message?.includes('429') || error?.status === 'RESOURCE_EXHAUSTED') {
      return "Ồ, hiện tại thầy AI đang có quá nhiều bạn hỏi cùng lúc. Bé vui lòng đợi một lát rồi hỏi lại thầy nhé! Thầy vẫn luôn ở đây với bé.";
    }
    console.error("Gemini Error:", error);
    return "Ồ, có chút lỗi kết nối. Bé kiểm tra lại mạng nhé!";
  }
};

export const generateQuiz = async (topicTitle: string): Promise<Quiz | null> => {
    if (!apiKey) return null;

    try {
         const prompt = `
            Tạo một câu hỏi trắc nghiệm đơn giản cho trẻ lớp 1 về chủ đề: "${topicTitle}".
            Trả về định dạng JSON thuần túy (không có markdown code block) với cấu trúc:
            {
                "question": "Nội dung câu hỏi",
                "options": ["Đáp án A", "Đáp án B", "Đáp án C"],
                "correctAnswer": 0 
            }
            (correctAnswer là chỉ số của đáp án đúng trong mảng options, 0, 1 hoặc 2)
         `;

         const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
         });
         
         const text = response.text;
         if(!text) return null;
         return JSON.parse(text) as Quiz;

    } catch (e: any) {
        if (e?.message?.includes('429') || e?.status === 'RESOURCE_EXHAUSTED') {
            console.warn("Quiz generation quota exceeded.");
        } else {
            console.error("Quiz gen error", e);
        }
        return null;
    }
}
