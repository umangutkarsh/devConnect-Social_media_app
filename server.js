const express = require('express');
const connectDB = require('./config/db');
// const path = require('path');

// const userRoute = require('./routes/api/users');
// const authRoute = require('./routes/api/auth');
// const profileRoute = require('./routes/api/profile');
// const postsRoute = require('./routes/api/posts');

const app = express();

app.get('/', (req, res) => res.send('API running'));

// Connect Database
connectDB();

// Init middleware
// { extended: false }
// app.use(express.json());


// Define Routes
// app.use('/api/users', userRoute);
// app.use('/api/auth', authRoute);
// app.use('/api/profile', profileRoute);
// app.use('/api/posts', postsRoute);


// // Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});