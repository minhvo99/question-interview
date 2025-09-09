import React, { useEffect, useState } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';

import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/table.min.js';

const Editor = ({ value, onChange }) => {
  const [model, setModel] = useState(value || '');
  useEffect(() => {
    setModel(value || '');
  }, [value]);

  const handleModelChange = (content) => {
    setModel(content);
    if (onChange) {
      onChange(content);
    }
  };
  const config = {
    placeholderText: 'Enter text here...',
    theme: 'gray',
    heightMin: 200,
    charCounterCount: true,
    attribution: false,
    toolbarButtons: {
      moreText: {
        buttons: [
          'bold',
          'italic',
          'underline',
          'strikeThrough',
          'clearFormatting',
        ],
      },
      moreParagraph: {
        buttons: [
          'formatUL',
          'formatOL',
          'alignLeft',
          'alignCenter',
          'alignRight',
          'alignJustify',
        ],
      },
      moreRich: {
        buttons: ['insertLink', 'insertImage', 'insertTable', 'quote'],
      },
      moreMisc: {
        buttons: ['undo', 'redo', 'fullscreen', 'html'],
      },
    },
  };
  useEffect(() => {
    const el = Array.from(document.querySelectorAll('div')).find((div) =>
      div.textContent.includes(
        'Unlicensed copy of the Froala Editor. Use it legally by purchasing a license.',
      ),
    );
    if (el) el.remove();
    console.log('runnnnnn');
  }, [model, setModel, onChange, value]);

  return (
    <div className='w-full'>
      <FroalaEditor
        tag='textarea'
        model={model}
        onModelChange={handleModelChange}
        config={config}
      />
    </div>
  );
};

export default Editor;
