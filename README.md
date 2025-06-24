# Music Rehearsal Pro

A comprehensive web application for bands and music groups to efficiently manage their rehearsal schedules. Music Rehearsal Pro automatically schedules band rehearsals, sends reminders, tracks attendance, and suggests optimal rehearsal times based on member availability.

## Features

- **User and Band Management**
  - User registration and authentication
  - Band creation and member management
  - Role-based permissions (band leader, member)

- **Rehearsal Scheduling**
  - Create, edit, and delete rehearsal events
  - Recurring rehearsal options
  - Availability management for band members
  - Conflict detection and resolution

- **Automated Scheduling Suggestions**
  - Algorithm to suggest optimal rehearsal times based on member availability
  - Priority-based scheduling preferences

- **Attendance Tracking**
  - RSVP system for rehearsals
  - Attendance history and reporting
  - Absence management and notifications

- **Notification System**
  - Email and in-app notifications for schedule changes
  - Automated reminders (24h, 2h before rehearsals)
  - Custom notification preferences

- **Venue Management**
  - Create and manage rehearsal spaces
  - Track venue availability and equipment
  - Map integration for directions

- **Setlist Integration**
  - Create and manage setlists for rehearsals
  - Track song progress and rehearsal priorities
  - Notes and feedback on rehearsed material

- **Mobile Responsiveness**
  - Fully functional on mobile devices
  - Progressive Web App capabilities

## Technology Stack

### Frontend
- React.js with TypeScript
- Redux Toolkit for state management
- Material-UI for UI components
- Formik with Yup for form validation
- Axios for API communication
- FullCalendar.js for calendar views
- Google Maps API for venue locations

### Backend
- Node.js with Express
- RESTful API with OpenAPI specification
- JWT with refresh tokens for authentication
- Joi for validation
- Sendgrid for email notifications

### Database
- PostgreSQL
- Sequelize ORM
- Redis for caching and performance optimization

### DevOps
- AWS (EC2, RDS) for hosting
- GitHub Actions for CI/CD
- Docker for containerization
- Sentry for error tracking

## Setup and Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL (v12+)
- Redis (v6+)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/dxaginfo/music-rehearsal-pro.git
   cd music-rehearsal-pro
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # In the server directory
   cp .env.example .env
   # Edit .env with your database credentials and other configuration
   ```

4. **Set up the database**
   ```bash
   # In the server directory
   npm run db:create
   npm run db:migrate
   npm run db:seed  # Optional: adds sample data
   ```

5. **Start the development servers**
   ```bash
   # Start the backend server (from server directory)
   npm run dev

   # Start the frontend development server (from client directory)
   npm start
   ```

6. **Access the application**
   - Backend API: http://localhost:8000
   - Frontend: http://localhost:3000

### Docker Setup

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Application: http://localhost:3000
   - API: http://localhost:8000

## Deployment

### AWS Deployment

1. **Set up AWS resources**
   - EC2 instance for application hosting
   - RDS for PostgreSQL database
   - ElastiCache for Redis
   - S3 for static assets

2. **Configure CI/CD with GitHub Actions**
   - Set up secrets in your GitHub repository
   - Push changes to trigger automated deployment

### Other Deployment Options

- **Heroku**: Use the provided `Procfile` and Heroku PostgreSQL add-on
- **Vercel/Netlify**: Deploy the frontend separately with the backend on a separate service

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [FullCalendar.js](https://fullcalendar.io/)
- [Material-UI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Sequelize](https://sequelize.org/)
- [Express.js](https://expressjs.com/)