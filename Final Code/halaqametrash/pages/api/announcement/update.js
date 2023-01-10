import connectMongo from '../../../middleware/mongoose';
import Announcement from '../../../models/Announcement';
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function updateAnnouncement(req, res) {
  //Connect to mongoDB
  await connectMongo();
  try {
    let { announcementId, content } = req.body;
    let ann = await Announcement.updateOne({_id: announcementId, ...content});
    res.status(200).json({ success: true, data: ann });
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
}
