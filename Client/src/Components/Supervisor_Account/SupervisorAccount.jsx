import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Paper } from '@mui/material';

const SupervisorForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        marginTop: '1rem',
      }}
    >
      <Paper elevation={6} className="p-4 space-y-2" style={{ width: '90%' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-lg font-bold mb-2 text-center">Supervisor Account</h2>

          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            defaultValue=""
            render={({ field }) => (
              <div>
                <TextField {...field} label="Name" fullWidth margin="normal" size="small" />
                {errors.name && (
                  <span className="text-red-500 block">{errors.name.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{ required: 'Phone number is required' }}
            defaultValue=""
            render={({ field }) => (
              <div>
                <TextField
                  {...field}
                  label="Phone number"
                  fullWidth
                  margin="normal"
                  size="small"
                />
                {errors.phone && (
                  <span className="text-red-500 block">{errors.phone.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name="nid"
            control={control}
            rules={{ required: 'NID number is required' }}
            defaultValue=""
            render={({ field }) => (
              <div>
                <TextField {...field} label="NID number" fullWidth margin="normal" size="small" />
                {errors.nid && (
                  <span className="text-red-500 block">{errors.nid.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name="presentAddress"
            control={control}
            rules={{ required: 'Present Address is required' }}
            defaultValue=""
            render={({ field }) => (
              <div>
                <TextField
                  {...field}
                  label="Present Address"
                  fullWidth
                  margin="normal"
                  size="small"
                />
                {errors.presentAddress && (
                  <span className="text-red-500 block">{errors.presentAddress.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name="permanentAddress"
            control={control}
            rules={{ required: 'Permanent Address is required' }}
            defaultValue=""
            render={({ field }) => (
              <div>
                <TextField
                  {...field}
                  label="Permanent Address"
                  fullWidth
                  margin="normal"
                  size="small"
                />
                {errors.permanentAddress && (
                  <span className="text-red-500 block">{errors.permanentAddress.message}</span>
                )}
              </div>
            )}
          />

          <Controller
            name="image"
            control={control}
            rules={{ required: 'Image is required' }}
            defaultValue=""
            render={({ field }) => (
              <div>
                <TextField {...field} type="file" fullWidth margin="normal" size="small"/>
                {errors.image && (
                  <span className="text-red-500 block">{errors.image.message}</span>
                )}
              </div>
            )}
          />

          <Button type="submit" variant="contained" fullWidth size="medium" className='mt-3'>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SupervisorForm;