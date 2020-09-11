import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
];

export default function ControllableStates() {
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    const getInput = (event, val) => {
        setValue(val.value);
        setInputValue(val.label);
        console.log(val.value);
    };

    return (
        <div>
            <div>{`value: ${value !== null ? `JSON.stringify(${value})` : 'null'}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div>
            <br />
            <Autocomplete
                value={value}
                onChange={getInput}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue.label);
                }}
                id="controllable-states-demo"
                options={options}
                getOptionLabel={(option) => option.label}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
            />
        </div>
    );
}
