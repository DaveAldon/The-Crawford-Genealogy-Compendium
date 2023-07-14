import { hext } from '@davealdon/hext';
import { Autocomplete, Box, Paper, TextField } from '@mui/material';
import { Node } from 'reactflow';

interface MenuItem {
  label: string;
  visualLabel: string;
  id: string;
}
interface SearchResultsProps {
  peopleData: Node[];
  person: Node | null;
  setPerson: (people: Node | null) => void;
  width: number;
}
export const SearchPeople = (props: SearchResultsProps) => {
  const menuItems: MenuItem[] = props.peopleData
    .filter(person => !person.data.id.includes('~'))
    .map(person => {
      return {
        label:
          `${person.data.Firstname} ${person.data.Middlename} ${person.data.Lastname}`.replace(
            '  ',
            ' ',
          ),
        visualLabel: `${person.data.Firstname} ${person.data.Middlename} ${person.data.Lastname} - ${person.data.DOB}`,
        id: person.id,
      };
    });
  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={menuItems}
        sx={{
          width: props.width < 500 ? 150 : 200,
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #eee',
          },
        }}
        onChange={(_event, value) => {
          const nodeRef = props.peopleData.find(
            person => person.id === value?.id,
          );
          props.setPerson(nodeRef ?? null);
        }}
        renderInput={params => (
          <TextField
            {...params}
            label={'Search Family'}
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
                <p className="text-white">{option.visualLabel.split('-')[0]}</p>
                <p className="text-white opacity-50">
                  {option.visualLabel.split('-')[1]}
                </p>
                <div className="border-b border-white h-2 w-full opacity-25"></div>
              </div>
            </Box>
          );
        }}
      />
    </div>
  );
};
