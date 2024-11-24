This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# KYC Form (Know Your Client)

## 📖 Overview

This project is designed to quickly and smoothly gather basic information from a given client. It provides an interactive user interface for collecting identity, contact, and financial details while ensuring input validation.

Link to test website: [KYC Form](https://kyc-rr-digital.vercel.app/) 

## Development Process

The project leverages GitHub Copilot and ChatGPT as powerful tools to enhance development efficiency and code quality.

GitHub Copilot: Assisted in generating boilerplate code, reusable functions, and improving productivity during repetitive coding tasks.

ChatGPT: Helped with designing user-friendly error validation logic, improving code readability, and providing detailed documentation and comments.

By integrating these tools into the workflow, this project was built faster while maintaining a focus on clarity, usability, and robust validation features.

## 🚀 Features

Multi-step form for collecting user information.

Real-time validation for fields like email, phone number, and more.

Error handling with user-friendly messages.

Responsive design for better usability across devices.

## 🛠️ How to Run It Locally

### Prerequisites
1.) Node.js installed (version 18.18 or later required).

2.) A package manager like npm or yarn.

## Getting Started

## Steps
### 1.) Clone the Repository:
 ```
 git clone https://github.com/your-username/your-repo-name.git
```

Replace your-username and your-repo-name with the appropriate GitHub details.

### 2.) Navigate to the Project Directory:
```
cd your-repo-name
```

### 3.) Install Dependencies: Run the following command to install all required packages:
```
 npm install
```
or
```
yarn install
```

### 4.) Start the Development Server: To start the project locally:
```
 npm run dev
```
or
```
yarn dev
```

### 5.) Access the Application: Open your browser and go to:
```
http://localhost:3000
```

## 📚 Additional Libraries/Tools Used
React: For building the UI and managing component state.

Next.js: Framework for React that includes server-side rendering and routing.

CSS Modules: For scoped and maintainable styling.

Utility Libraries:

    isValidEmail: Custom utility to validate email addresses.
    
    containsLetters: Function to check for letters and invalid symbols in phone numbers.
    
    taxIdFormatter: Formats tax IDs for user display.
    
    formatPhoneNumberFlexible: Flexible phone number formatter.
    
Icons/Styling: You can replace or extend styles using the styles object imported from page.module.css.

## 🛡️ Notes

This project was built using the 'use client' directive for client-side rendering.

The form includes built-in validation, but you can customize the logic in the sectionChecks function located in the main component.
