# LaundryMart - Web Application Setup Guide

A full-featured laundry service booking web application with cart management and email confirmations using EmailJS.

## Features

- ✨ **Responsive Design** - Mobile-friendly interface
- 🛒 **Shopping Cart** - Add/remove services dynamically
- 📧 **Email Confirmations** - Automated booking and newsletter emails
- 💾 **Local Storage** - Cart persistence across sessions
- 📱 **Service Management** - Browse 6+ laundry services
- 📋 **Booking System** - Simple form-based booking
- 🔗 **Smooth Navigation** - Seamless scrolling between sections

## File Structure

```
LaundryMart-2/
├── index.html      # Main HTML file with all sections
├── styles.css      # Complete styling and responsive design
├── script.js       # JavaScript for cart, booking, and email functionality
└── README.md       # This file
```

## Getting Started

### 1. EmailJS Setup

EmailJS allows you to send emails directly from JavaScript without a backend server.

#### Step 1: Create an EmailJS Account
1. Visit [emailjs.com](https://www.emailjs.com)
2. Sign up for a free account
3. Verify your email address

#### Step 2: Create an Email Service
1. Go to "Email Services" in the dashboard
2. Click "Connect a New Service"
3. Choose Gmail (or your preferred email provider)
4. Follow the authorization steps
5. Copy your **Service ID** (e.g., `service_xxxxxxxxxxxxx`)

#### Step 3: Create Email Templates

##### Template 1: Booking Confirmation Email
1. Go to "Email Templates" 
2. Click "Create New Template"
3. Set **Template Name**: `booking_confirmation`
4. Set **Template ID**: `template_booking` (or your custom ID)
5. Configure the template:

```
Subject: Your LaundryMart Booking Confirmation - {{booking_date}}

Body:
Dear {{customer_name}},

Thank you for booking with LaundryMart!

Booking Details:
Date: {{booking_date}}
Time: {{booking_time}}
Phone: {{customer_phone}}

Services Booked:
{{services}}

Total Amount: ₹{{total_amount}}

We will pick up your clothes as per your convenience.
Please keep this email for your reference.

Best regards,
LaundryMart Team
```

##### Template 2: Newsletter Subscription (Optional)
1. Create another template with **Template ID**: `template_newsletter`
2. Configure for newsletter confirmations

#### Step 4: Get Your Public Key
1. Go to "Account" settings
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxxxxxxxxxxxxx`)

### 2. Update Script Configuration

Edit `script.js` and replace the placeholder values:

```javascript
// Line 2: Replace with your EmailJS Public Key
emailjs.init("YOUR_PUBLIC_KEY_HERE");

// Line 74: Replace with your EmailJS Service ID and Template ID
await emailjs.send("YOUR_SERVICE_ID_HERE", "YOUR_TEMPLATE_ID_HERE", emailParams);

// Line 97: For newsletter (optional)
await emailjs.send("YOUR_SERVICE_ID_HERE", "YOUR_NEWSLETTER_TEMPLATE_ID", emailParams);
```

**Example:**
```javascript
emailjs.init("dGu3s8kL9pQ4mN2jR8vX");

// In booking form:
await emailjs.send("service_a1b2c3d4e5f6g7h8", "template_booking", emailParams);

// In newsletter:
await emailjs.send("service_a1b2c3d4e5f6g7h8", "template_newsletter", emailParams);
```

### 3. Update HTML (Optional)

The app is pre-configured with 6 services. To add more services, edit `script.js`:

```javascript
const services = [
    { id: 1, name: "Service Name", price: PRICE, icon: "EMOJI" },
    // Add more services...
];
```

### 4. Deploy Your Application

#### Option 1: Local Development
```bash
# Use any local server (Python, Node, etc.)
python -m http.server 8000
# or
npx http-server
```

#### Option 2: Free Hosting Services
- **Vercel**: [vercel.com](https://vercel.com) - Recommended
- **Netlify**: [netlify.com](https://netlify.com)
- **GitHub Pages**: [pages.github.com](https://pages.github.com)

## Email Customization

### Email Template Variables

The script sends the following variables to EmailJS:

```javascript
{
    to_email: "customer@example.com",
    customer_name: "John Doe",
    customer_phone: "9876543210",
    services: "1. Dry Cleaning - ₹200.00\n2. Ironing - ₹30.00",
    total_amount: "230.00",
    booking_date: "5/26/2026",
    booking_time: "2:30:45 PM"
}
```

You can customize the email template in EmailJS dashboard using these variables with `{{variable_name}}` syntax.

## Features Explanation

### Cart Management
- **Add Services**: Click "Add Item" to add services to cart
- **Remove Services**: Click "Remove Item" to remove from cart
- **Persistent Storage**: Cart data is saved in browser's localStorage
- **Cart Count**: Updated in real-time in the header

### Booking System
- **Validation**: Email and phone number validation
- **Email Confirmation**: Automatic email sent with booking details
- **Form Reset**: Form clears after successful booking
- **Cart Clear**: Cart empties after successful booking

### Services Available
1. **Dry Cleaning** - Premium garment care (₹200)
2. **Wash & Fold** - Standard washing service (₹100)
3. **Ironing** - Professional pressing (₹30)
4. **Stain Removal** - Specialized cleaning (₹500)
5. **Leather & Suede Cleaning** - Delicate fabric care (₹999)
6. **Wedding Dress Cleaning** - Premium service (₹2800)

## Troubleshooting

### Emails Not Sending
1. **Check Public Key**: Verify it's correctly set in `emailjs.init()`
2. **Check Service/Template IDs**: Ensure they match EmailJS dashboard
3. **Check Console**: Open browser DevTools (F12) → Console for error messages
4. **Verify Email Service**: Ensure Gmail service is properly connected
5. **Check Spam Folder**: Confirmation emails might be in spam

### Cart Not Persisting
- Check if localStorage is enabled in browser
- Try opening in incognito/private mode to test

### Form Validation Errors
- **Email**: Must be valid format (user@example.com)
- **Phone**: Must be 10 digits
- **Name**: Cannot be empty

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 14+)
- IE11: Not supported

## Customization Guide

### Change Colors
Edit `styles.css` CSS variables:
```css
:root {
    --primary-color: #e85d75;      /* Pink/Red accent */
    --secondary-color: #3b82f6;    /* Blue primary */
    --text-dark: #1f3a52;
    --text-light: #566470;
    --bg-light: #f8fafb;
}
```

### Add More Services
Edit `script.js` services array:
```javascript
const services = [
    // Existing services...
    { id: 7, name: "Shoe Cleaning", price: 150, icon: "👟" },
    { id: 8, name: "Blanket Washing", price: 250, icon: "🛏️" }
];
```

### Modify Service Prices
Update the price in services array:
```javascript
{ id: 1, name: "Dry Cleaning", price: 250, icon: "🧥" }  // Changed from 200 to 250
```

## Security Notes

- **Public Key Safe**: The public key shown in EmailJS is designed to be public
- **No Backend Needed**: EmailJS handles email sending securely
- **CORS Enabled**: EmailJS is CORS-enabled for web applications
- **Rate Limiting**: EmailJS has rate limits (check pricing for details)

## Support

For EmailJS issues, visit: https://www.emailjs.com/docs/
For general web development: MDN Web Docs (https://developer.mozilla.org/)

## License

This project is open source and available for educational purposes.

---

**Last Updated**: May 26, 2026
**Version**: 1.0.0