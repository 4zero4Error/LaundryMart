// Services Data
const services = [
    { id: 1, name: "Dry Cleaning", price: 200, icon: "🧥" },
    { id: 2, name: "Wash & Fold", price: 100, icon: "🧴" },
    { id: 3, name: "Ironing", price: 30, icon: "👕" },
    { id: 4, name: "Stain Removal", price: 500, icon: "✨" },
    { id: 5, name: "Leather & Suede Cleaning", price: 999, icon: "👜" },
    { id: 6, name: "Wedding Dress Cleaning", price: 2800, icon: "👗" }
];

// Cart array to store selected services
let cart = [];

// DOM Elements
const servicesGrid = document.getElementById('services-grid');
const cartItemsTable = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const cartIconEl = document.getElementById('cart-icon');
const bookingForm = document.getElementById('booking-form');
const newsletterForm = document.getElementById('newsletter-form');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    setupEventListeners();
    loadCartFromStorage();
});

// Render services in the grid
function renderServices() {
    servicesGrid.innerHTML = services.map(service => `
        <div class="service-item">
            <div class="service-info">
                <div class="service-name">${service.icon} ${service.name}</div>
                <div class="service-price">₹${service.price.toFixed(2)}</div>
            </div>
            <div>
                ${isServiceInCart(service.id) ? 
                    `<button class="btn-remove" onclick="removeFromCart(${service.id})">
                        Remove Item ✕
                    </button>` : 
                    `<button class="btn-add" onclick="addToCart(${service.id})">
                        Add Item ⊕
                    </button>`
                }
            </div>
        </div>
    `).join('');
}

// Check if service is already in cart
function isServiceInCart(serviceId) {
    return cart.some(item => item.id === serviceId);
}

// Add service to cart
function addToCart(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (service && !isServiceInCart(serviceId)) {
        cart.push({ ...service });
        saveCartToStorage();
        updateCart();
        renderServices();
    }
}

// Remove service from cart
function removeFromCart(serviceId) {
    cart = cart.filter(item => item.id !== serviceId);
    saveCartToStorage();
    updateCart();
    renderServices();
}

