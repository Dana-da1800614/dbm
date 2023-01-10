import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react'
import * as yup from 'yup'
import axios from 'axios';
import toast from 'react-hot-toast';
import Message from '../../models/Message';


const EditMessage = ({
    message
}) => {
    const [image, setImage] = React.useState(message?.image);
    const [msg, setMsg] = React.useState(message?.message);
    function encode() {
      var selectedfile = document.getElementById('file').files;
      if (selectedfile.length > 0) {
        var imageFile = selectedfile[0];
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
          var srcData = fileLoadedEvent.target.result;
          setImage(srcData);
        };
        fileReader.readAsDataURL(imageFile);
      }
    }
  
    const router = useRouter();
  
    const formik = useFormik({
      initialValues: {
        message: msg,
        image: image,
        messageId: router.query.messageId
      },
      enableReinitialize: true,
      validationSchema: () => {
        return yup.object({
          message: yup.string().required('Please type a message.'),
        });
      },
      onSubmit: async (values) => {
        console.log(values);
        await axios.post(`/api/messages/update`, values).then(() => {
          toast.success('Message updated!');
          setTimeout(() => {
            router.push(`/messages/${message.parentId}?name=${router.query.name}`);
          }, 1500);
        });
      },
    });

    
  return (
    <div className='eann-main'>
        <div className='msg-main'>
      <h1>Edit Message - {router.query.name}</h1>
      <textarea
        type={'text'}
        placeholder='Enter Message...'
        rows={10}
        cols={20}
        className='ma-input'
        id='message'
        name='message'
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      {formik.touched.message && Boolean(formik.errors.message) && (
        <>
          <div className='err'>{formik.errors.message}</div>
        </>
      )}
      <h3>Attach New files...(previous one will be replaced)</h3>
      <input id='file' type='file' onChange={encode} />
      <input
        type='button'
        className='fadeIn fourth'
        style={{ cursor: 'pointer' }}
        value='Update Message'
        onClick={formik.handleSubmit}
      />
    </div>
    </div>
  )
}

export default EditMessage

export async function getServerSideProps(ctx) {
    const tsk = await Message.findOne({ _id: ctx.query.messageId });
    return {
      props: {
        message: JSON.parse(JSON.stringify(tsk)),
      },
    };
  }