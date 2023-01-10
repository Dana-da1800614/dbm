import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react'
import Announcement from '../../models/Announcement';
import * as yup from 'yup'
import axios from 'axios';
import toast from 'react-hot-toast';


const EditAnnouncement = ({
    announcement
}) => {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            announcementId: router.query.announcementId,
                announcementText: announcement?.announcementText,
                announcementTitle: announcement?.announcementTitle,
        },
        validationSchema: () => {
            return yup.object({
              announcementText: yup
                .string()
                .required('Announcement description is required!'),
              announcementTitle: yup
                .string()
                .required('Announcement title is required'),
            });
          },
          onSubmit: async (values) => {
            await axios.post(`/api/announcement/update`, {
              announcementId: values.announcementId,
              content: {
                announcementText: values.announcementText,
                announcementTitle: values.announcementTitle
              }
            }).then(() => {
              toast.success('Announcement updated successfully!');
              setTimeout(() => {
                router.push('/announcements');
              }, 1500);
            });
          },
    })
  return (
    <div className='eann-main'>
       <h1 className='ma-h-main'>Edit Announcement</h1>
       <input
        placeholder='Enter Announcement Title'
        className='ma-input'
        id='announcementTitle'
        name='announcementTitle'
        value={formik.values.announcementTitle}
        onChange={formik.handleChange}
      />
      {formik.touched.announcementTitle &&
        Boolean(formik.errors.announcementTitle) && (
          <>
            <div className='err'>{formik.errors.announcementTitle}</div>
          </>
        )}
      <textarea
        type={'text'}
        placeholder='Enter Announcement Description'
        rows={10}
        cols={20}
        className='ma-input'
        id='announcementText'
        name='announcementText'
        value={formik.values.announcementText}
        onChange={formik.handleChange}
      />
      {formik.touched.announcementText &&
        Boolean(formik.errors.announcementText) && (
          <>
            <div className='err'>{formik.errors.announcementText}</div>
          </>
        )}
      <input
        type='button'
        className='fadeIn fourth'
        style={{ cursor: 'pointer' }}
        value='Save'
        onClick={formik.handleSubmit}
      />
    </div>
  )
}

export default EditAnnouncement

export async function getServerSideProps(ctx) {
    const tsk = await Announcement.findOne({ _id: ctx.query.announcementId });
    return {
      props: {
        announcement: JSON.parse(JSON.stringify(tsk)),
      },
    };
  }