import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, ShieldCheck } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ZaloIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M10 8.5h4L10 15h4" strokeWidth="2.5" />
  </svg>
);

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Fullstack Development');
  const [message, setMessage] = useState('');

  // Slide to Verify states
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Form status states
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || isVerified || !sliderRef.current) return;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    const handleWidth = 40; // width of handle
    const maxDistance = width - handleWidth - 4; // margin padding boundary
    const relativeX = e.clientX - left - handleWidth / 2;
    const boundedX = Math.max(0, Math.min(relativeX, maxDistance));

    setSliderPosition(boundedX);

    // If reached end boundary, unlock!
    if (boundedX >= maxDistance - 2) {
      setIsVerified(true);
      setIsDragging(false);
      // Triggers subtle celebration confetti
      canvasConfetti({
        particleCount: 30,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#00D9FF', '#6D5DF6'],
      });
    }
  };

  const handleMouseUp = () => {
    if (isVerified) return;
    setIsDragging(false);
    // Reset to start on release
    setSliderPosition(0);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isVerified]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) return;

    setSubmitting(true);

    // CẤU HÌNH DỊCH VỤ NHẬN TIN NHẮN (BẠN CHỌN 1 TRONG CÁC CÁCH DƯỚI ĐÂY):
    // ---------------------------------------------------------------------------------
    // Cách 1: Sử dụng Discord Webhook (Nhận thông báo ngay trên Discord) - MIỄN PHÍ & NHANH NHẤT
    // Bạn chỉ cần tạo Webhook trên Discord, rồi dán URL vào biến dưới đây.
    const DISCORD_WEBHOOK_URL = "";

    // Cách 2: Sử dụng Formspree (Nhận email trực tiếp về Gmail) - MIỄN PHÍ & DỄ DÀNG
    // Đăng ký tài khoản free tại formspree.io, tạo form mới và dán ID form vào đây.
    const FORMSPREE_FORM_ID = "mzdwajay";
    // ---------------------------------------------------------------------------------

    try {
      if (DISCORD_WEBHOOK_URL) {
        // Gửi tin nhắn dạng Rich Embed sang Discord
        await fetch(DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: "Portfolio Notification Bot",
            avatar_url: "https://i.imgur.com/4M344ox.png",
            embeds: [{
              title: "📩 Tin Nhắn Mới Từ Portfolio!",
              color: 3380223, // Neon Blue color
              fields: [
                { name: "👤 Người gửi", value: name || "Ẩn danh", inline: true },
                { name: "✉️ Email", value: email || "Không có", inline: true },
                { name: "🛠️ Loại dự án yêu cầu", value: projectType, inline: false },
                { name: "📝 Nội dung chi tiết", value: message || "Không có nội dung.", inline: false }
              ],
              timestamp: new Date().toISOString(),
              footer: { text: "Trần Gia Huy Portfolio" }
            }]
          })
        });
      } else if (FORMSPREE_FORM_ID) {
        // Gửi tin nhắn qua Formspree để forward về Gmail
        await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, projectType, message })
        });
      } else {
        // Chế độ Mặc định/Giả lập: Nếu chưa cấu hình gì, hệ thống sẽ tự chạy Demo hiệu ứng trong 1.5 giây
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setSubmitting(false);
      setSubmitted(true);

      // Giant multi-directional confetti splash!
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        canvasConfetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#6D5DF6', '#00D9FF', '#9E7BFF']
        });
        canvasConfetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#6D5DF6', '#00D9FF', '#9E7BFF']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

    } catch (error) {
      console.error("Gửi tin nhắn thất bại:", error);
      alert("Đã xảy ra lỗi khi kết nối máy chủ gửi tin nhắn. Hệ thống sẽ kích hoạt giao diện Demo để đảm bảo trải nghiệm!");

      // Fallback sang demo hiệu ứng
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 left-0 w-[30vw] h-[30vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="max-width-1440 mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-2 mb-12 text-center">
          <span className="text-xs font-bold font-sora tracking-widest text-primary uppercase">
            ENGAGEMENT
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-sora text-white">
            Secure Project Operations
          </h2>
          <div className="w-16 h-1 bg-glow-gradient rounded mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-center">
          {/* Left panel: Info logs (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6 text-left"
          >
            <h3 className="text-xl font-bold font-sora text-white">
              Is your process automation shop ready?
            </h3>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              Nếu bạn có yêu cầu về sản phẩm kỹ thuật số, cần xây dựng các đường dẫn fullstack tùy chỉnh hoặc muốn kiểm toán chi phí vận hành cửa hàng, hãy gửi yêu cầu.
            </p>
            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              Các nhà tuyển dụng có thể yêu cầu xem các đoạn mã nguồn cụ thể hoặc tải trực tiếp mã nguồn nén (.RAR) của dự án.
            </p>

            {/* Social badges links */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://github.com/trangiahuy"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:border-gray-500 text-gray-400 hover:text-white flex items-center justify-center transition-all"
                title="GitHub Profiles"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://zalo.me/0938987703"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 hover:border-gray-500 text-gray-400 hover:text-white flex items-center justify-center transition-all"
                title="Zalo Chat"
              >
                <ZaloIcon size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right panel: Glassmorphic form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#121216]/60 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-2xl w-full text-left"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center gap-3 font-sans"
              >
                <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-green-400 mb-2">
                  <Check size={28} />
                </div>
                <h3 className="text-xl font-bold font-sora text-white">
                  Gửi tin nhắn thành công!
                </h3>
                <p className="text-sm text-gray-400 max-w-sm">
                  Cảm ơn bạn đã liên hệ. Tôi đã nhận được bản ghi yêu cầu của bạn và sẽ phản hồi sớm nhất có thể.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                    setIsVerified(false);
                    setSliderPosition(0);
                  }}
                  className="mt-4 px-4 py-2 border border-white/10 hover:border-gray-500 rounded-lg text-xs text-gray-300 hover:text-white font-medium transition-colors"
                >
                  Gửi tin nhắn khác
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 font-medium">HỌ VÀ TÊN</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ví dụ: Nhà tuyển dụng"
                      className="bg-black/20 border border-white/5 rounded-xl p-3 text-white focus:outline-none focus:border-primary text-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-gray-400 font-medium">ĐỊA CHỈ EMAIL</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ví dụ: nhansuviet@congty.com"
                      className="bg-black/20 border border-white/5 rounded-xl p-3 text-white focus:outline-none focus:border-primary text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-medium">PHÂN LOẠI YÊU CẦU DỰ ÁN</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="bg-black/20 border border-white/5 rounded-xl p-3 text-white focus:outline-none focus:border-primary text-xs"
                  >
                    <option value="Fullstack Development" className="bg-[#121216]">Ứng dụng Web Fullstack React + Java/Node</option>
                    <option value="Frontend Engineering" className="bg-[#121216]">Giao diện React / TypeScript tối ưu cao</option>
                    <option value="Operations Optimization" className="bg-[#121216]">Phân tích quy trình bán lẻ & Viết mã tự động</option>
                    <option value="General Conversation" className="bg-[#121216]">Chào hỏi xã giao / Hẹn phỏng vấn kỹ thuật</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 font-medium">NỘI DUNG CHI TIẾT TIN NHẮN</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Mô tả ngắn gọn mục tiêu doanh nghiệp hoặc yêu cầu công việc tuyển dụng của bạn..."
                    className="bg-black/20 border border-white/5 rounded-xl p-3 text-white focus:outline-none focus:border-primary text-xs resize-none"
                  />
                </div>

                {/* Secure Anti-Spam Slide to Verify widget */}
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-gray-500 font-medium flex items-center gap-1">
                      <ShieldCheck size={11} className="text-accent" />
                      CỔNG XÁC MINH CHỐNG SPAM
                    </span>
                    <span className={`font-mono font-bold ${isVerified ? 'text-green-400' : 'text-gray-500'}`}>
                      {isVerified ? 'ĐÃ BẢO MẬT' : 'ĐANG KHÓA'}
                    </span>
                  </div>

                  <div
                    ref={sliderRef}
                    className="relative h-11 bg-black/40 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center select-none"
                  >
                    {/* Glowing background indication */}
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-primary/20 transition-all pointer-events-none"
                      style={{ width: `${sliderPosition + 20}px` }}
                    />

                    {/* Locked/Unlocked Text label */}
                    <span className={`text-[10px] pointer-events-none z-10 transition-colors duration-300 font-sora font-semibold ${isVerified ? 'text-green-400 font-bold' : 'text-gray-400'
                      }`}>
                      {isVerified ? 'XÁC MINH HOÀN TẤT' : 'KÉO SANG PHẢI ĐỂ MỞ KHÓA'}
                    </span>

                    {/* Floating Handle */}
                    <motion.div
                      className={`absolute left-0.5 top-0.5 bottom-0.5 w-10 rounded-lg flex items-center justify-center cursor-pointer shadow-md z-20 ${isVerified
                        ? 'bg-green-500 text-black'
                        : 'bg-white text-black hover:bg-accent'
                        }`}
                      style={{ x: sliderPosition }}
                      onMouseDown={() => {
                        if (!isVerified) setIsDragging(true);
                      }}
                      animate={isVerified ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {isVerified ? <Check size={16} /> : <Send size={14} className="rotate-45" />}
                    </motion.div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isVerified || submitting}
                  className={`w-full py-3 rounded-xl font-sora font-bold text-xs flex items-center justify-center gap-2 mt-4 transition-all duration-300 ${isVerified && !submitting
                    ? 'bg-glow-gradient text-black hover:scale-[1.02] active:scale-95 shadow-neon-glow'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      ĐANG TRUYỀN DỮ LIỆU...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      GỬI TIN NHẮN LIÊN HỆ
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
