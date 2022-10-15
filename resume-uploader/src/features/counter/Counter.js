import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  upload_async,
  select_content,
} from './document_slice';
import styles from './Counter.module.css';

export function Counter() {
  const count = useSelector(select_content);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const [our_file, set_our_file] = useState();
  const [is_chosen, set_is_chosen] = useState(false);

  const changeHandler = function (event) {
    console.log(event.target.files);
    if (event.target.files.length !== 0) {
        set_our_file(event.target.files[0]);
        set_is_chosen(true);
    }
    console.log(our_file);
  }

  const handleSubmission = function () {
    const form_data = new FormData();
    form_data.append("document", our_file);
    console.log(form_data);
   
    fetch(
			"http://localhost:3001/documents",
			{
				method: 'POST',
			body: form_data,
            mode: "no-cors"
        }
    )
    .then((response) => response.json())
    .then((result) => {
        console.log('Success:', result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

  return (
    <div>
      <div className={styles.row}>
        <input type="file" name="document" onChange={changeHandler} />
        <button
          className={styles.asyncButton}
          onClick={handleSubmission}
        >
         Upload 
        </button>
      </div>
    </div>
  );
}
