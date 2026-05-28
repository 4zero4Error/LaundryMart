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
    // Booking form submission
    bookingForm.addEventListener('submit', handleBookingSubmit);
    
    // Newsletter form submission
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
}

// Handle booking form submission
function handleBookingSubmit(e) {
    e.preventDefault();
    
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
    
    // Prepare services details
    const cartDetails = cart.map((item, index) => 
        `${index + 1}. ${item.name} - ₹${item.price.toFixed(2)}`
    ).join('\n');
    
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Populate hidden fields with service and total information
    document.getElementById('services-field').value = cartDetails;
    document.getElementById('total-field').value = `₹${totalAmount.toFixed(2)}`;
    
    // Show success message
    alert('Booking confirmed! You will receive a confirmation email shortly.');
    
    // Clear form and cart
    bookingForm.reset();
    cart = [];
    saveCartToStorage();
    updateCart();
    renderServices();
}

// Handle newsletter form submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const fullName = e.target.querySelector('input[placeholder="Full name"]').value.trim();
    const email = e.target.querySelector('input[placeholder="Email"]').value.trim();
    
    if (!fullName || !email) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show success message
    alert('Thank you for subscribing! Check your email for confirmation.');
    e.target.reset();
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