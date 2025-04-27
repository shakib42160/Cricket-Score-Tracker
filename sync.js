const { sequelize } = require('./models');

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // force:true drops and recreates tables
    console.log('✅ All models synced successfully.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error syncing models:', error);
    process.exit(1);
  }
};

syncDatabase();
