# Interactive Curriculum Map – Software Development Technician

This project is a **fully interactive curriculum viewer** for the _"Programador Universitario en Informática"_ degree (Software Development Technician) from Universidad Nacional de Santiago del Estero. It visually displays all the courses and their prerequisites across 6 academic modules, with live tracking of course progress.

## 🔧 Technologies Used

- **HTML5** – For semantic structure and layout.
- **CSS3** – Custom styling and responsive design with modern visual effects.
- **JavaScript (ES6)** – Handles interactive logic and data persistence.
- **LocalStorage API** – Saves user progress (regular/approved courses) on the browser.
- **Git & GitHub Pages** – Version control and deployment.

## 📌 Features

- Interactive modules grouped by academic year.
- Each subject has 3 possible states:
  - None (not started)
  - Regular (first click)
  - Approved (second click)
- Locked subjects are greyed out and unlock only when **all correlatives are met**.
- Progress is stored using `localStorage`.
- A visual **counter** shows the number of regular and approved subjects.
- Reset button to clear progress.

- ## 🚀 Deployment

This site is deployed via **GitHub Pages**. To view it live:
https://razzolinik.github.io/MallaInteractivaPUI/

## 📝 License

This project is open for educational purposes.
