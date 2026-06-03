require('dotenv').config();

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const { syncDatabase } = require('./models');

// Routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const mathRoutes = require('./routes/math');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// ============ VIEW ENGINE ============
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ============ MIDDLEWARE ============
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// ============ ROUTES ============
app.get('/', (req, res) => res.redirect('/auth/login'));

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/math', mathRoutes);
app.use('/products', productRoutes);

// ============ SERVER ============
syncDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});