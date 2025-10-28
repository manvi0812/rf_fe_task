# Shipping Cost Calculator

A React-based application to calculate and track shipping costs for boxes sent to different countries. The app allows users to input box details and calculates the shipping cost based on the destination country. Submitted boxes are displayed in a table with proper visualization for color and cost.

---

## Features

- Input details for each box:
  - Receiver Name
  - Weight (in kilograms)
  - Box Color (Hex code)
  - Destination Country
- Calculate shipping cost per box based on country rates.
- Display submitted boxes in a table:
  - Actual box color shown as a color box.
  - Shipping cost formatted in INR.
- Form validation:
  - Required fields.
  - Weight must be positive.
  - Hex color validation.
- Uses **Zustand** for global state management.

---

## Technologies Used

- **React** – Frontend UI
- **Material-UI (MUI)** – UI components
- **Zustand** – State management
- **JavaScript (ES6+)** – Logic and calculations
- **CSS/Inline Styles** – Styling

---

## Installation

1. Clone the repository:

git clone (https://github.com/manvi0812/rf_fe_task.git)

2. Navigate to the project directory:

cd rf_fe_task

3. Install dependencies:

npm install

4. Run the development server:

npm run dev

The app will be available at http://localhost:5173
