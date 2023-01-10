import connectMongo from '../../../middleware/mongoose';
import Announcement from '../../../models/Announcement';
/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addAnnouncement(req, res) {
  //Connect to mongoDB
  await connectMongo();
  try {
    let { announcementTitle, announcementText } = req.body;
    let ann = await Announcement.create({
      announcementTitle,
      announcementText,
    });
    res.status(200).json({ success: true, data: ann });
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
}
