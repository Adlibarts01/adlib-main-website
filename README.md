# Adlib Main Website

This repository contains the source code for the Adlib main website, built with modern web technologies and using Bun as the JavaScript runtime.

## Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Adlibarts01/adlib-main-website
cd adlib-main-website
```

2. Install dependencies using Bun:

```bash
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Update the values in the `.env` file with your own configuration.

## Usage

### Development Server

Run the development server:

```bash
bun run dev
```

Visit `http://localhost:3000` to view the website.

### Building for Production

Build the project for production:

```bash
bun run build
```

### Running Tests

Execute tests:

```bash
bun test
```

## Project Structure

```
adlib-main-website/
├── public/        # Static assets
├── src/           # Source code
├── tests/         # Test files
├── package.json   # Project dependencies and scripts
└── README.md      # This file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

