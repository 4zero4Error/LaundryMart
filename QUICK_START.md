# Quick Start Guide - LaundryMart Setup in 5 Minutes

## Step 1: Get EmailJS Keys (2 minutes)

1. Go to https://www.emailjs.com/
2. Sign up for free → Verify email
3. Go to **Email Services** → Connect Gmail
4. Go to **Email Templates** → Note your IDs
5. Go to **Account** → Copy your **Public Key**

Your keys will look like:
```
Public Key:  dGu3s8kL9pQ4mN2jR8vX_xxxxx
Service ID:  service_a1b2c3d4e5f6g7h8
Template ID: template_booking
```

## Step 2: Update script.js (2 minutes)

Open `script.js` on **Line 2** and replace:
```javascript
emailjs.init("YOUR_PUBLIC_KEY_HERE");
```
With your actual public key from above.

Then update **Line 74** and replace:
```javascript
await emailjs.send("YOUR_SERVICE_ID_HERE", "YOUR_TEMPLATE_ID_HERE", emailParams);
```
With your Service ID and Template ID.

## Step 3: Create EmailJS Template (1 minute)

In EmailJS Dashboard → Email Templates → Create New:

**Template content:**
```
Dear {{customer_name}},

Thank you for booking at LaundryMart!

📋 Booking Details:
- Date: {{booking_date}}
- Services: {{services}}
- Total: ₹{{total_amount}}

We'll contact you at {{customer_phone}} for pickup details.

Best regards,
LaundryMart Team
```

## Done! 🎉

Your application is now ready to use:

- 🛒 Add/remove services
- 💾 Cart saves automatically
- 📧 Emails send on booking
- 📱 Works on all devices

### Test It:
1. Open `index.html` in browser
2. Add services to cart
3. Fill booking form
4. Click "Book now"
5. Check your email for confirmation!

---

**Need Help?**
- Check browser console (F12) for errors
- Verify Public/Service/Template IDs match exactly
- Ensure Gmail service is connected in EmailJS
- Check spam folder for emails