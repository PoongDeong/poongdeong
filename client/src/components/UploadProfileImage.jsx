import React from 'react';

import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

import { patchUploadProfileImage } from '../apis/upload';

import { setProfileImage } from '../slice';

const styles = {
  fileInput: {
    overflow: 'hidden',
    width: '0px',
  },
  button: {
    margin: '10px',
    padding: '8px 20px',
    background: '#537697',
    color: '#ffffff',
    border: '0',
    borderRadius: '10px',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.26)',
  },
};

export default function UploadProfileImage() {
  const dispatch = useDispatch();

  const alertError = async (errorMessage) => {
    await Swal.fire({ icon: 'error', text: errorMessage });
  };

  const onChangeFile = async (event) => {
    const profileImage = event.target.files[0];

    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('userImg', profileImage);

      try {
        const profileURL = await patchUploadProfileImage(formData);
        await dispatch(setProfileImage(profileURL));
      } catch {
        await alertError('이미지를 업로드하지 못했습니다');
      }
    }
  };

  return (
    <div>
      <button
        type="button"
        css={styles.button}
      >
        <label htmlFor="fileUpload">
          이미지 변경
        </label>
      </button>
      <input
        type="file"
        id="fileUpload"
        accept="image/*"
        css={styles.fileInput}
        onChange={onChangeFile}
      />
    </div>
  );
}
