document.addEventListener('DOMContentLoaded', function() {
    // Toggle Sidebar
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    // إنشاء طبقة معتمة
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // تحديث وظيفة التبديل
    sidebarToggle?.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    });

    // إغلاق Sidebar عند النقر على الطبقة المعتمة
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // إغلاق Sidebar عند النقر على أي رابط
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // إغلاق Sidebar عند تغيير حجم النافذة
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Sales Chart
    const salesChart = document.getElementById('salesChart');
    if (salesChart) {
        new Chart(salesChart, {
            type: 'line',
            data: {
                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                datasets: [{
                    label: 'المبيعات',
                    data: [12500, 19200, 15000, 25000, 22000, 30000],
                    borderColor: '#3498db',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(52, 152, 219, 0.1)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'تحليل المبيعات الشهرية'
                    }
                }
            }
        });
    }

    // Products Distribution Chart
    const productsChart = document.getElementById('productsChart');
    if (productsChart) {
        new Chart(productsChart, {
            type: 'doughnut',
            data: {
                labels: ['الساعات الذكية', 'السماعات', 'الإكسسوارات', 'أخرى'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: [
                        '#3498db',
                        '#2ecc71',
                        '#f1c40f',
                        '#e74c3c'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Stats Cards Animation
    const statsCards = document.querySelectorAll('.stats-card');
    statsCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Table Actions
    const actionButtons = document.querySelectorAll('.btn-sm');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const action = this.querySelector('i').classList.contains('fa-eye') ? 'عرض' : 'حذف';
            const orderId = this.closest('tr').querySelector('td:first-child').textContent;
            
            if (action === 'حذف') {
                if (confirm(`هل أنت متأكد من حذف الطلب ${orderId}؟`)) {
                    this.closest('tr').remove();
                    showNotification('تم حذف الطلب بنجاح', 'success');
                }
            } else {
                showNotification(`جاري عرض تفاصيل الطلب ${orderId}`, 'info');
            }
        });
    });

    // Notifications System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Search Functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput?.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const tableRows = document.querySelectorAll('tbody tr');
        
        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // Real-time Updates
    function updateStats() {
        const stats = document.querySelectorAll('.stats-info h3');
        stats.forEach(stat => {
            const currentValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            const change = Math.floor(Math.random() * 10) - 5; // Random change between -5 and 5
            const newValue = currentValue + change;
            
            if (newValue > 0) {
                stat.textContent = stat.textContent.replace(currentValue, newValue);
                
                const trend = stat.nextElementSibling;
                if (change > 0) {
                    trend.innerHTML = `<i class="fas fa-arrow-up"></i> ${(change/currentValue*100).toFixed(1)}%`;
                    trend.className = 'trend up';
                } else if (change < 0) {
                    trend.innerHTML = `<i class="fas fa-arrow-down"></i> ${(Math.abs(change)/currentValue*100).toFixed(1)}%`;
                    trend.className = 'trend down';
                }
            }
        });
    }

    // Update stats every 5 minutes
    setInterval(updateStats, 300000);

    // Navigation Active State
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            // Simulate page loading
            showNotification('جاري تحميل القسم...', 'info');
        });
    });

    // Profile Dropdown
    const userProfile = document.querySelector('.user-profile');
    userProfile?.addEventListener('click', function() {
        const dropdown = document.createElement('div');
        dropdown.className = 'profile-dropdown';
        dropdown.innerHTML = `
            <a href="#"><i class="fas fa-user"></i> الملف الشخصي</a>
            <a href="#"><i class="fas fa-cog"></i> الإعدادات</a>
            <a href="#"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</a>
        `;
        
        const existingDropdown = document.querySelector('.profile-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        } else {
            document.body.appendChild(dropdown);
            const rect = this.getBoundingClientRect();
            dropdown.style.top = `${rect.bottom + 5}px`;
            dropdown.style.right = `${rect.right - dropdown.offsetWidth}px`;
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-profile') && !e.target.closest('.profile-dropdown')) {
            const dropdown = document.querySelector('.profile-dropdown');
            if (dropdown) dropdown.remove();
        }
    });

    // Fetch Products
    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:5000/api/products', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            const products = await response.json();
            updateProductsTable(products);
        } catch (err) {
            showNotification('Error fetching products', 'error');
        }
    }

    // Fetch Analytics
    async function fetchAnalytics() {
        try {
            const [salesResponse, productsResponse] = await Promise.all([
                fetch('http://localhost:5000/api/analytics/sales', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                }),
                fetch('http://localhost:5000/api/analytics/products', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                })
            ]);

            const salesData = await salesResponse.json();
            const productsData = await productsResponse.json();

            updateCharts(salesData, productsData);
        } catch (err) {
            showNotification('Error fetching analytics', 'error');
        }
    }

    // Update Product
    async function updateProduct(productId, data) {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showNotification('Product updated successfully', 'success');
                fetchProducts();
            }
        } catch (err) {
            showNotification('Error updating product', 'error');
        }
    }

    // Initialize Dashboard
    if (localStorage.getItem('adminToken')) {
        fetchProducts();
        fetchAnalytics();
        
        // Refresh data every 5 minutes
        setInterval(() => {
            fetchProducts();
            fetchAnalytics();
        }, 300000);
    } else {
        window.location.href = '/admin-login.html';
    }
}); 