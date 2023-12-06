
import './Login.css'
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider/AuthProvider';
import { useState } from 'react';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const defaultTheme = createTheme();
 const Login=()=>{
  const { signIn } = useContext(AuthContext);

  const [error, setError]=useState('');
  const {
    register,
    handleSubmit,
   
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    const email=data?.email
    const password=data?.password
   
    signIn (email, password)
    .then(result => {
            const NewUser = result.user;
            console.log(NewUser);
            // navigate(from,{replace:true})


        })
        .catch(error => {
            console.log(error);
            setError(error.message)

        })

  };

  return (
    <div className='grid md:grid-cols-2 sm:grid-cols-1'>
        <div ><ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className='login-section px-6 py-4'
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar className='bg-blue-600' sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
           
            <div className='text-red-600'>
          {error}
        </div>
           <div className='pb-8'>
           <Button  type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
           </div>
           
          </Box>
        </Box>
      
      </Container>
    </ThemeProvider></div>
        <div>
            <img className='loginPhoto img-fluid mt-14' src="https://i.ibb.co/0VsCnxL/Login-Photo-1.jpg" alt="" />
        </div>
    </div>
  );
}
export default Login;
