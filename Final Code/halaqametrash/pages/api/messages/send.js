import connectMongo from '../../../middleware/mongoose';
import Message from '../../../models/Message';
var jwt = require('jsonwebtoken');
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function sednMessageToParent(req, res) {
  //Connect to mongoDB
  await connectMongo();
  try {
    let { image, message, parentId } = req.body;
    let msg = await Message.create({
      image,
      message,
      parentId,
    });
    res.status(200).json({ success: true, data: msg });
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
}
