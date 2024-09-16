# pdf.slice

## Description

**pdf.slice** is a web application that allows users to upload a PDF file, view all the pages as cards, pick specific pages, and create a new PDF from those selected pages. It's built with React, TypeScript, Vite, Tailwind CSS, and Ant Design for the UI.

## Features

- Upload a PDF and display all its pages as individual cards
- Select specific pages to create a new PDF
- Download the selected pages as a new PDF file
- Easily upload a new PDF via a navbar link to reset the selection

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Ant Design (minimal use)
- **PDF Handling**: Custom logic for PDF page display and manipulation

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sabithmuhammed/pdf-slice.git
   cd pdf.slice
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to:
   ```
   http://localhost:5173
   ```

## Usage

- **Upload a PDF**: Use the upload option on the homepage to upload your PDF file.
- **Pick Pages**: All pages will be displayed as cards. Select the pages you want to include in your new PDF.
- **Download PDF**: After selecting pages, press the "Download" button to create and download the new PDF.
- **Upload a New PDF**: If you want to upload a new PDF, click the "Upload New PDF" link in the navbar.

## Future Improvements

- Add support for rearranging the selected pages
- Implement drag-and-drop functionality for an enhanced user experience
- Optimize the PDF generation for larger files