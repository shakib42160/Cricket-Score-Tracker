const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const { sequelize } = require('./models'); // ✅ VERY IMPORTANT
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Handlebars
const hbs = exphbs.create({});

// Middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup
app.use(
  session({
    store: new pgSession({
      conObject: {
        connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      },
      tableName: 'Sessions',
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }, // 1 hour
  })
);

// Routes
app.use(routes);

// Sync DB and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
