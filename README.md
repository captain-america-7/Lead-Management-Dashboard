# Lead Management Dashboard

A modern, high-performance Lead Management Dashboard built with Next.js, TypeScript, and MongoDB.

## Features

- 📊 **Lead Overview**: Track and manage leads through different stages (New, Contacted, Qualified, Converted, Lost).
- 🔍 **Search & Filter**: Quickly find leads by name, email, or status.
- 📱 **Responsive Design**: Fully responsive UI for desktop and mobile access.
- 🔐 **Authentication**: Secure login system for team members.
- 🚀 **Next.js 15+**: Built using the latest Next.js App Router for optimal performance.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Styling**: Vanilla CSS / Tailwind (if applicable)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Lead-Management-Dashboard.git
   cd Lead-Management-Dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and update the values.
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable UI components.
- `src/models`: Mongoose database schemas.
- `src/lib`: Utility functions and database connection logic.

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