// Update cart display
function updateCart() {
    // Update cart items table
    if (cart.length === 0) {
        cartItemsTable.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 20px;">Your cart is empty</td></tr>';
    } else {
        cartItemsTable.innerHTML = cart.map((item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
            </tr>
        `).join('');
    }
    
    // Update total price
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPriceEl.textContent = `₹${total.toFixed(2)}`;
    
    // Update cart icon count
    cartIconEl.textContent = `🛒 Cart (${cart.length})`;
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('laundryCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('laundryCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Verify EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.warn('⚠️ EmailJS not loaded yet. It will be initialized when the page fully loads.');
    } else {
        console.log('✅ EmailJS loaded successfully. Public Key: m9WkuokCO_D7mOJ9Z');
    }
    
    // Verify forms exist
    if (!bookingForm) {
        console.error('❌ Booking form not found!');
    }
    if (!newsletterForm) {
        console.error('❌ Newsletter form not found!');
    }
    
    // Booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
    
    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

// Handle booking form submission
function handleBookingSubmit(e) {
    e.preventDefault();
    
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        alert('Email service is not available. Please check your internet connection and refresh the page.');
        console.error('❌ EmailJS is not loaded');
        return;
    }
    
    // Validate cart is not empty
    if (cart.length === 0) {
        alert('Please add services to your cart before booking!');
        return;
    }
    
    // Get form values
    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Validate inputs
    if (!fullName || !email || !phone) {
        alert('Please fill in all fields');
        return;
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Validate phone format
    if (!isValidPhone(phone)) {
        alert('Please enter a valid phone number');
        return;
    }
    
    // Generate confirmation number
    const confirmationNumber = generateConfirmationNumber();
    
    // Prepare services details
    const cartDetails = cart.map((item, index) => 
        `${index + 1}. ${item.name} - ₹${item.price.toFixed(2)}`
    ).join('\n');
    
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Prepare email parameters
    const templateParams = {
        customer_name: fullName,
        email: email,
        phone: phone,
        services: cartDetails,
        total_amount: `₹${totalAmount.toFixed(2)}`,
        confirmation_number: confirmationNumber,
        message: `Booking Confirmation #${confirmationNumber}\n\nCustomer: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n\nServices:\n${cartDetails}\n\nTotal: ₹${totalAmount.toFixed(2)}`
    };
    
    console.log('📧 Sending booking email with params:', templateParams);
    
    // Send email using EmailJS
    emailjs.send('service_k4t3267', 'template_xzt4uhd', templateParams)
        .then((response) => {
            console.log('✅ Booking email sent successfully:', response);
            console.log('✅ Status:', response.status);
            
            // Show thank-you modal with booking details
            showThankYouModal({
                confirmationNumber,
                fullName,
                email,
                phone,
                services: cart,
                totalAmount
            });

            // Show confirmation message below the button
            const bookingMessage = document.getElementById('booking-message');
            if (bookingMessage) {
                bookingMessage.classList.remove('hidden');
                // Hide it after 5 seconds
                setTimeout(() => {
                    bookingMessage.classList.add('hidden');
                }, 5000);
            }
            
            // Clear form and cart
            bookingForm.reset();
            cart = [];
            saveCartToStorage();
            updateCart();
            renderServices();
        })
        .catch((error) => {
            console.error('❌ Error sending booking email:', error);
            console.error('Error Status:', error.status);
            console.error('Error Text:', error.text);
            alert('Error submitting booking:\n' + (error.text || error.message || 'Please try again.'));
        });
}

// Handle newsletter form submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        alert('Email service is not available. Please check your internet connection and refresh the page.');
        console.error('❌ EmailJS is not loaded');
        return;
    }
    
    const fullName = document.getElementById('subscriber-name').value.trim();
    const email = document.getElementById('subscriber-email').value.trim();
    
    if (!fullName || !email) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Prepare email parameters
    const templateParams = {
        subscriber_name: fullName,
        email: email,
        message: `New newsletter subscription from ${fullName}`
    };
    
    console.log('📧 Sending newsletter email with params:', templateParams);
    
    // Send email using EmailJS
    emailjs.send('service_k4t3267', 'template_abc123', templateParams)
        .then((response) => {
            console.log('✅ Newsletter email sent successfully:', response);
            alert('✅ Thank you for subscribing! Check your email for confirmation.');
            e.target.reset();
        })
        .catch((error) => {
            console.error('❌ Error sending newsletter email:', error);
            console.error('Error Status:', error.status);
            console.error('Error Text:', error.text);
            alert('Error subscribing:\n' + (error.text || 'Please try again.'));
        });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[^\d]/g, ''));
}

// Generate unique confirmation number
function generateConfirmationNumber() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `LM${timestamp}${random}`;
}

// Show thank-you modal with booking details
function showThankYouModal(bookingData) {
    const modal = document.getElementById('thank-you-modal');
    const { confirmationNumber, fullName, email, phone, services, totalAmount } = bookingData;
    
    // Populate modal fields
    document.getElementById('confirmation-number').textContent = confirmationNumber;
    document.getElementById('detail-name').textContent = fullName;
    document.getElementById('detail-email').textContent = email;
    document.getElementById('detail-phone').textContent = phone;
    document.getElementById('detail-total').textContent = `₹${totalAmount.toFixed(2)}`;
    document.getElementById('modal-email').textContent = email;
    
    // Populate services list
    const servicesHTML = services.map((service, index) => 
        `<div class="service-detail">
            ${index + 1}. ${service.icon} ${service.name} - ₹${service.price.toFixed(2)}
        </div>`
    ).join('');
    document.getElementById('detail-services').innerHTML = servicesHTML;
    
    // Show modal with animation
    modal.classList.remove('hidden');
    modal.classList.add('show');
    
    // Scroll to modal
    setTimeout(() => {
        modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    
    console.log('✅ Thank you modal displayed for booking #' + confirmationNumber);
}

// Close thank-you modal
function closeThankYouModal() {
    const modal = document.getElementById('thank-you-modal');
    modal.classList.remove('show');
    modal.classList.add('hidden');
    
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('thank-you-modal');
    if (event.target === modal) {
        closeThankYouModal();
    }
});

// Smooth scroll to services
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    servicesSection.scrollIntoView({ behavior: 'smooth' });
}

// Add smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});