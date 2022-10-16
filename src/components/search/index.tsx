import { useState, FC, useEffect } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { Autocomplete, Stack, styled, TextField } from '@mui/material';
import { Person } from '@/types';
import { DEBOUNBCE_TIME, SEARCH_URL, LIMIT_RESULTS, QUERY_PARAM, SEARCH_PARAM } from '@/constants';
import { useSearchParams } from 'react-router-dom';
import { Result } from '../results';

const Search: FC = () => {
  const [resultOptions, setResultOptions] = useState<Person[]>([]);
  const [autocompleteValue, setAutocompleteValue] = useState<Person[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState<string>('');

  const debounceSearchHandler = debounce(changeValue => searchMethod(changeValue), DEBOUNBCE_TIME);

  const searchMethod = async (changeValue: string) => {
    if (changeValue && changeValue.length > 0) {
      setSearchParams({ query: changeValue });
      const responce = await axios.get(`${SEARCH_URL}${SEARCH_PARAM}${changeValue}&limit=${LIMIT_RESULTS}`);
      setResultOptions([...responce.data]);
    } else {
      setResultOptions([]);
    }
  };

  const searchPatient = async (text: string) => {
    if (text) {
      const responce = await axios.get(`${SEARCH_URL}${SEARCH_PARAM}${text}&limit=${LIMIT_RESULTS}`);
      setAutocompleteValue([...responce.data]);
    }
  };

  useEffect(() => {
    const query = searchParams.get(QUERY_PARAM);
    if (query) {
      const split = query.split(' ');
      if (split.length > 0) {
        searchPatient(split[0]);
      }
      setSearchText(query);
    }
  }, []);

  return (
    <Container>
      <Stack sx={{ width: 500 }}>
        <Autocomplete
          freeSolo
          options={resultOptions}
          onInputChange={(e, changeValue) => {
            debounceSearchHandler(changeValue);
            setSearchText(changeValue);
          }}
          onChange={(e, selectedValue: Person | string | null) => {
            setAutocompleteValue(selectedValue ? [selectedValue as Person] : []);
            setResultOptions([]);
          }}
          inputValue={searchText}
          renderInput={params => (
            <TextField
              {...params}
              placeholder='Search'
              InputProps={{
                ...params.InputProps
              }}
            />
          )}
          filterOptions={options => options}
          getOptionLabel={(option: Person) => option.firstName + ' ' + option.lastName}
        />
      </Stack>
      {autocompleteValue && autocompleteValue.length > 0 && <Result rows={autocompleteValue} />}
    </Container>
  );
};

export default Search;

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
