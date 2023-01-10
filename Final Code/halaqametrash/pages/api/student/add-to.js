import connectMongo from '../../../middleware/mongoose';
import Student from '../../../models/Student';
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addStudentToExistingParent(req, res) {
  //Connect to mongoDB
  await connectMongo();
  try {
    let { firstName, lastName, dob, gender, schoolGrade, teacherId, parentId, enrollmentStatus } =
      req.body;
    let std = await Student.create({
      firstName,
      lastName,
      dob,
      gender,
      schoolGrade,
      teacherId,
      parentId,
      enrollmentStatus: enrollmentStatus, 
    });
    res.status(200).json({ success: true, data: std });
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
}
