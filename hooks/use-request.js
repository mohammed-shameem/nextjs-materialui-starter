import { useState } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import ErrorIcon from '@material-ui/icons/Error';

export default () => {
  const [errors, setErrors] = useState(null);

  const doRequest = async ({ url, method, body }) => {
    try {
      setErrors(null);
      const res = await axios({
        url,
        method,
        data: body
      });
      return res;
    } catch (err) {
      console.log("err")
      setErrors(
        <Paper elevation={3} square style={{padding: '1rem', marginTop: '1rem', display: 'flex'}}>
          <ErrorIcon style={{ color: 'red' }}/>
          <ul style={{marginTop: 0, paddingLeft: '1rem'}}>
            {err.response.data.errors.map(msg => (
              <li key={msg} style={{listStyle: 'none'}}>{msg}</li>
            ))}
          </ul>
        </Paper>
      );
    }
  };

  return { doRequest, errors };
};
