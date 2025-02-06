# Cloudfly App

This project is a cloud-based file storage and sharing site built with the MERN stack (MongoDB, Express, React, Node.js).

## Installation

- Install dependencies
```bash
# Install dependencies for frontend
cd frontend
npm install

# Go back to the root
cd ..

# Install dependencies for backend
cd backend
npm install
```

- Create .env file in the backend directory
```ini
NODE_ENV=development
PORT=5000  

BASE_URL=http://localhost:5000  
FRONTEND_URL=http://localhost:5173  

# mongodb connection
MONGO_URI=your_mongo_database_url

# google oauth configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=your_google_callback_url

# jwt configuration
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=your_jwt_expiration

# session configuration
SESSION_SECRET=your_session_secret

# encryption configuration
ENCRYPTION_KEY=your_encryption_key_for_file_encryption

# nodemailer (Email service provider is Gmail)
EMAIL_SERVICE_EMAIL=your_google_email_address
EMAIL_SERVICE_PASSWORD=your_app_password_here
```

- Create .env.local file in the frontend directory
```ini
VITE_BASE_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:5000
```

- Start application
```bash
# Start frontend
cd frontend
npm run dev

# Open a new terminal

# Start backend
cd backend
npm run dev
```

## Features

- Login/Register
- Google OAuth with Passport.js
- Forgot/Reset password
- Edit your profile photo/name/password
- Account deletion
- Folder creation
- Store files on the server by encrypting them
- View file details
- File/Folder rename
- File/Folder move
- Set files as public/private
- Star/Unstar file/folder
- File search
- Trash bin
- File selection
- Selection rectangle

## Screenshot

![Drive page](/frontend/src/assets/drive_view.png)

## Contributing

If you'd like to contribute to this project, feel free to fork it and send a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
