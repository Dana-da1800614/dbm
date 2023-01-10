//writ code for add task  from the body of the request
import connectMongo from '../../../middleware/mongoose';
import Task from '../../../models/Task';

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addTask(req, res) {
  console.log(req.body);
  //Connect to mongoDB
  await connectMongo();
  try {
    //writ code for add task  from the body of the request
    const task = new Task(req.body);
    await task.save();
    res.status(200).json({ success: true, message: 'added' });
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
}
