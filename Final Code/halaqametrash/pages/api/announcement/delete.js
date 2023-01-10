import connectMongo from '../../../middleware/mongoose';
import Announcement from '../../../models/Announcement';
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function deleteAnnouncement(req, res) {
  //Connect to mongoDB
  await connectMongo();
  try {
    let { announcementId } = req.body;
    let ann = await Announcement.deleteOne({_id: announcementId});
    res.status(200).json({ success: true, data: ann });
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
}
