import FormControl from '@mui/material/FormControl/FormControl';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select/Select';
import TextField from '@mui/material/TextField/TextField';
import React, { FunctionComponent, useState } from 'react';

interface QueryParamProps {
  first: boolean,
}

interface queryObject {
  field: queryField,
  value: string,
  boolean: booleanLogic
}

enum queryField {
  AUTHOR = "Author",
  KEYWORDS = "Keywords",
  TITLE = "Title"
}

enum booleanLogic {
  None = "None",
  AND = "AND",
  OR = "OR",
  NOT = "NOT"
}

const QueryParam: FunctionComponent<QueryParamProps> = ({ first }) => {
  const [val, setVal] = useState<queryObject>({ field: queryField.KEYWORDS, value: "", boolean: (first) ? booleanLogic.None : booleanLogic.AND })

  // event is really of type: SelectChangeEvent<booleanLogic> | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  // but it gives weird error since ig it is too general from the cases we use such that event.target may not exist
  const handleChange = (event: any) => {
    console.log(event?.target.name)
    console.log(event?.target.value)
    setVal((cur) => {
      return {
        ...cur, 
        [event.target.name]: event.target.value
      }
    })
  }

  return (
    <div>
      {!first &&
        <FormControl sx={{ m: 1, width: '15%' }}>
          <Select
            name = "boolean"
            id="booleanLogic"
            value={val.boolean}
            onChange={handleChange}
          >
            {
              Object.values(booleanLogic).map(val => {
                if (val !== booleanLogic.None) return <MenuItem value={val}>{val}</MenuItem>
              }
              )
            }
          </Select>
        </FormControl>
      }

      <FormControl sx={{ m: 1, width: '24%' }}>
        <Select
          name = "field"
          id="FieldLogic"
          value={val.field}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {
            Object.values(queryField).map(val =>
              <MenuItem value={val}>{val}</MenuItem>
            )
          }
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: (first) ? '70%' : '52%' }}>
        <TextField
          name="value"
          required
          id="keywords"
          label="Keywords"
          autoFocus
          onChange={handleChange}
        />
      </FormControl>
    </div>
  );
}

export default QueryParam;