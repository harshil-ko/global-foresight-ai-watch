# Command Operations Dashboard (COD) Interface

## Overview

This is a full-stack web application featuring a military-style Command Operations Dashboard (COD) interface. The application is built with a modern React frontend displaying tactical information, threat indicators, and global conflict monitoring capabilities, backed by an Express.js server with PostgreSQL database integration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack React Query for server state
- **Routing**: React Router for client-side navigation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js 20
- **Database**: PostgreSQL 16 with Drizzle ORM
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions
- **Development**: Hot reloading with Vite middleware integration

### Data Storage
- **Primary Database**: PostgreSQL with Drizzle ORM (Active)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Database Storage**: DatabaseStorage class replacing in-memory storage
- **Database Provider**: Replit PostgreSQL instance

## Key Components

### Military-Themed UI Components
- **TacticalHUD**: Full-screen heads-up display with corner brackets and system status
- **ThreatIndicator**: Color-coded threat level indicators with blinking alerts
- **RadarDisplay**: Circular radar interface showing threat positions
- **GlobalMap**: Interactive world map with conflict zone markers
- **MilitaryButton**: Custom button component with military styling
- **CODInterface**: Main dashboard component integrating all tactical elements

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Extensible Design**: Schema ready for additional tables (conflicts, threats, intelligence)

### API Structure
- **RESTful Design**: Express routes with `/api` prefix
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations
- **Error Handling**: Centralized error handling middleware

## Data Flow

1. **Client Request**: React components make API calls using TanStack Query
2. **Server Processing**: Express routes handle requests using storage interface
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: Structured JSON responses with error handling
5. **UI Updates**: React Query manages caching and UI state updates

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **class-variance-authority**: Utility for component variants

### Development Tools
- **Vite**: Build tool with HMR and optimization
- **TypeScript**: Type safety across the stack
- **ESBuild**: Fast bundling for production
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Reloading**: Full-stack hot reloading support
- **Database**: PostgreSQL via Replit or Neon Database

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: ESBuild bundles server code for Node.js
- **Database**: Production PostgreSQL with connection pooling
- **Deployment**: Replit autoscale deployment target

### Environment Configuration
- **PORT**: Server port (default: 5000)
- **DATABASE_URL**: PostgreSQL connection string
- **NODE_ENV**: Environment detection for development/production modes

## Changelog

- June 26, 2025: Initial setup
- June 26, 2025: Added PostgreSQL database integration with DatabaseStorage class

## User Preferences

Preferred communication style: Simple, everyday language.