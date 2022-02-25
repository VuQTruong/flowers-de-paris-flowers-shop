import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import axios from 'axios';
//import config from '../../config';

class UploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise(async (resolve, reject) => {
          try {
            const formData = new FormData();
            formData.append('file', file);

            const { data } = await axios.post('/api/files/image', formData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            resolve({
              default: data.url,
            });
          } catch (err) {
            reject(err);
          }
        })
    );
  }
}

export default function TextEditor(props) {
  // Configurate the editor
  const config = {
    placeholder: props.placeholder,
    toolbar: {
      items: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'subscript',
        'superscript',
        '|',
        'heading',
        'fontFamily',
        'fontSize',
        'fontColor',
        'fontBackgroundColor',
        'findAndReplace',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'alignment',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'mediaEmbed',
        'link',
        'insertTable',
        'blockQuote',
        '|',
        'code',
        'codeBlock',
        'undo',
        'redo',
      ],
      shouldNotGroupWhenFull: false,
    },
    language: 'en',
    image: {
      toolbar: [
        'imageTextAlternative',
        '|',
        'imageStyle:alignLeft',
        'imageStyle:block',
        'imageStyle:alignRight',
        'imageStyle:inline',
        '|',
        'linkImage',
      ],
    },
    mediaEmbed: {
      previewsInData: true,
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    licenseKey: '',
  };

  return (
    <div className={props.className}>
      <CKEditor
        onReady={(editor) => {
          if (editor) {
            editor.plugins.get('FileRepository').createUploadAdapter = (
              loader
            ) => {
              return new UploadAdapter(loader);
            };
          }
        }}
        editor={Editor}
        config={config}
        data={props.value}
        onChange={props.onEditorChange}
      />
    </div>
  );
}
