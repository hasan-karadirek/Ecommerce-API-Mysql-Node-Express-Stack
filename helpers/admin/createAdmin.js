const Admin = require('../../models/Admin');

const createAdmin = async () => {
  const [, , name, email, password] = process.argv;
  try {
    const admin = await Admin.create({
      name: name,
      email: email,
      password: password,
    });
    console.log('Admin created');
  } catch (error) {
    console.log(error);
  }
};
createAdmin();
