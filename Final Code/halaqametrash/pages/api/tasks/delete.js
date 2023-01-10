import connectMongo from '../../../middleware/mongoose';
import Student from '../../../models/Student';
import Task from '../../../models/Task';
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function deleteTask(req, res) {
  //Connect to mongoDB
  await connectMongo();
  try {
    await Task.deleteOne({ _id: req.body.id });
    res.status(200).json({ success: true, message: 'deleted' });
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
}
