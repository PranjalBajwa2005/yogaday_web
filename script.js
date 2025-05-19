// Content Slider
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        
        function showSlide(slideIndex) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[slideIndex].classList.add('active');
            dots[slideIndex].classList.add('active');
            currentSlide = slideIndex;
        }
        
        // Automatically advance slides
        setInterval(() => {
            let nextSlide = (currentSlide + 1) % slides.length;
            showSlide(nextSlide);
        }, 5000);
        
        // Manual slide control
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                let slideIndex = this.getAttribute('data-slide');
                showSlide(parseInt(slideIndex));
            });
        });
        
        // Form toggle - hiding and unhiding
        const toggleFormBtn = document.getElementById('toggleForm');
        const registrationForm = document.getElementById('registrationForm');
        
        toggleFormBtn.addEventListener('click', function() {
            if (registrationForm.classList.contains('hidden')) {
                registrationForm.classList.remove('hidden');
                toggleFormBtn.textContent = 'Hide Registration Form';
            } else {
                registrationForm.classList.add('hidden');
                toggleFormBtn.textContent = 'Show Registration Form';
            }
        });
        
        // Dynamic display of form data and bill generation
        const yogaForm = document.getElementById('yogaForm');
        const registrationData = document.getElementById('registrationData');
        
        yogaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const age = document.getElementById('age').value;
            const category = document.getElementById('category').value;
            const experience = document.getElementById('experience').value;
            const packageSelect = document.getElementById('package');
            const selectedPackage = packageSelect.options[packageSelect.selectedIndex].text;
            const packagePrice = parseInt(packageSelect.options[packageSelect.selectedIndex].getAttribute('data-price'));
            
            // Display registration details
            const regDetails = document.getElementById('regDetails');
            regDetails.innerHTML = `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Age:</strong> ${age}</p>
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Experience Level:</strong> ${experience}</p>
                <p><strong>Selected Package:</strong> ${selectedPackage}</p>
            `;
            
            // Calculate discount based on category
            let discountPercent = 0;
            if (category === 'employee') {
                discountPercent = 25;
            } else if (category === 'student') {
                discountPercent = 50;
            }
            
            const discountAmount = (packagePrice * discountPercent) / 100;
            const finalPrice = packagePrice - discountAmount;
            
            // Fill bill details
            document.getElementById('billName').textContent = name;
            document.getElementById('billEmail').textContent = email;
            document.getElementById('billPackage').textContent = selectedPackage;
            document.getElementById('billOriginalPrice').textContent = `₹${packagePrice.toLocaleString()}`;
            document.getElementById('billDiscount').textContent = `${discountPercent}% (₹${discountAmount.toLocaleString()})`;
            document.getElementById('billFinalPrice').textContent = `₹${finalPrice.toLocaleString()}`;
            
            // Generate random confirmation code
            const confirmationCode = generateConfirmationCode();
            document.getElementById('confirmationCode').textContent = confirmationCode;
            
            // Show registration data section
            registrationForm.classList.add('hidden');
            registrationData.classList.remove('hidden');
            toggleFormBtn.classList.add('hidden');
        });
        
        // Random confirmation code generation
        function generateConfirmationCode() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = 'YD-';
            
            for (let i = 0; i < 8; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                code += characters.charAt(randomIndex);
            }
            
            return code;
        }
