import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const SendMessage = () => {
  const [image, setImage] = React.useState(null);
  const [msg, setMsg] = React.useState('');
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
      parentId: router.query.parentId,
      image: image,
    },
    enableReinitialize: true,
    validationSchema: () => {
      return yup.object({
        message: yup.string().required('Please type a message.'),
      });
    },
    onSubmit: async (values) => {
      console.log(values);
      await axios.post(`/api/messages/send`, values).then(() => {
        toast.success('Message sent to parent!');
        setTimeout(() => {
          router.push(`/messages/${router.query.parentId}?name=${router.query.name}`);
        }, 1500);
      });
    },
  });
  return (
    <div className='msg-main'>
      <h1>Send Message to {router.query.name}</h1>
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
      <h3>Attach files...</h3>
      <input id='file' type='file' onChange={encode} />
      <input
        type='button'
        className='fadeIn fourth'
        style={{ cursor: 'pointer' }}
        value='Send Message'
        onClick={formik.handleSubmit}
      />
    </div>
  );
};

export default SendMessage;
