# AI-SUPERMARKET 🛒

A modern e-commerce platform built with Next.js that combines traditional shopping features with AI-powered product insights.

## ✨ Features

- 🛍️ **Product Catalog**: Browse through various categories including fruits, vegetables, dairy, meat, and more
- 🎯 **Smart Product Display**: Each product comes with detailed information and AI-generated interesting facts
- 🛒 **Shopping Cart**: Easy-to-use cart system with quantity management
- 💰 **Discount System**: Automatic price calculations for discounted items
- ⭐ **Rating System**: User reviews and ratings for products
- 🎨 **Responsive Design**: Beautiful UI that works on all devices
- 🤖 **AI Integration**: Google Gemini AI-powered product facts

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Aryan1718/ai-supermarket.git
cd ai-supermarket
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **AI Integration**: Google Gemini AI
- **State Management**: React Context API
- **Image Optimization**: Next.js Image Component

## 🤖 AI Features

The application uses Google Gemini AI to provide interesting facts about products:

- Facts are generated when a user clicks on a product
- Each fact is unique and educational
- Facts are displayed in a dedicated section in the product modal
- Loading states are handled gracefully

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── components/     # React components
│   └── context/        # React context providers
├── lib/                # Utility functions
├── model/              # Database models
└── public/             # Static assets
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/ai-supermarket/issues).

## 📫 Contact

Project Link: [https://github.com/Aryan1718/ai-supermarket](https://github.com/Aryan1718/ai-supermarket)
