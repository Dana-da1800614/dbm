import connectMongo from '../../../middleware/mongoose';
import Message from '../../../models/Message';
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function deleteMessage(req, res) {
  //Connect to mongoDB
  await connectMongo();
  try {
    let { messageId } = req.body;
    let ann = await Message.deleteOne({_id: messageId});
    res.status(200).json({ success: true, data: ann });
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
}
