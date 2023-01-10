import { useRouter } from 'next/router';
import React from 'react';
import Student from '../models/Student';

const ManageTasks = ({ students }) => {
  const router = useRouter();
  return (
    <div className='std-fu-main'>
      <h1>All Students</h1>
      <p>Select a student to manage his/her tasks.</p>
      {students?.map((student, i) => {
        return (
          <div
            key={i}
            className='std-card'
            onClick={() =>
              router.push(
                `/manage-tasks/${student._id}?name=${student.firstName}`
              )
            }
          >
            {student.firstName}
          </div>
        );
      })}
    </div>
  );
};

export default ManageTasks;

export async function getServerSideProps() {
  const stds = await Student.find();
  return {
    props: {
      students: JSON.parse(JSON.stringify(stds)),
    },
  };
}
