
# LaundryMart Booking Website

A simple, beginner-friendly laundry service booking website!

## What the Website Does:
1. Shows laundry services you can add to a cart
2. Lets you fill out a booking form
3. Sends a confirmation email (if you set up EmailJS)
4. Saves your cart if you refresh the page
5. Has a newsletter sign-up form

---

## How to Run the Website (No Setup Needed for Basic Use!)
1. Just open `index.html` in any web browser!
2. You can add items to the cart and test the forms!

---

## How to Set Up EmailJS (So It Actually Sends Emails!)

EmailJS is a free tool that lets you send emails from a website without a server. Here's how to set it up step by step:

### Step 1: Create an EmailJS Account
1. Go to https://www.emailjs.com/ and click "Sign Up Free"
2. Make a new account (use your regular email)

### Step 2: Add an Email Service
1. After logging in, click "Email Services" from the menu on the left
2. Click the blue "Add New Service" button
3. Choose an email provider (Gmail is easy!)
4. Follow the instructions to connect your email
5. When you're done, you'll see a "Service ID" - copy this and save it somewhere safe!

### Step 3: Create a Booking Email Template
1. Click "Email Templates" from the menu on the left
2. Click the blue "Create New Template" button
3. Design your email! You can use these special tags that will automatically fill in:
   - `{{customer_name}}` – the user's name
   - `{{email}}` – the user's email
   - `{{phone}}` – the user's phone number
   - `{{services}}` – the list of services they booked
   - `{{total_amount}}` – the total price
   - `{{confirmation_number}}` – a unique booking number
   - `{{message}}` – a full summary of the booking
4. In the "To Email" box, type the email you want to receive the booking confirmations (can be your own email!)
5. Click "Save" - you'll get a "Template ID" - copy this and save it too!

### Step 4: Get Your Public Key
1. Click on your name in the top right corner of EmailJS
2. Select "Account"
3. Copy your "Public Key" (it's a long string of letters and numbers)

### Step 5: Update the Website Files!
1. Open `index.html` in a text editor (like Notepad, VS Code, etc.)
2. Find the line that says `publicKey: "YOUR_EMAILJS_PUBLIC_KEY"`
3. Replace `YOUR_EMAILJS_PUBLIC_KEY` with your actual Public Key from EmailJS
4. Save `index.html`!

5. Now open `script.js`
6. Find the line that says `emailjs.send('YOUR_SERVICE_ID', 'YOUR_BOOKING_TEMPLATE_ID', templateParams)`
7. Replace `YOUR_SERVICE_ID` with your Service ID from Step 2
8. Replace `YOUR_BOOKING_TEMPLATE_ID` with your Template ID from Step 3
9. Save `script.js`!

That's it! Now when someone books a service, you'll get an email!

---

## About the Newsletter Form
The newsletter form currently just shows a "Thank you" alert. If you want it to send emails too:
1. Make another Email Template (like you did in Step 3)
2. In `script.js`, add code for the newsletter (you can use the booking email as an example!)

---

## File Descriptions
- `index.html` – The main webpage
- `script.js` – All the interactive code (adding to cart, forms, etc.)
- `styles.css` – Makes the website look nice
- `README.md` – This file!


