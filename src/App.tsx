import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const sections = ['home', 'about', 'skills', 'contact'];

  const skills = [
    { name: 'HTML/CSS', level: 98, color: 'bg-orange-500' },
    { name: 'JavaScript', level: 95, color: 'bg-yellow-500' },
    { name: 'GSAP', level: 75, color: 'bg-purple-500' },
    { name: 'Vue', level: 40, color: 'bg-green-500' },
    { name: 'React', level: 30, color: 'bg-blue-500' },
    { name: 'Node', level: 20, color: 'bg-blue-600' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              정소리
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              {sections.map((section) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-300 ${
                    activeSection === section ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section === 'home' ? 'Home' : section}
                </motion.button>
              ))}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-md"
            >
              <div className="px-6 py-4 space-y-4">
                {sections.map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left capitalize text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {section === 'home' ? 'Home' : section}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        
        <motion.div
          style={{ y }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            
            <img 
              className="w-32 h-32 object-cover mx-auto mb-8 rounded-full flex items-center justify-center"
              src="../public/images/sori.jpeg" 
              alt="프로필" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-light mb-6"
          >
            안녕하세요
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            꿈을 코드로 만드는 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">프론트엔드 개발자</span> 정소리입니다
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={() => scrollToSection('about')}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-medium transition-all duration-300"
            >
              더 알아보기
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-gray-600 rounded-full font-medium hover:border-purple-400 transition-all duration-300"
            >
              연락하기
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-gray-600 rounded-full mt-2"></div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-light mb-6 text-purple-400">9년의 여정</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                웹 개발의 세계에 발을 들인 지 9년이 되었습니다. 
                매일 새로운 기술을 배우고, 더 나은 사용자 경험을 만들기 위해 고민합니다.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                단순히 코드를 작성하는 것을 넘어, 사용자의 마음을 움직이는 
                인터랙티브한 웹 경험을 만드는 것이 저의 목표입니다.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">프론트엔드</span>
                <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">UI/UX</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">웹 애니메이션</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                <h4 className="text-xl font-medium mb-2 text-white">경력</h4>
                <p className="text-gray-300">9년 프론트엔드 개발</p>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                <h4 className="text-xl font-medium mb-2 text-white">전문분야</h4>
                <p className="text-gray-300">React, JavaScript, 웹 애니메이션</p>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
                <h4 className="text-xl font-medium mb-2 text-white">목표</h4>
                <p className="text-gray-300">사용자 중심의 혁신적인 웹 경험 창조</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">Skills</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </motion.div>

          <div className="grid gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">{skill.name}</h3>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className={`h-2 rounded-full ${skill.color}`}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">Contact</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-light mb-6 text-purple-400">함께 만들어요</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  새로운 프로젝트나 협업 기회가 있으시다면 언제든 연락해주세요. 
                  함께 멋진 웹 경험을 만들어가고 싶습니다.
                </p>
              </div>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 text-gray-300"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-400">📧</span>
                  </div>
                  <div>
                    <p className="font-medium">이메일</p>
                    <p className="text-sm">enne3939@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 text-gray-300"
                >
                  <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center">
                    <span className="text-pink-400">📱</span>
                  </div>
                  <div>
                    <p className="font-medium">전화</p>
                    <p className="text-sm">010-4336-5835</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 text-gray-300"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-400">🌐</span>
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm">sorie.github.io</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800"
            >
              <h3 className="text-xl font-medium mb-6">메시지 보내기</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="이름"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-400 focus:outline-none transition-colors duration-300"
                />
                <input
                  type="email"
                  placeholder="이메일"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-400 focus:outline-none transition-colors duration-300"
                />
                <textarea
                  rows="4"
                  placeholder="메시지"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-400 focus:outline-none transition-colors duration-300 resize-none"
                ></textarea>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium transition-all duration-300"
                  onClick={() => alert('메시지가 전송되었습니다! (데모용)')}
                >
                  보내기
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-400"
          >
            © 2025 정소리. 꿈을 현실로 만드는 개발자.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;