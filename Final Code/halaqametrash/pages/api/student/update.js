import connectMongo from '../../../middleware/mongoose';
import Parent from '../../../models/Parent';
import Student from '../../../models/Student';
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function editStudent(req, res) {
  console.log(req.body);
  //Connect to mongoDB
  await connectMongo();
  try {
    let { firstName, lastName, dob, gender, schoolGrade, teacherId, enrollmentStatus, studentId } = req.body;
    let std = await Student.updateOne({_id: studentId},{
      firstName,
      lastName,
      dob,
      gender,
      schoolGrade,
      teacherId,
      enrollmentStatus: enrollmentStatus, 
    });
    res.status(200).json({ success: true, student: std });
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
}
