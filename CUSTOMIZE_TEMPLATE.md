# 🎨 How to Customize Your Question Paper Template

This guide will help you customize the template to match your exact requirements.

## 📁 Template Files Location

All template files are in the `components` folder:

```
components/
  ├── QuestionPaperTemplate.jsx  ← Main paper layout
  ├── Section.jsx                  ← Section (A, B, C) layout
  └── QuestionItem.jsx            ← Individual question layout
```

## 🎯 Quick Customization Guide

### 1. QuestionPaperTemplate.jsx
**Controls:** Overall paper layout, header, instructions, footer

**What you can change:**
- Header design and layout
- Paper title style
- Instructions box
- Footer format
- Overall spacing and margins
- Background colors
- Fonts and text sizes

**Example changes:**
```jsx
// Change header background
<div className="bg-blue-100 p-4">  // Add background color

// Change title size
<h1 className="text-4xl font-bold">  // Make bigger

// Add custom styling
<div style={{ border: '2px solid black' }}>  // Inline styles
```

### 2. Section.jsx
**Controls:** How sections (A, B, C) are displayed

**What you can change:**
- Section header style
- Section borders and colors
- How total marks are displayed
- Spacing between sections
- Section background colors

**Example changes:**
```jsx
// Change section header background
<div className="bg-gray-200 p-3">  // Add background

// Change border style
<div className="border-4 border-blue-500">  // Thicker, colored border

// Change section title
<h2 className="text-2xl text-red-600">  // Bigger, colored text
```

### 3. QuestionItem.jsx
**Controls:** How individual questions are displayed

**What you can change:**
- Question number style
- Question text formatting
- How marks are displayed
- Borders around questions
- Background colors
- Answer space lines

**Example changes:**
```jsx
// Add border around question
<div className="border-2 border-gray-300 p-3">  // Box around question

// Change question number style
<span className="text-2xl text-blue-600 font-bold">  // Bigger, colored

// Add answer space
<div className="h-12 border-b border-dashed mt-2"></div>  // Answer lines
```

## 🎨 Common Customizations

### Change Colors
```jsx
// Use Tailwind CSS color classes
className="bg-blue-500 text-white"      // Blue background, white text
className="text-red-600"                // Red text
className="border-green-400"            // Green border
```

### Change Fonts
```jsx
// Use Tailwind font classes
className="font-serif"                   // Serif font
className="font-mono"                   // Monospace font
className="text-2xl"                    // Larger text
```

### Add Borders
```jsx
className="border-2 border-black"       // 2px black border
className="border-l-4 border-blue-500" // Left border only
className="border-t border-dashed"     // Dashed top border
```

### Add Spacing
```jsx
className="p-4"                         // Padding all sides
className="mb-6"                        // Margin bottom
className="space-y-4"                   // Vertical spacing between children
```

## 📝 Step-by-Step Customization

### Step 1: Open the File
Open the component file you want to customize (e.g., `QuestionItem.jsx`)

### Step 2: Find the Section
Look for comments like `// CUSTOMIZE THIS` or the section you want to change

### Step 3: Modify the Code
Change the className, add styles, or modify the structure

### Step 4: Save and Test
- Save the file
- The page will auto-reload (if dev server is running)
- Check http://localhost:3000/template-preview to see changes

## 🎯 Template Structure

```
QuestionPaperTemplate
  ├── Header (Title, Date, Time, Marks)
  ├── Instructions Box
  ├── Section A
  │   ├── Section Header
  │   └── Questions (Q1, Q2, ...)
  ├── Section B
  │   ├── Section Header
  │   └── Questions (Q11, Q12, ...)
  ├── Section C
  │   ├── Section Header
  │   └── Questions (Q16, Q17)
  └── Footer
```

## 💡 Customization Ideas

### Modern Style
- Use rounded corners: `rounded-lg`
- Use soft colors: `bg-blue-50`, `text-gray-700`
- Add shadows: `shadow-lg`

### Traditional Style
- Use black borders: `border-black`
- Use serif fonts: `font-serif`
- Use formal layout with tables

### Minimal Style
- Remove borders
- Use simple spacing
- Minimal colors

### Colorful Style
- Add colored sections
- Use gradient backgrounds
- Color-code by section

## 🔧 Advanced Customization

### Add Custom CSS
Create a CSS file and import it:
```jsx
import './custom-styles.css';
```

### Use Inline Styles
```jsx
<div style={{ 
  backgroundColor: '#f0f0f0',
  padding: '20px',
  border: '2px solid #000'
}}>
```

### Conditional Styling
```jsx
className={`base-class ${condition ? 'extra-class' : ''}`}
```

## 📚 Resources

- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **React Styling:** https://react.dev/learn#adding-styles

## ✅ Testing Your Changes

1. Make changes to the component file
2. Save the file
3. Go to http://localhost:3000/template-preview
4. See your changes immediately
5. Generate a paper to see it with real questions

## 🆘 Need Help?

- Check the comments in each file (they show what to customize)
- Look at Tailwind CSS documentation for styling options
- Test changes in the preview page first
- Keep a backup of working code

---

**Remember:** Questions are automatically fetched from your database and displayed in whatever format you design!

