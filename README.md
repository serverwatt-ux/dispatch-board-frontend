# Transportation Dispatch Board - Frontend

A modern React-based web application for managing transportation dispatch operations. This application provides a comprehensive dashboard for managing drivers, trips, and fleet operations.

## Features

### 🎯 Core Functionality
- **Dashboard**: Real-time fleet overview with metrics and alerts
- **Add New Driver**: Comprehensive driver registration form with document upload
- **Add New Trip**: Trip scheduling with multiple service types
- **Airport Transfers**: Manage airport transportation bookings
- **Door-to-Door Services**: Schedule and track door-to-door trips
- **Crew Transportation**: Manage airline crew transportation needs
- **Out of Town Trips**: Handle trips beyond Windhoek with RFQ management
- **Reports & Analytics**: Performance and usage statistics

### 🛠️ Technical Features
- **Responsive Design**: Fully responsive UI with mobile support
- **Form Validation**: Comprehensive client-side form validation
- **Real-time Updates**: Live date/time display
- **Dynamic Forms**: Conditional form fields based on selection
- **Error Handling**: User-friendly error messages
- **Tailwind CSS**: Modern, customizable styling

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Main header with user info
│   └── Navigation.jsx      # Sidebar navigation menu
├── pages/
│   ├── Dashboard.jsx       # Main dashboard view
│   ├── AddDriver.jsx       # Driver registration form
│   ├── AddTrip.jsx         # Trip creation form
│   ├── AirportTransfers.jsx
│   ├── DoorToDoorServices.jsx
│   ├── CrewTransportation.jsx
│   ├── OutOfTownTrips.jsx
│   ├── Reports.jsx
│   └── Settings.jsx
├── App.jsx                 # Main app component with routing
├── index.js                # React entry point
└── index.css               # Global styles with Tailwind
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/serverwatt-ux/dispatch-board-frontend.git
   cd dispatch-board-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (one-way operation)

## Form Validations

### Add Driver Form
- Full Name: Required, alphabetic characters only
- Contact Number: Required, valid phone format
- Email: Required, valid email format
- License Number: Required, unique
- License Expiry: Required, must be future date
- Vehicle Details: All required
- Availability: At least one day must be selected
- Emergency Contact: Required fields

### Add Trip Form
- Trip Type: Required
- Start Date & Time: Required
- Pickup & Dropoff Locations: Required
- Passenger Count: Required, minimum 1
- Flight Number: Required for airport transfers
- Destination: Required for out-of-town trips

## API Integration

The frontend is ready to connect with the backend API. Key integration points:

- Driver Management: `/api/drivers`
- Trip Management: `/api/trips`
- Authentication: `/api/auth`

## Configuration

Create a `.env` file in the project root:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@transportationco.com or open an issue on the GitHub repository.

## Roadmap

- [ ] Real-time GPS tracking
- [ ] Driver mobile app integration
- [ ] Advanced reporting and analytics
- [ ] SMS/Email notifications
- [ ] Payment integration
- [ ] Customer mobile app
- [ ] Multi-language support
- [ ] Dark mode theme

## Changelog

### v0.1.0 (Initial Release)
- Initial project setup
- Dashboard with key metrics
- Add Driver form with full validation
- Add Trip form with dynamic fields
- Navigation and routing
- Responsive design implementation
