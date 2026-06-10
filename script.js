
const services = [
    { id: 1, name: "Dry Cleaning", price: 200, icon: "🧥" },
    { id: 2, name: "Wash & Fold", price: 100, icon: "🧴" },
    { id: 3, name: "Ironing", price: 30, icon: "👕" },
    { id: 4, name: "Stain Removal", price: 500, icon: "✨" },
    { id: 5, name: "Leather & Suede Cleaning", price: 999, icon: "👜" },
    { id: 6, name: "Wedding Dress Cleaning", price: 2800, icon: "👗" }
];

let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    showAllServices();
    setupButtons();
    loadSavedCart();
});

function showAllServices() {
    const servicesGrid = document.getElementById('services-grid');
    servicesGrid.innerHTML = services.map(function(service) {
        const isInCart = cart.some(item => item.id === service.id);
        
        let buttonHTML;
        if (isInCart) {
            buttonHTML = `<button class="btn-remove" onclick="removeFromCart(${service.id})">Remove Item ✕</button>`;
        } else {
            buttonHTML = `<button class="btn-add" onclick="addToCart(${service.id})">Add Item ⊕</button>`;
        }
        
        return `
            <div class="service-item">
                <div class="service-info">
                    <div class="service-name">${service.icon} ${service.name}</div>
                    <div class="service-price">₹${service.price.toFixed(2)}</div>
                </div>
                <div>${buttonHTML}</div>
            </div>
        `;
    }).join('');
}

function addToCart(serviceId) {
    const serviceToAdd = services.find(service => service.id === serviceId);
    const isAlreadyInCart = cart.some(item => item.id === serviceId);
    if (serviceToAdd && !isAlreadyInCart) {
        cart.push(serviceToAdd);
        saveCart();
        updateCartDisplay();
        showAllServices();
    }
}

function removeFromCart(serviceId) {
    cart = cart.filter(item => item.id !== serviceId);
    saveCart();
    updateCartDisplay();
    showAllServices();
}

function updateCartDisplay() {
    const cartItemsTable = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    const cartIconEl = document.getElementById('cart-icon');
    
    if (cart.length === 0) {
        cartItemsTable.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 20px;">Your cart is empty</td></tr>';
    } else {
        cartItemsTable.innerHTML = cart.map(function(item, index) {
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>₹${item.price.toFixed(2)}</td>
                </tr>
            `;
        }).join('');
    }

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].price;
    }
    totalPriceEl.textContent = `₹${total.toFixed(2)}`;
    cartIconEl.textContent = `🛒 Cart (${cart.length})`;
}

function saveCart() {
    localStorage.setItem('laundryCart', JSON.stringify(cart));
}

function loadSavedCart() {
    const savedCartString = localStorage.getItem('laundryCart');
    if (savedCartString) {
        cart = JSON.parse(savedCartString);
        updateCartDisplay();
    }
}

function setupButtons() {
    const bookingForm = document.getElementById('booking-form');
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletter);
    }
}

function handleBooking(event) {
    event.preventDefault();

    if (typeof emailjs === 'undefined') {
        alert('Email service is not set up yet. Please check the README file for instructions!');
        return;
    }

    if (cart.length === 0) {
        alert('Please add some services to your cart first!');
        return;
    }

    const fullName = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!fullName || !email || !phone) {
        alert('Please fill in all the fields!');
        return;
    }

    if (!isEmailValid(email)) {
        alert('Please enter a valid email address!');
        return;
    }

    if (!isPhoneValid(phone)) {
        alert('Please enter a valid 10-digit phone number!');
        return;
    }

    const bookingNumber = generateBookingNumber();

    let servicesListText = '';
    for (let i = 0; i < cart.length; i++) {
        servicesListText += `${i + 1}. ${cart[i].name} - ₹${cart[i].price.toFixed(2)}\n`;
    }

    let totalAmount = 0;
    for (let i = 0; i < cart.length; i++) {
        totalAmount += cart[i].price;
    }
    const totalAmountString = `₹${totalAmount.toFixed(2)}`;

    const emailData = {
        customer_name: fullName,
        email: email,
        phone: phone,
        services: servicesListText,
        total_amount: totalAmountString,
        confirmation_number: bookingNumber,
        message: `Booking Confirmation #${bookingNumber}\n\nCustomer: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n\nServices:\n${servicesListText}\n\nTotal: ${totalAmountString}`
    };

    console.log('📧 Sending booking email with these details:', emailData);

    emailjs.send('service_k4t3267', 'template_xzt4uhd', emailData)
        .then(function(response) {
            console.log('✅ Email sent successfully!', response);
            
            const bookingMessage = document.getElementById('booking-message');
            if (bookingMessage) {
                bookingMessage.classList.remove('hidden');
                setTimeout(function() {
                    bookingMessage.classList.add('hidden');
                }, 5000);
            }

            showConfirmationModal({
                number: bookingNumber,
                name: fullName,
                email: email,
                phone: phone,
                services: cart,
                total: totalAmount
            });

            const bookingForm = document.getElementById('booking-form');
            bookingForm.reset();
            cart = [];
            saveCart();
            updateCartDisplay();
            showAllServices();
        })
        .catch(function(error) {
            console.error('❌ Error sending email:', error);
            alert('Could not send booking email. Please check your EmailJS setup in the README!');
        });
}

function handleNewsletter(event) {
    event.preventDefault();

    const subscriberName = document.getElementById('subscriber-name').value.trim();
    const subscriberEmail = document.getElementById('subscriber-email').value.trim();
    const newsletterForm = document.getElementById('newsletter-form');

    if (!subscriberName || !subscriberEmail) {
        alert('Please fill in your name and email!');
        return;
    }

    if (!isEmailValid(subscriberEmail)) {
        alert('Please enter a valid email!');
        return;
    }

    alert(`✅ Thanks for subscribing, ${subscriberName}! We'll keep you updated!`);
    newsletterForm.reset();
}

function isEmailValid(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isPhoneValid(phone) {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    return cleanPhone.length === 10;
}

function generateBookingNumber() {
    const timePart = Date.now().toString().slice(-6);
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `LM${timePart}${randomPart}`;
}

function showConfirmationModal(data) {
    const modal = document.getElementById('thank-you-modal');

    document.getElementById('confirmation-number').textContent = data.number;
    document.getElementById('detail-name').textContent = data.name;
    document.getElementById('detail-email').textContent = data.email;
    document.getElementById('detail-phone').textContent = data.phone;
    document.getElementById('detail-total').textContent = `₹${data.total.toFixed(2)}`;
    document.getElementById('modal-email').textContent = data.email;

    const servicesHTML = data.services.map(function(service, index) {
        return `<div class="service-detail">${index + 1}. ${service.icon} ${service.name} - ₹${service.price.toFixed(2)}</div>`;
    }).join('');
    document.getElementById('detail-services').innerHTML = servicesHTML;

    modal.classList.remove('hidden');
    modal.classList.add('show');

    setTimeout(function() {
        modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

function closeThankYouModal() {
    const modal = document.getElementById('thank-you-modal');
    modal.classList.remove('show');
    modal.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', function(event) {
    const modal = document.getElementById('thank-you-modal');
    if (event.target === modal) {
        closeThankYouModal();
    }
});

function scrollToServices() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}
