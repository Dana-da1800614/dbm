import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Parent from '../models/Parent';

const AllParents = ({ parents, user }) => {
  const router = useRouter();
  return (
    <div className='pr-main'>
      {user?.role === 'coordinator' && (
        <>
          <Link href={`/add-new-student`}>Add New Student</Link>
        </>
      )}
      {parents?.map((parent) => {
        return (
          <div key={parent} className='pr-card'>
            <h3>
              {parent.firstName} {parent.lastName}
            </h3>

            <div>
              {user.role === 'teacher' && (
                <button
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/send-message/${parent._id}?name=${parent?.firstName}`)}
                >
                  Send Message
                </button>
              )}
              {user.role === 'coordinator' && (
                <button
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/add-student/${parent._id}`)}
                >
                  Add Student
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllParents;

export async function getServerSideProps() {
  const prns = await Parent.find();
  return {
    props: {
      parents: JSON.parse(JSON.stringify(prns)),
    },
  };
}
