import { hext } from '@davealdon/hext';
import { Autocomplete, Box, Paper, TextField } from '@mui/material';
import { families } from '../../compendium/lib/families';

interface SearchResultsProps {
  selectedFamily: string;
  setSelectedFamily: (family: string) => void;
}
export const SearchFamilies = (props: SearchResultsProps) => {
  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={families}
        sx={{
          width: 200,
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #eee',
          },
        }}
        onChange={(_event, value) => {
          props.setSelectedFamily(value ?? '');
        }}
        renderInput={params => (
          <TextField
            {...params}
            label={'Select Tree'}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            inputProps={{
              ...params.inputProps,
              style: {
                //padding: 'calc(0.5vw + 5px)',
                //fontSize: 'calc(0.5vw + 5px)',
                //borderColor: '#56575a',
                // #56575a in rgb
                //borderColor: 'rgb(86, 87, 90)',
                //border: '2px solid #565750',
                backgroundColor: 'transparent',
              },
            }}
            sx={{
              color: 'white',
              borderColor: 'white',
              input: { color: 'white' },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                {
                  borderColor: 'white',
                },
            }}
          />
        )}
        PaperComponent={({ children }) => (
          <Paper
            style={{ backgroundColor: '#111111', marginTop: 13, width: 300 }}>
            {children}
          </Paper>
        )}
        renderOption={(props, option) => {
          return (
            <Box
              component="li"
              sx={{
                //backgroundColor: '#111111',
                '&:hover': {
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              {...props}>
              <div
                className="flex flex-col w-full p-2 rounded-md"
                style={{
                  backgroundColor: hext('#696969', 15),
                }}>
                <p className="text-white">{option}</p>
                <div className="border-b border-white h-2 w-full opacity-25"></div>
              </div>
            </Box>
          );
        }}
      />
    </div>
  );
};
