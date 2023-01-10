import connectMongo from '../../../middleware/mongoose';
import Message from '../../../models/Message';
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function updateMessage(req, res) {
  //Connect to mongoDB
  await connectMongo();
  try {
    let { image, message,messageId } = req.body;
    let msg = await Message.updateOne({_id: messageId}, {image, message});
    res.status(200).json({ success: true, data: msg });
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
}
