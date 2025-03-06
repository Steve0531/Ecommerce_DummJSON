# **E-Commerce Admin Dashboard**

## **Project Overview**

Developed an admin panel where users can manage products, carts, users, orders, recipes, posts, comments, and quotes using the **DummyJSON API**.

## **Core Features**

### **1. Authentication (Auth API)**

- Implemented a login page using **React Hook Form** for form validation.
- Handled failed login attempts with proper error messages.
- Stored authentication tokens using **Zustand**.
  
![Screenshot 2025-03-06 194607](https://github.com/user-attachments/assets/31a7a461-f333-4449-9dea-73b814e0db28)

---

### **2. Product Management**

- Displayed all products (GET `/products`)
- Implemented **search and filter functionality** using **useState**
- Implemented Add, edit, and delete products using the **API**.
- Performed Form validation with **React Hook Form**.
- UI using **Material UI**

  ![Screenshot 2025-03-06 194920](https://github.com/user-attachments/assets/0fbd824f-49e2-4a80-bb75-de8c6c2303bb)


---

### **3. Cart Management (Admin Perspective)**

- Fetched cart data (GET /carts).
- Added items to the cart (POST /carts/add).
- Removeed items from the cart.
- Displayed cart summary with total price calculations.
- Used Zustand to maintain global cart state.

  ![Screenshot 2025-03-06 194959](https://github.com/user-attachments/assets/2a38e240-4bc7-4cf8-8656-ba57eddedc15)


---

### **4. User Management**

- Fetched all users (GET `/users`).
- Displayed user details (GET `/users/{id}`).
- Implemented **search and filtering**.
- Admin can edit user details.

  ![Screenshot 2025-03-06 194754](https://github.com/user-attachments/assets/f66c6b49-9946-40a7-aad3-41a29e482549)



---

### **5. Order Management**

- Fetched all orders (GET `/carts` as order history).
- Displayed order details and associated users.
- Implemented **order status update** feature.

  ![Screenshot 2025-03-06 194902](https://github.com/user-attachments/assets/7127c119-a6dc-4206-b003-0d874bb1e9bb)


---

### **6. Blog & Comments Section**

- Fetched posts (GET `/posts`).
- Displayed post details (GET `/posts/{id}`).
- Fetched comments for a post (GET `/comments`).
- Can add new comments (POST `/comments/add`).
- Used **Zustand** to manage user comments globally.

  ![Screenshot 2025-03-06 195017](https://github.com/user-attachments/assets/1628bae6-782a-49e8-836a-b2fbf085777b)


---

### **7. Quotes & Recipes**

- Fetched motivational quotes (GET `/quotes`).
- Fetched recipes (GET `/recipes`).
- Displayed quotes and recipes on a dashboard.


---

## **Stretch Goals (Optional)**

- Implemented **Dark Mode** using `useContext` and `useTheme` from Material UI
- Added **pagination** for large datasets
- Added **user role management** for restricting actions like add, edit or delete product and more...

  **Below is the ScreenShot of a User Logged-In with theme set to light**

  ![Screenshot 2025-03-06 195050](https://github.com/user-attachments/assets/0d9e2212-3839-47d1-947e-6e5b2e61478f)


---
