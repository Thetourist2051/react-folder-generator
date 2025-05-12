
<h1 align="center">🚀 Component Generator CLI</h1>

<p align="center">A powerful Node.js CLI tool to scaffold React components with flexible architecture options.</p>

---

## ✨ Features

- ⚙️ Supports **JavaScript (.jsx)** and **TypeScript (.tsx)**
- 🎨 Multiple styling options: **CSS, SCSS, CSS Modules, SCSS Modules**
- 🛡 Scoped styling capability
- 📁 Configurable folder structure
- ✅ Input validation and overwrite protection

---

## 📋 Prerequisites

### 🖥 System Requirements
- Node.js **≥16.0.0**
- npm **≥7.0.0** or **yarn**

### 📦 Project Dependencies

| Feature       | Required Packages              |
|---------------|--------------------------------|
| TypeScript    | `typescript`, `@types/react`   |
| SCSS          | `sass`                         |
| CSS Modules   | Build tool configuration       |

---

## 🛠 Installation

```bash
npm install -g react-folder-generator
# or for project-specific
npm install react-folder-generator --save-dev
```

---

## 🗂 Folder Structure Conventions

### 📌 Naming Patterns

**Kebab-case (Recommended)**

```
src/components/my-component/
├── index.tsx
├── index.module.scss
```

**PascalCase**

```
src/components/MyComponent/
├── MyComponent.tsx
├── MyComponent.module.scss
```

**Flat Structure**

```
src/components/
├── MyComponent.tsx
├── MyComponent.module.scss
```

---

## 🎯 Scoped vs Non-Scoped Styles

| Type       | File Pattern        | Usage Scenario         |
|------------|---------------------|-------------------------|
| Scoped     | `ComponentName.ext` | Component-specific      |
| Non-Scoped | `index.ext`         | Shared/global styles    |

---

## 🔍 What is Scoped Styling?

Scoped styling creates component-specific style files following naming patterns like:

📄 **File Naming**

- Component: `Button.tsx`
- Style: `Button.module.scss` (when using `--scoped-style`)

🎯 **Benefits**
- Prevents style leakage
- Explicit component-style association
- Better large-scale project organization

💡 **Example**

```tsx
// Button.tsx
import styles from './Button.module.scss';

const Button = () => (
  <button className={styles.root}>
    Click me
  </button>
);
```

```scss
// Button.module.scss
.root {
  padding: 1rem 2rem;
  background: blue;

  &:hover {
    background: darkblue;
  }
}
```

---

## 💡 Usage Options

### 🔧 Basic Command

```bash
react-folder-generator ComponentName [options]
```

### 🧾 Option Matrix

| Option           | File Pattern        | Requires             |
|------------------|---------------------|----------------------|
| `--ts`           | `.tsx`              | TypeScript           |
| `--scss`         | `.scss`             | `sass`               |
| `--module-scss`  | `.module.scss`      | CSS Modules config   |
| `--scoped-style` | Component-named     | -                    |

---

## 🏗 Example Outputs

### ✅ Standard Component

```bash
react-folder-generator sidebar --scss
```

```
components/
  sidebar/
    ├── index.jsx
    └── index.scss
```

### ✅ Scoped TypeScript Module

```bash
react-folder-generator AuthForm --ts --module-scss --scoped-style
```

```
components/
  auth-form/
    ├── AuthForm.tsx
    ├── AuthForm.module.scss
    └── index.ts
```

---

## ⚙️ Build System Config

### 📦 Webpack CSS Modules Setup

```js
{
  test: /\.module\.scss$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[name]__[local]--[hash:base64:5]'
        }
      }
    },
    'sass-loader'
  ]
}
```


---

## ❓ FAQ

### 🟡 When should I use scoped styles?
Recommended for:
- Large codebases
- Component libraries
- Teams with multiple developers

### 🟡 What's the difference between `index.scss` and `Component.module.scss`?
- `index.scss`: Global/shared styles
- `Component.module.scss`: Locally scoped styles for a component

---

## 👨‍💻 Author

**Afriduzzaman**  
Senior Frontend Engineer  
GitHub [@Thetourist2051](https://github.com/Thetourist2051) | Email [thetourist2051@gmail.com](mailto:thetourist2051@gmail.com)

---

## 📜 License

MIT © 2025 Afriduzzaman

---

> This README follows technical writing best practices for clarity, visual hierarchy, and developer usability.


<p align="center">
  <img src="https://img.shields.io/npm/v/react-folder-generator?color=blue&style=flat-square" alt="npm version" />
</p>

