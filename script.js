// Counter animation
            // Counter animation
        function animateCounter(element, target, duration) {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                element.textContent = Math.floor(start).toLocaleString();
                if (start >= target) {
                    element.textContent = target.toLocaleString();
                    clearInterval(timer);
                }
            }, 16);
        }

        // Initialize counters
        document.addEventListener('DOMContentLoaded', () => {
            animateCounter(document.getElementById('deforestation-counter'), 1028365, 2000);
            animateCounter(document.getElementById('emissions-counter'), 5289147, 2000);
            animateCounter(document.getElementById('species-counter'), 2467, 2000);
        });

        // Intersection Observer for timeline items
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });

        // Progress bar
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            document.getElementById('progress-bar').style.width = scrolled + '%';
        });

        // Solutions modal data
        const solutionsData = {
            1: {
                title: "Sustainable Agriculture Practices",
                description: "Agroforestry systems combine trees and crops to maintain biodiversity while providing sustainable income for farmers. These systems can reduce the need for forest clearing while improving soil health and providing multiple income streams for local communities."
            },
            2: {
                title: "Indigenous Rights and Conservation",
                description: "Indigenous peoples have protected the Amazon for generations through traditional knowledge and sustainable practices. Supporting their land rights and traditional practices is crucial for forest conservation and biodiversity preservation."
            },
            3: {
                title: "Conservation Technology",
                description: "Modern technology like satellite monitoring, drone surveillance, and AI algorithms help track deforestation in real-time. This allows for rapid response to illegal activities and better enforcement of conservation laws."
            }
        };

        // Modal functions
        function showSolutionDetails(id) {
            const modal = document.getElementById('solution-modal');
            const title = document.getElementById('modal-title');
            const description = document.getElementById('modal-description');
            
            title.textContent = solutionsData[id].title;
            description.textContent = solutionsData[id].description;
            modal.style.display = 'flex';
        }

        function showDonationForm() {
            document.getElementById('donation-modal').style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('solution-modal').style.display = 'none';
            document.getElementById('donation-modal').style.display = 'none';
        }

        // Quiz functionality
        function checkAnswer(element, isCorrect) {
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.classList.remove('correct', 'incorrect');
                option.style.pointerEvents = 'none';
            });

            if (isCorrect) {
                element.classList.add('correct');
                setTimeout(() => showNextQuestion(), 1500);
            } else {
                element.classList.add('incorrect');
            }
        }

        const quizQuestions = [
            {
                question: "What percentage of Earth's oxygen does the Amazon produce?",
                options: [
                    { text: "20%", correct: true },
                    { text: "5%", correct: false },
                    { text: "50%", correct: false }
                ]
            },
            {
                question: "How many species of plants are found in the Amazon?",
                options: [
                    { text: "40,000", correct: true },
                    { text: "10,000", correct: false },
                    { text: "100,000", correct: false }
                ]
            }
        ];

        let currentQuestion = 0;

        function showNextQuestion() {
            currentQuestion++;
            if (currentQuestion < quizQuestions.length) {
                const quizContainer = document.getElementById('quiz-question');
                const question = quizQuestions[currentQuestion];
                
                quizContainer.innerHTML = `
                    <h3>${question.question}</h3>
                    ${question.options.map(option => 
                        `<div class="quiz-option" onclick="checkAnswer(this, ${option.correct})">${option.text}</div>`
                    ).join('')}
                `;
            }
        }

        // Smooth scrolling
        function scrollToSection(id) {
            document.getElementById(id).scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Handle donation form submission
        function handleDonation(event) {
            event.preventDefault();
            alert('Thank you for your donation! This is a demo - no actual transaction occurred.');
            closeModal();
        }

        // Close modals when clicking outside
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                closeModal();
            }
        }
 function createParticles() {
            const container = document.getElementById('particleContainer');
            
            // Create particles
            for (let i = 0; i < 20; i++) {
                createAnimatedElement('particle', {
                    duration: random(15, 25),
                    travel: random(-200, 200),
                    size: random(3, 8)
                });
            }

            // Create leaves
            for (let i = 0; i < 15; i++) {
                createAnimatedElement('leaf', {
                    duration: random(20, 30),
                    travel: random(-300, 300),
                    size: random(10, 20)
                });
            }

            // Create fireflies
            for (let i = 0; i < 30; i++) {
                createFirefly();
            }

            function createAnimatedElement(className, options) {
                const element = document.createElement('div');
                element.className = className;
                element.style.setProperty('--duration', `${options.duration}s`);
                element.style.setProperty('--travel', `${options.travel}px`);
                element.style.width = `${options.size}px`;
                element.style.height = `${options.size}px`;
                element.style.left = `${random(0, 100)}%`;
                container.appendChild(element);

                element.addEventListener('animationend', () => {
                    element.remove();
                    createAnimatedElement(className, options);
                });
            }

            function createFirefly() {
                const firefly = document.createElement('div');
                firefly.className = 'firefly';
                firefly.style.setProperty('--duration', `${random(10, 20)}s`);
                firefly.style.setProperty('--tx', `${random(-200, 200)}px`);
                firefly.style.setProperty('--ty', `${random(-200, 200)}px`);
                firefly.style.left = `${random(0, 100)}%`;
                firefly.style.top = `${random(0, 100)}%`;
                container.appendChild(firefly);

                firefly.addEventListener('animationend', () => {
                    firefly.remove();
                    createFirefly();
                });
            }
        }

        function random(min, max) {
            return Math.random() * (max - min) + min;
        }

        // Ambient gradient movement
        function updateAmbientGradient(e) {
            const gradient = document.getElementById('ambientGradient');
            if (!gradient) return;

            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            gradient.style.setProperty('--x', `${x}%`);
            gradient.style.setProperty('--y', `${y}%`);
        }

        // Initialize animations
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            document.addEventListener('mousemove', updateAmbientGradient);
        });