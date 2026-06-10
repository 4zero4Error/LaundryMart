
# LaundryMart - Complete Setup Guide


## Step-by-Step EmailJS Setup (for Booking Confirmations)

### 1. Create an EmailJS Account
Go to [https://dashboard.emailjs.com/sign-up] sign up for a free account.

### 2. Add an Email Service
1. In your EmailJS dashboard, click **Email Services** in the left menu.
2. Click **Add New Service**.
3. Choose an email provider (like Gmail, Outlook, etc.) and connect it.
4. You will get a **Service ID** - save this! (Looks like `service_xxxxx`)

### 3. Create an Email Template for Bookings
1. Click **Email Templates** in the left menu.
2. Click **Create New Template**.
3. Design your email template. You can use these **variables** that will be filled automatically:
   - `{{customer_name}}` = User's full name
   - `{{email}}` = User's email address
   - `{{phone}}` = User's phone number
   - `{{services}}` = List of services they booked
   - `{{total_amount}}` = Total price of the order
   - `{{confirmation_number}}` = Unique booking ID (like LM123456ABCDEF)
   - `{{message}}` = A formatted summary of the entire order
4. In the **To Email** field:
   - If you want to receive the order details at **your own email**, type your email address here.
   - If you want the **customer** to get the email, type `{{email}}`.


### 4. Get Your Public Key
1. Click your name/avatar in the top right corner of EmailJS.
2. Go to **Account**.
3. Copy your **Public Key** (also called "User ID").



## Set Up Newsletter Email Notifications
 If you want it to send an email, follow these steps:

### 1. Create an Email Template for Newsletter Subscriptions
1. In EmailJS, go to **Email Templates** &gt; **Create New Template**.
2. Design your newsletter subscription confirmation email. You can use these variables:
   - `{{subscriber_name}}` = The user's name
   - `{{email}}` = The user's email address
   - `{{message}}` = A simple message: "New newsletter subscription from [name] ([email])"
3. Click **Save**. You will get a **Newsletter Template ID** - save this!

4. In the `emailjs.send` line, replace:
   - `YOUR_SERVICE_ID` with your **Service ID**
   - `YOUR_NEWSLETTER_TEMPLATE_ID` with your **Newsletter Template ID**

---

## Testing the Setup
1. Open `index.html` in a web browser.
2. Add some services to your cart.
3. Fill in the booking form with your details.
4. Click **Book Now**.
5. You should see:
   - A "Thank you" message below the button
   - A confirmation modal with your order details
6. Check your email (or the customer's email) - you should have received the booking confirmation!

---

