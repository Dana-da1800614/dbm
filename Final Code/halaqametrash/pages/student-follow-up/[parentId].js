import { useRouter } from 'next/router';
import React from 'react';
import Student from '../../models/Student';

const StudentsFollowUp = ({ students }) => {
  const router = useRouter();

  return (
    <div className='std-fu-main'>
      <h1>Students</h1>
      {students?.length === 0 &&<div>No students!</div>}
      {students?.map((student, i) => {
        return (
          <div
            key={i}
            className='std-card'
            onClick={() =>
              router.push(`/follow-up/${student._id}?name=${student.firstName}`)
            }
          >
            {student.firstName}
          </div>
        );
      })}
    </div>
  );
};

export default StudentsFollowUp;

export async function getServerSideProps(ctx) {
  const stds = await Student.find({ parentId: ctx.query.parentId, enrollmentStatus: true });
  return {
    props: {
      students: JSON.parse(JSON.stringify(stds)),
    },
  };
}
