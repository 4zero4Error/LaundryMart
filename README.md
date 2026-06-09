# LaundryMart - Web Application Setup Guide
## Setup for Emailjs

## Step 1: Create an Email Service
1.  Log in to your EmailJS dashboard.
2.  Go to **Email Services** and click **Add New Service**.
3.  Connect your email provider (like Gmail).
4.  Note down your **Service ID**.

## Step 2: Create an Email Template
1.  Go to **Email Templates** and click **Create New Template**.
2.  Design your email. You can use the following variables which are already set up in the code:
    *   `{{customer_name}}`: Name of the customer.
    *   `{{email}}`: Customer's email address.
    *   `{{phone}}`: Customer's phone number.
    *   `{{services}}`: List of services booked.
    *   `{{total_amount}}`: Total price of the order.
    *   `{{confirmation_number}}`: Unique booking ID.
    *   `{{message}}`: A formatted summary of the order.
3.  In the **To Email** field, you can put your own email address if you want to receive the order details, or use `{{email}}` to send it to the customer.
4.  Note down your **Template ID**.

## Step 3: Configure the Application
1.  Open `index.html`.
2.  Find the initialization script at the bottom:
    ```javascript
    emailjs.init("YOUR_PUBLIC_KEY");
    ```
    Replace `YOUR_PUBLIC_KEY` with your actual Public Key from the **Account** section of EmailJS.

3.  Open `script.js`.
4.  Find the `handleBookingSubmit` function.
5.  Update the `emailjs.send` call with your Service ID and Template ID:
    ```javascript
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    ```




