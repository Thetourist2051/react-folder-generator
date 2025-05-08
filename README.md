# Component Generator CLI

A simple Node.js CLI tool to scaffold React component boilerplate with flexible styling options.

## 🚀 Features

- Supports JavaScript (`.jsx`) and TypeScript (`.tsx`)
- Supports multiple styling formats: CSS, SCSS, CSS Modules, SCSS Modules
- Optional scoped styling
- Auto-generates component and style files
- Validates input and prevents overwriting existing components

## 📦 Installation

Make sure you have Node.js installed.

```bash
npm install -g react-folder-generator
```

Or if using locally:

```bash
git clone https://github.com/Thetourist2051/react-folder-generator.git
cd react-folder-generator
npm install
```

## 🔧 Usage

```bash
generate-component <ComponentName> [options]
```

### 📘 Examples

#### Basic Component (JSX + CSS)

```bash
generate-component Button
```

Creates:
- `Button/index.jsx`
- `Button/index.css`

#### TypeScript + SCSS Module + Scoped Style

```bash
generate-component AlertBox --ts --module-scss --scoped-style
```

Creates:
- `AlertBox/AlertBox.tsx`
- `AlertBox/AlertBox.module.scss`

#### JavaScript + SCSS

```bash
generate-component Card --scss
```

Creates:
- `Card/index.jsx`
- `Card/index.scss`

#### TypeScript + CSS Module

```bash
generate-component Modal --ts --module-css
```

Creates:
- `Modal/index.tsx`
- `Modal/index.module.css`

## 🛠 Options

| Option             | Description                                  |
|--------------------|----------------------------------------------|
| `--ts`             | Use TypeScript (`.tsx`)                      |
| `--js`             | Use JavaScript (`.jsx`) (default)            |
| `--css`            | Include plain CSS                            |
| `--scss`           | Include SCSS                                 |
| `--module-css`     | Use CSS Modules                              |
| `--module-scss`    | Use SCSS Modules                             |
| `--scoped-style`   | Use scoped style file with component name    |

> ⚠️ You can only choose one of `--css`, `--scss`, `--module-css`, or `--module-scss` per component.

## 📁 Output Structure

When using:

```bash
generate-component Example --ts --scss --scoped-style
```

It creates:

```
Example/
├── Example.tsx
└── Example.scss
```

## 👤 Author

**Afriduzzaman**  
Experienced Web Developer | React, Angular, Ionic, React Native  
GitHub: [https://github.com/Thetourist2051](https://github.com/Thetourist2051)   
Email: [thetourist2051@gmail.com]

---

## 📝 License

MIT

---

Feel free to contribute or raise issues!