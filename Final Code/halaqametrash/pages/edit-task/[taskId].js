import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { surahs } from '../../surah';
import Task from '../../models/Task';

const EditTask = ({ task }) => {
  const [activeSurah, setActiveSurah] = React.useState(
    JSON.stringify(task.surah)
  );
  const router = useRouter();
  const [ayaCount, setAyaCount] = React.useState(0);
  const [aya, setAya] = React.useState(0);
  let d = new Date();

  let date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  const formik = useFormik({
    initialValues: {
      studentId: task.studentId,
      surahId: JSON.parse(activeSurah)?.id,
      surahName: JSON.parse(activeSurah)?.name,
      fromAya: task.fromAya,
      toAya: task.toAya,
      type: task.type,
      dueDate: task.dueDate,
      completedDate: task.completedDate,
      masteryLevel: task.masteryLevel,
      comment: task.comment,
      status: task.status,
      surah: JSON.parse(activeSurah),
    },
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      if (values.toAya < values.fromAya) {
        errors.toAya = 'To Aya must be greater than From Aya';
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
      fetch('/api/tasks/edit', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, id: router.query.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success('Task updated successfully');
          router.push('/manage-tasks');
        })
        .catch((err) => {
          console.log(err);
          toast.error('Something went wrong');
        });
    },
  });
  console.log('Formik values', formik.values);

  return (
    <div className='at-main'>
      <Toaster />
      <h3>Add Task</h3>
      <select
        className='ma-input'
        onChange={(e) => setActiveSurah(e.target.value)}
        defaultValue={activeSurah}
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
        onChange={formik.handleChange('fromAya')}
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
        onChange={formik.handleChange('toAya')}
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
      <input
        value={formik.values.dueDate}
        onChange={formik.handleChange}
        id='dueDate'
        name='dueDate'
        type={'date'}
        className='ma-input'
      />
      <input
        value={formik.values.completedDate}
        onChange={formik.handleChange}
        id='completedDate'
        name='completedDate'
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
        Save Task
      </button>
    </div>
  );
};

export default EditTask;
export async function getServerSideProps(ctx) {
  const tsk = await Task.findOne({ _id: ctx.query.taskId });
  return {
    props: {
      task: JSON.parse(JSON.stringify(tsk)),
    },
  };
}
