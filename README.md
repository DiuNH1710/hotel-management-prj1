# 🏨 Hotel Management System

A full-stack hotel management system built with **Node.js** for the backend and **React.js** for the frontend. The system allows efficient management of hotel operations such as room booking, customer information, employee tracking, and reports.

## 📁 Project Structure

hotel-management/
├── backend/ # Node.js + Express backend (with MySQL)
└── frontend/ # React.js frontend
![image](https://github.com/user-attachments/assets/33c560a3-78f3-4127-9706-be75ad58d475)
.images/homepage.png




## 🚀 Features

- Room and customer management
- Booking, check-in/check-out workflow
- Staff performance and scheduling
- Revenue & occupancy reporting
- Dashboard with real-time data
- (Optional) Multi-language support

## 🛠️ Technologies Used

- **Frontend:** React.js, Axios, React Router
- **Backend:** Node.js, Express.js, MySQL
- **Others:** Sequelize (ORM)

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/DiuNH1710/hotel-management-prj1.git
cd hotel-management-prj1
2. Set Up the Database (MySQL)
Create a MySQL database (e.g., hotel_db)

Update the .env file in the backend/ folder with your MySQL config:

env

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=yourpassword
DB_NAME=hotel_db

3. Start the Backend

cd backend
npm install
npm run dev
The backend server will start on http://localhost:5000 (or your configured port).

4. Start the Frontend
Open a new terminal:


cd frontend
npm install
npm run dev

The frontend will run at http://localhost:5173.

## 📸 Screenshots & Demonstration Steps

![Home UI](https://raw.githubusercontent.com/DiuNH1710/hotel-management-prj1/main/images/homepage.png)


![Services UI](./images/services_module.png)

Booking Module
![image](https://github.com/user-attachments/assets/9207e663-74d2-4af4-8e74-f4e1e46566eb)

![image](https://github.com/user-attachments/assets/6d74e6fc-f72a-48bf-b63b-8ce687899085)

Customer Module
![image](https://github.com/user-attachments/assets/74bd195c-1260-40bd-8441-23087a43eecd)

![image](https://github.com/user-attachments/assets/dc49ef52-24d8-4820-83f0-d4dfe14c9746)

Employee Module & work schedules Module
![image](https://github.com/user-attachments/assets/7c4ff469-d4d2-47dc-80be-8c63e35cb2c6)

![image](https://github.com/user-attachments/assets/cf929e83-8f27-498e-8c81-ae84dc672c11)

![image](https://github.com/user-attachments/assets/eb90bcbc-52b3-4f83-826f-f6bc61f1f2f0)

Invoices Module
![image](https://github.com/user-attachments/assets/c32206b4-d2a2-4d2f-913e-50258a28c777)

![image](https://github.com/user-attachments/assets/82761f75-c32f-4b9d-833b-d410891693af)

Room Module
![image](https://github.com/user-attachments/assets/0f8defd2-9e8c-4564-9466-01a0e76bc931)

![image](https://github.com/user-attachments/assets/cff82115-3cab-46c3-a803-366c4986655d)

Services Module
![image](https://github.com/user-attachments/assets/a6bdbfaf-d91f-4589-8bd5-ec25c4468db7)

![image](https://github.com/user-attachments/assets/bc8b4f8d-dd18-4824-a367-aa98454d8fb6)



🧪 Future Improvements
Unit testing with Jest and React Testing Library

CI/CD with GitHub Actions

Error boundaries and better error handling

Accessibility improvements

PWA support for offline usage

Internationalization with react-i18next

📄 License
This project is licensed under the MIT License.
