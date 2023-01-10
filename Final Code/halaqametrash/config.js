// import Staff from "./models/Staff";

const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema(
  {
    staffNo: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isCoordinator: { type: Number },
    halaqa: { type: String },
  },
  {
    timestamps: true,
  }
);
const Staff = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);

console.log(Staff);

if (!mongoose.connections[0].readyState) {
  mongoose.connect(
    'mongodb://localhost:27017/halaqa?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
    {
      useNewUrlParser: true,
    }
  );
}

Staff.create({
  staffNo: 1,
  username: 'admin',
  firstName: 'admin',
  lastName: 'admin',
  email: 'coordinator@halaqa.com',
  password: 'admin',
  isCoordinator: 1,
  halaqa: 'admin',
});

Staff.create({
  staffNo: 2,
  username: 'teacher123',
  firstName: 'teacher',
  lastName: 'halaqa',
  email: 'teacher@halaqa.com',
  password: 'teacher',
  isCoordinator: 0,
  halaqa: 'teacher',
});
Staff.create({
  staffNo: 3,
  username: 'teacher124',
  firstName: 'teacher2',
  lastName: 'halaqa',
  email: 'teacher2@halaqa.com',
  password: 'teacher',
  isCoordinator: 0,
  halaqa: 'teacher',
});

console.log(Staff);
console.log('done');
