# Contact Management System
> A full-stack application for managing contacts with React frontend and Node.js backend

## Tech Stack
- Frontend: React + MUI Components
- Backend: Node.js + Express
- Database: PostgreSQL
- API: RESTful API

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- Git

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/contact-management.git
cd contact-management
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
.env

# Update .env with your configuration
DB_USER=username
DB_PASSWORD=password
DB_HOST=hostname
DB_PORT=5432              # Default port for PostgreSQL
DB_DATABASE=dbname
DB_SSL=true/false
```

Start the backend server:
```bash
# Run in development mode
npm run dev

# Run in production mode
npm start

# Seed the database
npm run seed
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

Start the frontend application:
```bash
# Run in development mode
npm run dev

# Build for production
npm run build
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/getContacts | Get all contacts |
| POST   | /api/addContact | Create new contact |
| PUT    | /api/updateContact/:id | Update contact |
| DELETE | /api/deleteContact/:id | Delete contact |



## Available Scripts

In the backend directory:
```bash
npm start       # Run production server
npm run seed    # Seed the database
```

In the frontend directory:
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```


## Features
- Add new contacts with validation
- View contacts in a paginated table
- Sort contacts by any field
- Edit existing contacts
- Delete contacts
- Responsive design with MUI components
- Error handling and validation
- API error messages

## Error Codes
- 400: Bad Request - Invalid input data
- 404: Not Found - Contact not found
- 409: Conflict - Duplicate email
- 500: Server Error - Internal server error

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
MIT License
