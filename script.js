document.addEventListener('DOMContentLoaded', function() {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Cart Counter Animation
    const cartBadge = document.querySelector('.badge');
    cartBadge.addEventListener('click', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Product Quick View and Add to Cart Functionality
    // Quick View Button
    const quickViewButtons = document.querySelectorAll('.quick-view');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            alert(`عرض سريع للمنتج: ${productTitle}`);
            // يمكنك هنا إضافة modal لعرض تفاصيل المنتج
        });
    });

    // Add to Cart Button
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            // تحديث عدد المنتجات في السلة
            const cartBadge = document.querySelector('.badge');
            const currentCount = parseInt(cartBadge.textContent);
            cartBadge.textContent = currentCount + 1;
            
            // تأثير حركي للسلة
            cartBadge.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartBadge.style.transform = 'scale(1)';
            }, 200);

            // رسالة تأكيد
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.textContent = `تمت إضافة ${productTitle} إلى السلة`;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.remove();
            }, 3000);
        });
    });

    // Countdown Timer Function
    function updateTimer(elementId, hours, minutes, seconds) {
        const timer = document.getElementById(elementId);
        
        setInterval(() => {
            if(seconds > 0) {
                seconds--;
            } else {
                if(minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    if(hours > 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    }
                }
            }
            
            timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    // Initialize timers
    updateTimer('timer1', 2, 15, 45);
    updateTimer('timer2', 1, 22, 33);

    // Reviews Slider
    function initReviewsSlider() {
        const slides = document.querySelectorAll('.review-card');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.review-prev');
        const nextBtn = document.querySelector('.review-next');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        // Event Listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // Initialize reviews slider
    initReviewsSlider();

    // إضافة هذا الكود في هاية ملف JavaScript
    document.getElementById('year').textContent = new Date().getFullYear();

    // Product Page Functions
    function initProductPage() {
        // Thumbnail Images
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('mainImage');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                // Add active class to clicked thumbnail
                this.classList.add('active');
                // Update main image
                mainImage.src = this.src;
            });
        });

        // Quantity Selector
        const minusBtn = document.querySelector('.minus');
        const plusBtn = document.querySelector('.plus');
        const quantityInput = document.querySelector('.quantity-selector input');

        minusBtn?.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });

        plusBtn?.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });

        // Color Options
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Wishlist Button
        const wishlistBtn = document.querySelector('.wishlist-btn');
        wishlistBtn?.addEventListener('click', function() {
            this.querySelector('i').classList.toggle('fas');
            this.querySelector('i').classList.toggle('far');
        });
    }

    // Initialize product page functions if on product page
    if (document.querySelector('.product-details-section')) {
        initProductPage();
    }

    // إضافة هذا الكود في نهاية ملف JavaScript

    // Product Click Handler
    function initProductLinks() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productLink = card.querySelector('.product-link');
            
            productLink.addEventListener('click', function(e) {
                // تجنب التنقل إذا تم النقر على أزرار العرض السريع أو إضافة للسلة
                if (!e.target.closest('.product-overlay')) {
                    e.preventDefault();
                    
                    // جمع كل معلومات المنتج
                    const productData = {
                        title: card.querySelector('.product-title').textContent,
                        image: card.querySelector('.product-image img').src,
                        price: card.querySelector('.new-price').textContent,
                        oldPrice: card.querySelector('.old-price').textContent,
                        rating: card.querySelector('.product-rating').innerHTML,
                        badge: card.querySelector('.badge') ? {
                            text: card.querySelector('.badge').textContent,
                            class: card.querySelector('.badge').className
                        } : null,
                        description: "ساعة ذكية متطورة مع شاشة AMOLED مقاس 1.4 بوصة، مقاومة للماء، تتبع النشاط البدني، قياس معدل ضربات القلب، وبطارية تدوم حتى 14 يوم."
                    };

                    // حفظ بيانات المنتج في localStorage
                    localStorage.setItem('selectedProduct', JSON.stringify(productData));
                    
                    // الانتقال إلى صفحة المنتج
                    window.location.href = 'product.html';
                }
            });
        });
    }

    // تحميل بيانات المنتج في صفحة المنتج
    function loadProductDetails() {
        if (window.location.pathname.includes('product.html')) {
            const productData = JSON.parse(localStorage.getItem('selectedProduct'));
            if (productData) {
                // تحديث الصورة الرئيسية والمصغرات
                const mainImage = document.getElementById('mainImage');
                const thumbnails = document.querySelectorAll('.thumbnail');
                mainImage.src = productData.image;
                thumbnails.forEach(thumb => {
                    thumb.src = productData.image;
                });
                
                // تحديث عنوان المنتج
                document.querySelector('.product-title').textContent = productData.title;
                
                // تحديث الأسعار
                document.querySelector('.new-price').textContent = productData.price;
                document.querySelector('.old-price').textContent = productData.oldPrice;
                
                // تحديث التقييم
                document.querySelector('.product-rating').innerHTML = productData.rating;
                
                // تحديث الوصف
                document.querySelector('.product-description p').textContent = productData.description;
                
                // إضافة الشارة إذا كانت موجودة
                if (productData.badge) {
                    const badgeElement = document.createElement('span');
                    badgeElement.textContent = productData.badge.text;
                    badgeElement.className = productData.badge.class;
                    document.querySelector('.product-gallery').appendChild(badgeElement);
                }

                // تحديث عنوان الصفحة
                document.title = `${productData.title} | متجر إلكتروني`;
            }
        }
    }

    // تشغيل الوظائف عند تحميل الصفحة
    initProductLinks();
    loadProductDetails();

    // إضافة هذا الكود في نهاية ملف JavaScript

    // Rating System
    function initRatingSystem() {
        const ratingStars = document.querySelector('.rating-stars');
        const stars = ratingStars?.querySelectorAll('i');
        let selectedRating = 0;

        stars?.forEach(star => {
            star.addEventListener('mouseover', function() {
                const rating = this.dataset.rating;
                highlightStars(rating);
            });

            star.addEventListener('mouseout', function() {
                highlightStars(selectedRating);
            });

            star.addEventListener('click', function() {
                selectedRating = this.dataset.rating;
                highlightStars(selectedRating);
                ratingStars.classList.add('selected');
            });
        });

        function highlightStars(rating) {
            stars.forEach(star => {
                const starRating = star.dataset.rating;
                if (starRating <= rating) {
                    star.classList.remove('far');
                    star.classList.add('fas');
                    star.classList.add('active');
                } else {
                    star.classList.add('far');
                    star.classList.remove('fas');
                    star.classList.remove('active');
                }
            });
        }

        // Submit Review
        const submitReviewBtn = document.getElementById('submitReview');
        submitReviewBtn?.addEventListener('click', function() {
            const form = document.getElementById('reviewForm');
            const name = form.querySelector('input[type="text"]').value;
            const comment = form.querySelector('textarea').value;

            if (!selectedRating || !name || !comment) {
                alert('الرجاء ملء جميع الحقول وتحديد التقييم');
                return;
            }

            // إنشاء تقييم جديد
            const newReview = createReviewElement(name, selectedRating, comment);
            
            // إضافة التقييم إلى القائمة
            const reviewsList = document.querySelector('.user-reviews');
            reviewsList.insertBefore(newReview, reviewsList.firstChild);

            // تحديث متوسط التقييمات
            updateOverallRating();

            // إغلاق النافذة المنبثقة
            const modal = bootstrap.Modal.getInstance(document.getElementById('addReviewModal'));
            modal.hide();

            // إعادة تعيين النموذج
            form.reset();
            selectedRating = 0;
            highlightStars(0);
            ratingStars.classList.remove('selected');
        });
    }

    // Create Review Element
    function createReviewElement(name, rating, comment) {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review-item';
        reviewDiv.innerHTML = `
            <div class="review-header">
                <img src="https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg" alt="User" class="reviewer-avatar">
                <div class="reviewer-info">
                    <h6>${name}</h6>
                    <div class="stars">
                        ${getStarsHTML(rating)}
                    </div>
                    <span class="review-date">${new Date().toISOString().split('T')[0]}</span>
                </div>
            </div>
            <div class="review-body">
                <p>${comment}</p>
            </div>
        `;
        return reviewDiv;
    }

    // Get Stars HTML
    function getStarsHTML(rating) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= rating) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        return starsHTML;
    }

    // Update Overall Rating
    function updateOverallRating() {
        const reviews = document.querySelectorAll('.review-item');
        let totalRating = 0;
        reviews.forEach(review => {
            const stars = review.querySelectorAll('.stars .fas').length;
            totalRating += stars;
        });
        
        const averageRating = (totalRating / reviews.length).toFixed(1);
        document.querySelector('.overall-rating h2').textContent = averageRating;
        
        // تحديث عدد التقييمات
        document.querySelector('.overall-rating p').textContent = `من ${reviews.length} تقييم`;
    }

    // Initialize rating system
    if (document.querySelector('.rating-stars')) {
        initRatingSystem();
    }
}); 