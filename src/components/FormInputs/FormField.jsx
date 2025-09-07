/* eslint-disable no-unused-vars */
import { FormHelperText } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const FormField = ({
  control,
  label,
  name,
  error,
  Component,
  type,
  options,
  ...rest
}) => {
  return (
    <div className='w-full'>
      <p className='font-sm text-dark-100 mb-1 text-sm'>{label}</p>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <Component
              label={label}
              {...field}
              {...rest}
              error={
                fieldState.isTouched ? fieldState.error?.message : undefined
              }
              touched={fieldState.isTouched}
              options={options}
            />
          );
        }}
      />
      {error?.message && (
        <FormHelperText error={true}>{error?.message}</FormHelperText>
      )}
    </div>
  );
};

export default FormField;
