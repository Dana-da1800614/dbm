import Link from 'next/link';
import React from 'react';

const Navbar = ({ user }) => {
  return (
    <div className='topnav'>
      {user?.role === 'coordinator' && (
        <>
          <Link href='/announcements'>Annoucements</Link>
          <Link href='/make-announcement'>Make Announcement</Link>
          <Link href='/all-parents'>Parents</Link>
          <Link href='/students-follow-up'>Students Follow Up</Link>
        </>
      )}
      {user?.role === 'teacher' && (
        <>
          <Link href='/announcements'>Annoucements</Link>
          <Link href='/manage-tasks'>Manage Tasks</Link>
          <Link href='/all-parents'>Parents</Link>
        </>
      )}
      {user?.role === 'parent' && (
        <>
          <Link href='/announcements'>Annoucements</Link>
          <Link
            href={`/student-follow-up/${
              JSON.parse(localStorage.getItem('$user')).id
            }`}
          >
            Students Follow Up
          </Link>
          <Link
            href={`/messages/${JSON.parse(localStorage.getItem('$user')).id}`}
          >
            Messages from Teacher
          </Link>
        </>
      )}

      <a
        style={{ fontSize: '22px', color: '#fff', cursor: 'pointer' }}
        onClick={() => {
          localStorage.clear();
          setTimeout(() => {
            window.location = '/';
          }, 1500);
        }}
      >
        Logout
      </a>
    </div>
  );
};

export default Navbar;
