import Staff from "./Staff";
// create a new staff
// create a random staff member
 await Staff.create({
    staffNo: 1,
    username: "admin",
    firstName: "admin",
    lastName: "admin",
    email: "coordinator@halaqa.org",
    password: "admin",
    isCoordinator: 1,
    halaqa: "admin",
    });