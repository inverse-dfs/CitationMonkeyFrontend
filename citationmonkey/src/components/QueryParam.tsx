import FormControl from '@mui/material/FormControl/FormControl';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select from '@mui/material/Select/Select';
import TextField from '@mui/material/TextField/TextField';
import { FunctionComponent, useEffect, useState } from 'react';
import { queryObject, queryField, booleanLogic } from '../types/queries.ts';
import { Box } from '@mui/material';

interface QueryParamProps {
  first: boolean,
  id: number,
  updateQueryParam: (id: number, newVal: queryObject) => void,
}

const QueryParam: FunctionComponent<QueryParamProps> = ({ first, id, updateQueryParam }) => {
  const [val, setVal] = useState<queryObject>({ field: queryField.KEYWORDS, value: "", boolean: (first) ? booleanLogic.None : booleanLogic.AND })

  // event is really of type: SelectChangeEvent<booleanLogic> | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  // but it gives weird error since ig it is too general from the cases we use such that event.target may not exist
  const handleChange = (event: any) => {
    setVal((cur) => {
      return {
        ...cur, 
        [event.target.name]: event.target.value
      }
    })
  }

  useEffect(() => {
    updateQueryParam(id, val)
  }, [val])

  return (
    <Box key={id}>
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
                if (val !== booleanLogic.None) return <MenuItem key={val} value={val}>{val}</MenuItem>
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
        >
          {
            Object.values(queryField).map(val =>
              <MenuItem value={val} key={val}>{val}</MenuItem>
            )
          }
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: (first) ? '70%' : '52%' }}>
        <TextField
          name="value"
          required
          id="value"
          autoFocus
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  );
}

export default QueryParam;