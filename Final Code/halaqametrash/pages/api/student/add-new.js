import connectMongo from '../../../middleware/mongoose';
import Parent from '../../../models/Parent';
import Student from '../../../models/Student';
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addStudentNew(req, res) {
  console.log(req.body);
  //Connect to mongoDB
  await connectMongo();
  try {
    let {
      qatariId,
      parentfirstName,
      parentlastName,
      mobile,
      email,
      username,
      password,
    } = req.body;
    let pr = await Parent.create({
      qatariId,
      firstName: parentfirstName,
      lastName: parentlastName,
      mobile,
      email,
      username,
      password,
    });
    let { firstName, lastName, dob, gender, schoolGrade, teacherId,enrollmentStatus } = req.body;
    let std = await Student.create({
      firstName,
      lastName,
      dob,
      gender,
      schoolGrade,
      teacherId,
      enrollmentStatus: enrollmentStatus, 
      parentId: pr._id,
    });
    res.status(200).json({ success: true, student: std, parent: pr });
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
}
