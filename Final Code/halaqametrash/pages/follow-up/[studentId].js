import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import Task from '../../models/Task';

const FollowUpOfStudent = ({ tasks }) => {
  const router = useRouter();
  console.log(tasks);
  return (
    <div className='follow-up-std-main'>
      <h1>Tasks of {router.query.name}</h1>
      {tasks.length === 0 && (
        <>
          <div>No Tasks right now for {router.query.name}</div>
        </>
      )}
      {tasks.length > 0 &&
        tasks.map((task, i) => {
          return (
            <div key={i} className='mt-task'>
              <span>
                Due Date: {moment(task.dueDate).format('DD MMM YYYY')}
              </span>
              <h3>
                {task.surahName} ({task.type})
              </h3>
              <p>
                From {task.fromAya} to {task.toAya} ayah
              </p>
              <span>
                {task.completedDate ? (
                  <span style={{ color: 'green' }}>COMPLETED</span>
                ) : (
                  <span style={{ color: 'orange' }}>PENDING</span>
                )}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default FollowUpOfStudent;

export async function getServerSideProps(ctx) {
  const tsks = await Task.find({ studentId: ctx.query.studentId });
  return {
    props: {
      tasks: JSON.parse(JSON.stringify(tsks)),
    },
  };
}
