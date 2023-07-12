import FormControl from '@mui/material/FormControl/FormControl';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select from '@mui/material/Select/Select';
import TextField from '@mui/material/TextField/TextField';
import { FunctionComponent, useEffect, useState, Fragment } from 'react';
import { queryObject, queryField, booleanLogic, equality } from '../types/queries.ts';

interface QueryParamProps {
  first: boolean,
  id: number,
  defaultValue: queryObject,
  updateQueryParam: (id: number, newVal: queryObject) => void,
}

const QueryParam: FunctionComponent<QueryParamProps> = ({ first, id, defaultValue, updateQueryParam }) => {
  const [val, setVal] = useState<queryObject>(defaultValue)

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
    <Fragment>
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

      <FormControl sx={{ m: 1, width: '14%' }}>
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
      <FormControl sx={{ m: 1, width: '14%' }}>
        <Select
          name = "equality"
          id="equality"
          value={val.equality}
          onChange={handleChange}
          displayEmpty
        >
          {
            Object.values(equality).map(val =>
              <MenuItem value={val} key={val}>{val}</MenuItem>
            )
          }
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: (first) ? '66%' : '49%' }}>
        <TextField
          name="value"
          required
          value={val.value}
          id="value"
          autoFocus
          onChange={handleChange}
        />
      </FormControl>
    </Fragment>
  );
}

export default QueryParam;