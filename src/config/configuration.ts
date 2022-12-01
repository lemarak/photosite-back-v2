// Todo

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI,
    // port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
