import { useState, useEffect } from 'react';

export const PreviewImage = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [preview, setPreview] = useState('');

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = window.URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => window.URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <div className="form__header">Image</div>
      <input className="form__input" type="file" onChange={(e) => onSelectFile(e)} />
      <div className="add__image-preview">
        <div className="add__img">
          {selectedFile && <img src={preview} className="add__img" alt="" />}
        </div>
      </div>
    </div>
  );
};
