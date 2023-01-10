import connectMongo from '../../../middleware/mongoose';
import Staff from '../../../models/Staff';
import Parent from '../../../models/Parent';
var jwt = require('jsonwebtoken');
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function validate(req, res) {
  //Connect to mongoDB
  await connectMongo();
  let Staffs = await Staff.find();
  let Parents = await Parent.find();

  let allUsers = [...Staffs, ...Parents];
  let emails = [];
  allUsers.forEach((user) => emails.push(user.email));

  //If request is for coordinator
  if (!emails.includes(req.body.email)) {
    res.status(404).json({
      success: false,
      message: 'No user registered with the given email!',
    });
  } else {
    if (req.body.email === 'coordinator@halaqa.com') {
      const coordinator = await Staff.findOne({
        isCoordinator: 1,
      });
      //If coordinator
      if (coordinator) {
        if (
          coordinator.email == req.body.email &&
          coordinator.password == req.body.password
        ) {
          //Get the JWT token for director
          var token = jwt.sign(
            {
              username: coordinator.username,
              role: 'coordinator',
            },
            '__jwt__config__secret__',
            {
              expiresIn: '1d',
            }
          );

          res.status(200).json({
            success: true,
            token,
            role: 'coordinator',
            email: coordinator._doc.email,
            firstName: coordinator._doc.firstName,
            lastName: coordinator._doc.lastName,
            username: coordinator._doc.username,
            staffId: coordinator._doc.staffNo,
          });
        }
        //If the director credentials doesnt match
        else {
          res
            .status(400)
            .json({ success: false, message: 'Invalid credentials!' });
        }
      }
    } else {
      let teacher = await Staff.findOne({ email: req.body.email });
      if (teacher) {
        //Check if req director credentials are correct & matching
        if (
          teacher.email == req.body.email &&
          teacher.password == req.body.password
        ) {
          //Get the JWT token for director
          var token = jwt.sign(
            {
              username: teacher.username,
              role: 'teacher',
            },
            '__jwt__config__secret__',
            {
              expiresIn: '1d',
            }
          );
          res.status(200).json({
            success: true,
            token,
            role: 'teacher',
            email: teacher._doc.email,
            firstName: teacher._doc.firstName,
            lastName: teacher._doc.lastName,
            username: teacher._doc.username,
            staffId: teacher._doc.staffNo,
            halaqa: teacher._doc.halaqa,
          });
        } else {
          res
            .status(400)
            .json({ success: false, message: 'Invalid credentials!' });
        }
      }
      let parent = await Parent.findOne({ email: req.body.email });
      if (parent) {
        //Check if req director credentials are correct & matching
        if (
          parent.email == req.body.email &&
          parent.password == req.body.password
        ) {
          //Get the JWT token for director
          var token = jwt.sign(
            {
              username: parent.username,
              role: 'parent',
            },
            '__jwt__config__secret__',
            {
              expiresIn: '1d',
            }
          );
          res.status(200).json({
            success: true,
            token,
            role: 'parent',
            email: parent._doc.email,
            firstName: parent._doc.firstName,
            lastName: parent._doc.lastName,
            username: parent._doc.username,
            students: parent._doc.students,
            mobile: parent._doc.mobile,
            qatariId: parent._doc.qatariId,
            id: parent._doc._id,
          });
        } else {
          res
            .status(400)
            .json({ success: false, message: 'Invalid credentials!' });
        }
      }
    }
  }
}
