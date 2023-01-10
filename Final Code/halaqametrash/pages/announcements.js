import axios from 'axios';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import Announcement from '../models/Announcement';


const Announcements = ({ announcements, user }) => {
 const router  = useRouter()
 const deleteAnn = async (id) => {
  await axios.post(`/api/announcement/delete`, {
    announcementId: id,
  }).then(() => {
    toast.success('Announcement deleted successfully!');
    setTimeout(() => {
      window.location.reload()
    }, 1500);
  });
 }
  return (
    <>
      <div className='ann-main'>
        <h1>All Announcements</h1>
        {announcements?.map((ann, i) => {
          return (
            <div key={i} className='announcement'>
              <span>{moment(ann.createdAt).format('DD MMM, YYYY')}</span>
              <h3>{ann.announcementTitle}</h3>
              <p>{ann.announcementText}</p>
              <span className='ann-by'>By coordinator</span>
              {user?.role === 'coordinator' && <>
              <div className='edit-btn' onClick={() => router.push(`/edit-announcement/${ann._id}`)}>Edit</div>
              <div className='del-btn' onClick={() => deleteAnn(ann._id)}>Delete</div></>}
              
            </div>
          );
        })}
        {announcements?.length === 0 && <div>No Announcements!</div>}
      </div>
    </>
  );
};

export default Announcements;

export async function getServerSideProps() {
  const anns = await Announcement.find();
  return {
    props: {
      announcements: JSON.parse(JSON.stringify(anns)),
    },
  };
}
