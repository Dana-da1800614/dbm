import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const AddNewStudent = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      schoolGrade: 0,
      teacherId: 0,
      parentfirstName: '',
      parentlastName: '',
      qatariId: 0,
      mobile: '',
      email: '',
      username: '',
      password: '',
      enrollmentStatus: true,
    },
    validationSchema: () => {
      return yup.object({
        firstName: yup.string().required('First name is required.'),
        lastName: yup.string().required('Last name is required.'),
        gender: yup.string().required('Gender is required.'),
        dob: yup.string().required('Date of birth is required.'),
        schoolGrade: yup.string().required('School grade is required.'),
        teacherId: yup.string().required('Teacher ID is required.'),
        parentfirstName: yup
          .string()
          .required('Parent First name is required.'),
        parentlastName: yup.string().required('Parent Last name is required.'),
        qatariId: yup.string().required('Parent Last name is required.'),
        mobile: yup.string().required('mobile is required.'),
        email: yup.string().required('email is required.'),
        username: yup.string().required('username is required.'),
        password: yup.string().required('password is required.'),
      });
    },
    onSubmit: async (values) => {
      await axios
        .post(`/api/student/add-new`, values)
        .then(() => {
          toast.success('Student added successfully!');
          window.location = '/all-parents';
        })
        .catch((err) => toast.error(`${err}`));
    },
  });
  return (
    <div className='ans-main'>
      <h1>Add New Student</h1>
      <label>First Name</label>
      <input
        value={formik.values.firstName}
        onChange={formik.handleChange}
        id='firstName'
        name='firstName'
        placeholder='Student First Name'
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
        placeholder='Student Last Name'
        className='ma-input'
      />
      {formik.touched.lastName && Boolean(formik.errors.lastName) && (
        <>
          <div className='err'>{formik.errors.lastName}</div>
        </>
      )}
      <label htmlFor='gender'>Student Gender</label>
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
      <label htmlFor='dob'>Student DOB</label>
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
        placeholder='Student School Grade'
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
        placeholder='Student Teacher ID'
        type={'number'}
      />
      {formik.touched.teacherId && Boolean(formik.errors.teacherId) && (
        <>
          <div className='err'>{formik.errors.teacherId}</div>
        </>
      )}
                         <label>Qatari ID</label>

      <input
        value={formik.values.qatariId}
        onChange={formik.handleChange}
        id='qatariId'
        name='qatariId'
        className='ma-input'
        placeholder='Qatari ID'
        type={'number'}
      />
      {formik.touched.qatariId && Boolean(formik.errors.qatariId) && (
        <>
          <div className='err'>{formik.errors.qatariId}</div>
        </>
      )}
                               <label>Parent First Name</label>

      <input
        value={formik.values.parentfirstName}
        onChange={formik.handleChange}
        id='parentfirstName'
        name='parentfirstName'
        className='ma-input'
        placeholder='Parent First Name'
      />
      {formik.touched.parentfirstName &&
        Boolean(formik.errors.parentfirstName) && (
          <>
            <div className='err'>{formik.errors.parentfirstName}</div>
          </>
        )}
                                       <label>Parent Last Name</label>

      <input
        value={formik.values.parentlastName}
        onChange={formik.handleChange}
        id='parentlastName'
        name='parentlastName'
        className='ma-input'
        placeholder='Parent Last Name'
      />
      {formik.touched.parentlastName && Boolean(formik.errors.parentlastName) && (
        <>
          <div className='err'>{formik.errors.parentlastName}</div>
        </>
      )}
                                             <label>Parent Mobile Number</label>

      <input
        value={formik.values.mobile}
        onChange={formik.handleChange}
        id='mobile'
        name='mobile'
        className='ma-input'
        placeholder='Parent mobile number'
      />
      {formik.touched.mobile && Boolean(formik.errors.mobile) && (
        <>
          <div className='err'>{formik.errors.mobile}</div>
        </>
      )}
                                                   <label>Parent Email</label>

      <input
        value={formik.values.email}
        onChange={formik.handleChange}
        id='email'
        name='email'
        className='ma-input'
        placeholder='Parent email'
      />
      {formik.touched.email && Boolean(formik.errors.email) && (
        <>
          <div className='err'>{formik.errors.email}</div>
        </>
      )}
                                                         <label>Parent Username</label>

      <input
        value={formik.values.username}
        onChange={formik.handleChange}
        id='username'
        name='username'
        className='ma-input'
        placeholder='Parent username'
      />
      {formik.touched.username && Boolean(formik.errors.username) && (
        <>
          <div className='err'>{formik.errors.username}</div>
        </>
      )}
                                                               <label>Parent Password</label>

      <input
        value={formik.values.password}
        onChange={formik.handleChange}
        id='password'
        name='password'
        className='ma-input'
        placeholder='Parent password'
      />
      {formik.touched.password && Boolean(formik.errors.password) && (
        <>
          <div className='err'>{formik.errors.password}</div>
        </>
      )}
      <input
        type='button'
        className='fadeIn fourth'
        style={{ cursor: 'pointer' }}
        value='Add Student'
        onClick={formik.handleSubmit}
      />
    </div>
  );
};

export default AddNewStudent;
