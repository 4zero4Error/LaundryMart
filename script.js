
const services = [
    { id: 1, name: "Dry Cleaning", price: 200, icon: "🧥" },
    { id: 2, name: "Wash & Fold", price: 100, icon: "🧴" },
    { id: 3, name: "Ironing", price: 30, icon: "👕" },
    { id: 4, name: "Stain Removal", price: 500, icon: "✨" },
    { id: 5, name: "Leather & Suede Cleaning", price: 999, icon: "👜" },
    { id: 6, name: "Wedding Dress Cleaning", price: 2800, icon: "👗" }
];

let cart = [];

window.onload = function() {
    showServices();
    setupFormListeners();
    loadCart();
};

function showServices() {
    let servicesContainer = document.getElementById('services-grid');
    let html = '';
    for (let i = 0; i < services.length; i++) {
        let service = services[i];
        let button = '';
        let isInCart = false;
        for (let j = 0; j < cart.length; j++) {
            if (cart[j].id === service.id) {
                isInCart = true;
            }
        }
        if (isInCart) {
            button = `<button class="btn-remove" onclick="removeFromCart(${service.id})">Remove Item ✕</button>`;
        } else {
            button = `<button class="btn-add" onclick="addToCart(${service.id})">Add Item ⊕</button>`;
        }
        html += `
            <div class="service-item">
                <div class="service-info">
                    <div class="service-name">${service.icon} ${service.name}</div>
                    <div class="service-price">₹${service.price.toFixed(2)}</div>
                </div>
                ${button}
            </div>
        `;
    }
    servicesContainer.innerHTML = html;
}

function addToCart(id) {
    let service = null;
    for (let i = 0; i < services.length; i++) {
        if (services[i].id === id) {
            service = services[i];
        }
    }
    let alreadyInCart = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            alreadyInCart = true;
        }
    }
    if (service && !alreadyInCart) {
        cart.push(service);
        saveCart();
        updateCart();
        showServices();
    }
}

function removeFromCart(id) {
    let newCart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id !== id) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;
    saveCart();
    updateCart();
    showServices();
}

function updateCart() {
    let cartTable = document.getElementById('cart-items');
    let totalEl = document.getElementById('total-price');
    let cartIcon = document.getElementById('cart-icon');

    if (cart.length === 0) {
        cartTable.innerHTML = '<tr><td colspan="3" style="text-align: center;">Your cart is empty</td></tr>';
    } else {
        let html = '';
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            html += `
                <tr>
                    <td>${i+1}</td>
                    <td>${cart[i].name}</td>
                    <td>₹${cart[i].price.toFixed(2)}</td>
                </tr>
            `;
            total += cart[i].price;
        }
        cartTable.innerHTML = html;
        totalEl.textContent = `₹${total.toFixed(2)}`;
    }
    cartIcon.textContent = `🛒 Cart (${cart.length})`;
}

function saveCart() {
    localStorage.setItem('laundryCart', JSON.stringify(cart));
}

function loadCart() {
    let savedCart = localStorage.getItem('laundryCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

function setupFormListeners() {
    let bookingForm = document.getElementById('booking-form');
    let newsletterForm = document.getElementById('newsletter-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBooking();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletter();
        });
    }
}

function handleBooking() {
    if (typeof emailjs === 'undefined') {
        alert('EmailJS is not set up yet! Please check the README file for instructions!');
        return;
    }

    if (cart.length === 0) {
        alert('Please add at least one service to your cart!');
        return;
    }

    let name = document.getElementById('full-name').value.trim();
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phone').value.trim();

    if (!name || !email || !phone) {
        alert('Please fill in all fields!');
        return;
    }

    let emailValid = false;
    if (email.includes('@') && email.includes('.')) {
        emailValid = true;
    }
    if (!emailValid) {
        alert('Please enter a valid email address!');
        return;
    }

    let phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length !== 10) {
        alert('Please enter a valid 10-digit phone number!');
        return;
    }

    let bookingNumber = 'LM' + Date.now().toString().slice(-6) + Math.random().toString(36).slice(2,8).toUpperCase();

    let servicesText = '';
    let totalAmount = 0;
    for (let i = 0; i < cart.length; i++) {
        servicesText += `${i+1}. ${cart[i].name} - ₹${cart[i].price.toFixed(2)}\n`;
        totalAmount += cart[i].price;
    }

    let templateParams = {
        customer_name: name,
        email: email,
        phone: phone,
        services: servicesText,
        total_amount: `₹${totalAmount.toFixed(2)}`,
        confirmation_number: bookingNumber,
        message: `Booking Confirmation #${bookingNumber}\n\nCustomer Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nServices:\n${servicesText}\n\nTotal: ₹${totalAmount.toFixed(2)}`
    };

    console.log('📧 Sending booking details:', templateParams);

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_BOOKING_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('✅ Booking email sent!', response);

            let thankYouMsg = document.getElementById('booking-message');
            thankYouMsg.classList.remove('hidden');
            setTimeout(function() {
                thankYouMsg.classList.add('hidden');
            }, 5000);

            showThankYouModal({
                number: bookingNumber,
                name: name,
                email: email,
                phone: phone,
                services: cart,
                total: totalAmount
            });

            document.getElementById('booking-form').reset();
            cart = [];
            saveCart();
            updateCart();
            showServices();
        })
        .catch(function(error) {
            console.error('❌ Error sending email:', error);
            alert('Could not send the booking email. Please double-check your EmailJS setup in the README file!');
        });
}

function showThankYouModal(data) {
    let modal = document.getElementById('thank-you-modal');

    document.getElementById('confirmation-number').textContent = data.number;
    document.getElementById('detail-name').textContent = data.name;
    document.getElementById('detail-email').textContent = data.email;
    document.getElementById('detail-phone').textContent = data.phone;
    document.getElementById('detail-total').textContent = `₹${data.total.toFixed(2)}`;
    document.getElementById('modal-email').textContent = data.email;

    let servicesHTML = '';
    for (let i = 0; i < data.services.length; i++) {
        servicesHTML += `<div class="service-detail">${i+1}. ${data.services[i].icon} ${data.services[i].name} - ₹${data.services[i].price.toFixed(2)}</div>`;
    }
    document.getElementById('detail-services').innerHTML = servicesHTML;

    modal.classList.remove('hidden');
    modal.classList.add('show');
    setTimeout(function() {
        modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

function closeThankYouModal() {
    let modal = document.getElementById('thank-you-modal');
    modal.classList.remove('show');
    modal.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', function(event) {
    let modal = document.getElementById('thank-you-modal');
    if (event.target === modal) {
        closeThankYouModal();
    }
});

function handleNewsletter() {
    let name = document.getElementById('subscriber-name').value.trim();
    let email = document.getElementById('subscriber-email').value.trim();

    if (!name || !email) {
        alert('Please enter both your name and email!');
        return;
    }

    let emailValid = false;
    if (email.includes('@') && email.includes('.')) {
        emailValid = true;
    }
    if (!emailValid) {
        alert('Please enter a valid email address!');
        return;
    }

    alert(`✅ Thank you for subscribing, ${name}! We'll keep you updated!`);
    document.getElementById('newsletter-form').reset();
}

function scrollToServices() {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}
