import axios from 'axios';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import Message from '../../models/Message';

const MessagesSentToParent = ({ messages }) => {
  const router = useRouter();
  const deleteMsg = async (id) => {
    await axios.post(`/api/messages/delete`, {
      messageId: id,
    }).then(() => {
      toast.success('Message deleted successfully!');
      setTimeout(() => {
        window.location.reload()
      }, 1500);
    });
   }
  return (
    <div className='msg-sent-main'>
      <h3>Messages of {router.query.name}</h3>
      <div className='msg-wrapper'>
        {messages.length === 0 && (
          <>
            <div>No messages!</div>
          </>
        )}
        {messages?.map((msg) => {
          return (
            <>
              <div key={msg} className='msg-box'>
                <span style={{ fontSize: '11px' }}>
                  {moment(msg.createdAt).format('DD MMM, YYYY')}
                </span>
                <span>{msg.message}</span>

                {msg?.image && (
                  <>
                    <img alt='' src={msg?.image} width={400} height={400} />
                  </>
                )}
                <div onClick={() => router.push(`/edit-message/${msg._id}?name=${router.query.name}`)}  className='edit-btn'>Edit</div>
                <div  className='del-btn' onClick={() => deleteMsg(msg?._id)}>Delete</div>
              </div>
              <br />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default MessagesSentToParent;

export async function getServerSideProps(ctx) {
  const msgs = await Message.find({ parentId: ctx.query.parentId });
  return {
    props: {
      messages: JSON.parse(JSON.stringify(msgs)),
    },
  };
}
