# Lead Management Dashboard (LeadFlow)

A modern, high-performance mini CRM designed for efficient lead tracking, analysis, and management. Built with Next.js 15, TypeScript, and MongoDB.

## 🚀 Overview

LeadFlow is a full-stack dashboard that demonstrates the ability to handle data-heavy applications. It features a robust backend API for searching, filtering, and paginating leads, coupled with a premium, responsive frontend.

## 🛠 Tech Stack

- **Frontend**: Next.js 15+, React 19, TypeScript, Tailwind CSS
- **Visualization**: Recharts
- **Icons**: Lucide React
- **Backend**: Next.js API Routes (Edge compatible)
- **Database**: MongoDB Atlas with Mongoose
- **Data Seeding**: Faker.js

## ✨ Features

- 📊 **Real-time Analytics**: Interactive charts showing lead distribution and conversion rates.
- 🔍 **Advanced Lead Management**: Search, filter by status, and paginate through hundreds of leads.
- 📱 **Mobile Responsive**: Fully optimized for all device sizes.
- 🔐 **Secure Authentication**: Protected dashboard routes with middleware.

## 🏁 Getting Started

### Prerequisites

- Node.js 18.x or later
- MongoDB instance (Local or Atlas)

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Lead-Management-Dashboard.git
   cd Lead-Management-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file:
   | Variable | Description |
   |:---|:---|
   | `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/lead-dashboard?retryWrites=true&w=majority` |
   | `AUTH_TOKEN` | Secret token for middleware auth (default: `authenticated`) |

4. **Seed the Database**
   Populate your database with 500+ realistic dummy leads:
   ```bash
   npm run seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔌 API Documentation

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/api/analytics` | Returns total leads, conversion rates, and growth metrics (Uses Native MongoDB Driver). |
| `GET` | `/api/leads` | Returns paginated list of leads with support for filtering and searching. |

## 🔐 Credentials (Demo)

Use the following credentials to access the dashboard:
- **Email**: `admin@example.com`
- **Password**: `admin123`

## 📁 Project Structure

- `src/app/api`: Backend REST endpoints.
- `src/app/(dashboard)`: Protected frontend pages.
- `src/components`: UI components (Shell, Sidebar, etc.).
- `src/models`: Mongoose schemas.
- `src/scripts`: Database seeding scripts.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

