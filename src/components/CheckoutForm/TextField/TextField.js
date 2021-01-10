import { Grid, TextField } from '@material-ui/core'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';

const FormInput = ({name,label,required}) => {
    const {control} = useFormContext();
    return (
        <Grid item xs={12} sm={12}>
            <Controller
                as={TextField}
                control={control}
                fullWidth
                defaultValue=''
                name={name}
                label={label}
                required={required}
            />
        </Grid>
    )
}

export default FormInput
