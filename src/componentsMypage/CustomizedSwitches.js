import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { identity } from 'lodash';

const SwitchButton = withStyles({
  switchBase: {
    color: "#FFCC4F",
    '&$checked': {
      color: "#FFCC4F",
    },
    '&$checked + $track': {
      backgroundColor: "#FFCC4F",
    },
  },
  checked: {},
  track: {},
})(Switch);


export default function CustomizedSwitches({setState,state,setIs_Toggle}) {

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    //state.checked ===true ? setIs_Toggle(true) : setIs_Toggle(false)
  };

  return (
    <FormGroup style={{width: "37px"}}>
      <FormControlLabel
        control={<SwitchButton 
                  checked={state.checked} 
                  onChange={handleChange}
                  onClick={()=> {
                    alert("aaaa")
                  }}
                  name="checked" />}
      />
    </FormGroup>
  );
}