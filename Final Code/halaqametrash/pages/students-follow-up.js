import { useRouter } from 'next/router';
import React from 'react';
import Student from '../models/Student';

const StudentsFollowUp = ({ students, user }) => {
  const router = useRouter();

  return (
    <div className='std-fu-main'>
      <h1>Students</h1>
      {students?.length === 0 && <div>No students!</div>}
      {students?.map((student, i) => {
        return (
          <div key={i} style={{display: 'flex', alignItems: 'center'}}> <div
          
          className='std-card'
          onClick={() =>
            router.push(`/follow-up/${student._id}?name=${student.firstName}`)
          }
        >
          
          {student.firstName}
        </div><div className='edit-btn' style={{marginLeft: '4px'}} onClick={() =>
            router.push(`/edit-student/${student._id}?name=${student.firstName}`)
          }>Edit</div></div>
         
        );
      })}
    </div>
  );
};

export default StudentsFollowUp;

export async function getServerSideProps() {
  const stds = await Student.find();
  return {
    props: {
      students: JSON.parse(JSON.stringify(stds)),
    },
  };
}
