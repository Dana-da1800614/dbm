import { useFormik } from 'formik/dist';
import { useRouter } from 'next/router';
import React from 'react';
import Student from '../../models/Student';
import * as yup from 'yup'
import axios from 'axios';
import toast from 'react-hot-toast';

const EditStudent = ({ std }) => {
  const router = useRouter();
  console.log(std);
  const formik = useFormik({
    initialValues: {
      firstName: std?.firstName,
      lastName: std?.lastName,
      gender: std?.gender,
      dob: std?.dob,
      schoolGrade: std?.schoolGrade,
      teacherId: std?.teacherId,
      enrollmentStatus: std?.enrollmentStatus,
      studentId: router.query.studentId
    },
    validationSchema: () => {
      return yup.object({
        firstName: yup.string().required('First name is required.'),
        lastName: yup.string().required('Last name is required.'),
        gender: yup.string().required('Gender is required.'),
        dob: yup.string().required('Date of birth is required.'),
        schoolGrade: yup.number().required('School grade is required.'),
        teacherId: yup.number().required('Teacher ID is required.'),
      });
    },
    onSubmit: async (values) => {
      await axios
        .post(`/api/student/update`, {
          ...values,
        })
        .then(() => {
          toast.success('Student updated successfully!');
          setTimeout(() => {
            window.location = '/students-follow-up'
          }, 1500);
        })
        .catch((err) => toast.error(`${err}`));
    },
  });
  return (
    <div className='follow-up-std-main'>
      <h1>Edit {router.query.name}</h1>
      <label>First Name</label>

      <input
        value={formik.values.firstName}
        onChange={formik.handleChange}
        id='firstName'
        name='firstName'
        placeholder='First Name'
        className='ma-input'
      />
      {formik.touched.firstName && Boolean(formik.errors.firstName) && (
        <>
          <div className='err'>{formik.errors.firstName}</div>
        </>
      )}
            <label>Last Name</label>

      <input
        value={formik.values.lastName}
        onChange={formik.handleChange}
        id='lastName'
        name='lastName'
        placeholder='Last Name'
        className='ma-input'
      />
      {formik.touched.lastName && Boolean(formik.errors.lastName) && (
        <>
          <div className='err'>{formik.errors.lastName}</div>
        </>
      )}
      <label htmlFor='gender'>Gender</label>
      <select
        value={formik.values.gender}
        onChange={formik.handleChange}
        id='gender'
        name='gender'
        className='ma-input'
      >
        <option value={'M'}>Male</option>
        <option value={'F'}>Female</option>
      </select>
      {formik.touched.gender && Boolean(formik.errors.gender) && (
        <>
          <div className='err'>{formik.errors.gender}</div>
        </>
      )}
                  <label>DOB</label>

      <input
        value={formik.values.dob}
        onChange={formik.handleChange}
        id='dob'
        name='dob'
        type={'date'}
        className='ma-input'
      />
      {formik.touched.dob && Boolean(formik.errors.dob) && (
        <>
          <div className='err'>{formik.errors.dob}</div>
        </>
      )}
                        <label>School Grade</label>

      <input
        value={formik.values.schoolGrade}
        onChange={formik.handleChange}
        id='schoolGrade'
        name='schoolGrade'
        className='ma-input'
        placeholder='School Grade'
        type={'number'}
      />
      {formik.touched.schoolGrade && Boolean(formik.errors.schoolGrade) && (
        <>
          <div className='err'>{formik.errors.schoolGrade}</div>
        </>
      )}
                              <label>Teacher ID</label>

      <input
        value={formik.values.teacherId}
        onChange={formik.handleChange}
        id='teacherId'
        name='teacherId'
        className='ma-input'
        placeholder='Teacher ID'
        type={'number'}
      />
      {formik.touched.teacherId && Boolean(formik.errors.teacherId) && (
        <>
          <div className='err'>{formik.errors.teacherId}</div>
        </>
      )}
                                    <label>Enrollment Status</label>

      <select
        value={formik.values.enrollmentStatus}
        onChange={formik.handleChange}
        id='enrollmentStatus'
        name='enrollmentStatus'
        className='ma-input'
      >
        <option value={true}>Enrolled</option>
        <option value={false}>Not Enrolled</option>
      </select>
      <input
        type='button'
        className='fadeIn fourth'
        style={{ cursor: 'pointer' }}
        value='Save'
        onClick={formik.handleSubmit}
      />
       
    </div>
  );
};

export default EditStudent;

export async function getServerSideProps(ctx) {
  const std = await Student.findOne({ _id: ctx.query.studentId });
  return {
    props: {
      std: JSON.parse(JSON.stringify(std)),
    },
  };
}
