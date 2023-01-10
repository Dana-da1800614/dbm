import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { surahs } from '../../surah';

const AddTask = () => {
  const [activeSurah, setActiveSurah] = React.useState(
    JSON.stringify({
      id: 1,
      name: 'الفاتحة',
      englishName: 'Al-Fatiha',
      ayaCount: 7,
      type: 'Meccan',
    })
  );
  const router = useRouter();

  let d = new Date();
  let date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  const formik = useFormik({
    initialValues: {
      studentId: router.query.studentId,
      surahId: activeSurah ? JSON.parse(activeSurah)?.id : '',
      surahName: activeSurah ? JSON.parse(activeSurah)?.name : '',
      fromAya: '',
      toAya: '',
      type: '',
      dueDate: date,
      completedDate: '',
      masteryLevel: 'Beginner',
      comment: '',
      status: 'pending',
      surah: JSON.parse(activeSurah),
    },
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      if (values.toAya < values.fromAya) {
        errors.toAya = 'To Aya must be greater than From Aya';
      } else if (!values.toAya) {
        errors.toAya = 'To Aya is required';
      } else if (!values.fromAya) {
        errors.fromAya = 'From Aya is required';
      } else if (!values.type) {
        errors.type = 'Type is required';
      }

      //due date must be greater than current date
      //convert due date to date object
      let dueDate = new Date(values.dueDate);
      //convert current date to date object
      let currentDate = new Date();
      //compare due date and current date
      if (dueDate < currentDate) {
        errors.dueDate = 'Due Date must be greater than current date';
      }
      //convert completed date to date object
      // let completedDate = new Date(values.completedDate);
      // //compare completed date and current date
      // if (completedDate < dueDate) {
      //   errors.completedDate = "Completed Date must be greater than Due Date";
      // }
      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
      fetch('/api/tasks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          router.push('/manage-tasks/' + router.query.studentId);
        })
        .catch((err) => console.log(err));
      //save values to database
    },
  });

  console.log(activeSurah);

  return (
    <div className='at-main'>
      <Toaster />
      <h3>Add Task</h3>
      <select
        className='ma-input'
        onChange={(e) => setActiveSurah(e.target.value)}
      >
        {surahs.map((surah) => (
          <option key={surah.id} value={JSON.stringify(surah)}>
            {surah.englishName + ' (' + surah.ayaCount + ')'}
          </option>
        ))}
      </select>

      <label htmlFor='fromAya'>From Aya</label>
      <output htmlFor='fromAya'>{formik.values.fromAya}</output>
      <input
        value={formik.values.fromAya}
        onChange={formik.handleChange}
        id='fromAya'
        name='fromAya'
        placeholder='From Aya'
        className='ma-input'
        min={1}
        max={activeSurah ? JSON.parse(activeSurah)?.ayaCount : 0}
        type='range'
      />

      <label htmlFor='toAya'>To Aya</label>
      <output htmlFor='toAya'>{formik.values.toAya}</output>
      <input
        value={formik.values.toAya}
        onChange={formik.handleChange}
        id='toAya'
        name='toAya'
        placeholder='To Aya'
        className='ma-input'
        min={1}
        type='range'
        max={activeSurah ? JSON.parse(activeSurah)?.ayaCount : 0}
      />

      <select
        value={formik.values.type}
        onChange={formik.handleChange}
        id='type'
        name='type'
        className='ma-input'
      >
        <option value=''>Select Type</option>
        <option value='Memorize'>Memorize</option>
        <option value='Recite'>Recite</option>
      </select>
      <label htmlFor='dueDate'>Due Date</label>
      <input
        value={formik.values.dueDate}
        onChange={formik.handleChange}
        id='dueDate'
        name='dueDate'
        type={'date'}
        className='ma-input'
      />

      <select
        value={formik.values.masteryLevel}
        onChange={formik.handleChange}
        id='masteryLevel'
        name='masteryLevel'
        className='ma-input'
      >
        <option value={'Beginner'}>Beginner</option>
        <option value={'Intermediate'}>Intermediate</option>
        <option value={'Advanced'}>Advanced</option>
      </select>
      <input
        value={formik.values.comment}
        onChange={formik.handleChange}
        id='comment'
        name='comment'
        placeholder='Comment'
        className='ma-input'
      />
      <button
        className='ma-btn'
        type='submit'
        onClick={() => {
          formik.handleSubmit();
          if (formik.errors) {
            //loop through errors and show toast
            for (const [key, value] of Object.entries(formik.errors)) {
              toast.error(value);
            }
          }
        }}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
