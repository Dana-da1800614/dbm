import axios from 'axios';
import { useFormik, yupToFormErrors } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const MakeAnnouncements = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      announcementTitle: '',
      announcementText: '',
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
      await axios.post(`/api/announcement/add`, values).then(() => {
        toast.success('Announcement made successfully!');
        setTimeout(() => {
          router.push('/announcements');
        }, 1500);
      });
    },
  });
  return (
    <div className='ma-main'>
      <h1 className='ma-h-main'>Make Announcement</h1>
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
        value='Make Announcement'
        onClick={formik.handleSubmit}
      />
    </div>
  );
};

export default MakeAnnouncements;
