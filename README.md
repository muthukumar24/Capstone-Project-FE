# Capstone-Project-FE
# Inventory Management System

The Inventory Management System is a web application designed to manage inventory and orders. It includes functionalities for both admin and user roles, providing a comprehensive system for inventory control and order management.

## Admin Side Functionalities
### Admin Credentials
- Email: adminuser@gmail.com
- Password: Admin@4321
### Products Management
- Admin Home Page
![Admin Page](./Screenshots/Screenshot2024-07-20161441.png)
- **Add a Product**: Admins can add new products to the inventory by providing details such as name, description, location, and price.
![Add a Product](./Screenshots/Screenshot2024-07-20161618.png)
- **Edit a Product**: Admins can edit existing product details.
![Edit a Product](./Screenshots/Screenshot2024-07-20161753.png)
![Edit a Product](./Screenshots/Screenshot2024-07-20161852.png)
- **Delete a Product**: Admins can remove products from the inventory.

### Order Management
- **Set Order Status**: Admins can update the status of orders to "placed," "shipped," "out for delivery," "delivered", "cancelled."
![Set Order Status](./Screenshots/Screenshot2024-07-20162011.png)
### Reports
- **Total Products**: Admins can view the total number of products in the inventory.
- **Total Inventory Value**: Admins can view the total value of the inventory (quantity multiplied by price).
- **Out of Stock Product Count**: Admins can see the count of products that are out of stock.
- **Turnover Rate**: Admins can view the turnover rate based on the orders placed.
- **Alert Notification**: To let the admin know about product stock./Screenshots/levels.
![Reports](./Screenshots/Screenshot2024-07-20162400.png)
### Registered Users
![Registered Users](./Screenshots/Screenshot2024-07-20162126.png)
## User Functionalities
### Registration:
- User navigates to the registration page.
- User enters their firstname, lastname, email and password.
- Click on signup registration will be completed.

### Login:
- User navigates to the login page.
- User enters their email and password.
- Upon successful validation, user will be directed to home page.
### Forgot Password:
- User clicks on the "Forgot Password" link.
- User enters their email.
- Backend generates a password reset token and sends it to the user's email.
- User clicks on the link in the email to reset their password.
- User enters a new password and confirms it.
- Backend updates the user's password.
### User Home Page
![ProGoods Inventory Home Page](./Screenshots/HomePage.png)
### Products
- **View Products**: Users can browse through the available products in the inventory menu.
![Inventory Products](./Screenshots/Screenshot2024-07-20155608.png)
- **Buy Products**: Users can purchase products using cash on delivery and card as payment methods.
![Buy Now Page](./Screenshots/Screenshot2024-07-20155830.png)
- Card Payement Method
![Buy Now Page Card Payement Method](./Screenshots/Screenshot2024-07-20160033.png)
- Cash On Delivery Method
![Buy Now Page Cash On Delivery Method](./Screenshots/Screenshot2024-07-20160202.png)

### Orders
![orders page](./Screenshots/Screenshot2024-07-20160306.png)

- **Edit Orders**: Users can edit their orders.
![Edit Orders](./Screenshots/Screenshot2024-07-20160437.png)
- **Delete Orders**: Users can delete their orders.
![Delete Order](./Screenshots/Screenshot2024-07-20161056.png)
![After Delete](./Screenshots/Screenshot2024-07-20161134.png)
- **Track Orders**: Users can track the status of their orders under the order menu.
![Track Orders](./Screenshots/Screenshot2024-07-20160537.png)

## Technologies Used
- HTML
- CSS
- React.js
- Node.js
- Express.js
- MongoDB

Thankyou.