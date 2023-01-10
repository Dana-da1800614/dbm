import connectMongo from '../../../middleware/mongoose';
import Task from '../../../models/Task';
import Student from '../../../models/Student';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function editTask(req, res) {
  //Connect to mongoDB
  await connectMongo();
  try {
    //writ code for edit task  from the body of the request
    await Task.updateOne(
      { _id: req.body.id },
      {
        studentId: req.body.studentId,
        surahId: req.body.surahId,
        surahName: req.body.surahName,
        fromAya: req.body.fromAya,
        toAya: req.body.toAya,
        type: req.body.type,
        dueDate: req.body.dueDate,
        completedDate: req.body.completedDate,
        masteryLevel: req.body.masteryLevel,
        comment: req.body.comment,
      }
    );
    res.status(200).json({ success: true, message: 'edited', data: req.body });
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
}
