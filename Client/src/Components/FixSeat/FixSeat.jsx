import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const FixSeat = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div className='grid md:grid-cols-2 gap-10 md:mx-10 my-20'>
            <div className='border-2 p-5 rounded-xl'>
                <div className="mb-4">
                    <InputLabel htmlFor="date" className="block text-gray-400 font-semibold mb-2 ml-4">
                        Journey Date
                    </InputLabel>

                    <TextField
                        type="date"
                        id="date"
                        name="date"
                        {...register("date", { required: true })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                        defaultValue="date"
                    />
                    {errors.date && <span className='text-red-700'>This field is required</span>}
                </div>


                <div>
                    <InputLabel htmlFor="age" className="block text-gray-400 font-semibold mb-2 ml-4">
                        Pickup Point
                    </InputLabel>

                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        className="h-14 w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                        autoWidth
                        {...register("age", { required: true })}
                        defaultValue={10} // Set the default value to 10, which corresponds to "Twenty"
                    >
                        <MenuItem value={10}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                    </Select>



                    {errors.age && <span className='text-red-700'>This field is required</span>}
                </div> <br />

                <div>
                    <InputLabel htmlFor="age" className="block text-gray-400 font-semibold mb-2 ml-4">
                        Pickup Point
                    </InputLabel>

                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        className="h-14 w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                        autoWidth
                        {...register("age", { required: true })}
                        defaultValue={10} // Set the default value to 10, which corresponds to "Twenty"
                    >
                        <MenuItem value={10}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem>
                    </Select>



                    {errors.age && <span className='text-red-700'>This field is required</span>}
                </div> <br />

                <div>
                    <InputLabel htmlFor="date" className="block text-gray-400 font-semibold mb-2 ml-4">
                        Select Gender
                    </InputLabel>

                    <div className='grid md:grid-cols-3 gap-10'>
                        <div className='flex  items-center'>
                            <Checkbox {...label} />
                            <p>Male</p>
                        </div>

                        <div className='flex  items-center'>
                            <Checkbox {...label} />
                            <p>Female</p>
                        </div>

                        <div className='flex  items-center'>
                            <Checkbox {...label} />
                            <p>Others</p>
                        </div>
                    </div>

                </div> <br />

                <div className="mb-4">
                    <InputLabel htmlFor="date" className="block text-gray-400 font-semibold mb-2 ml-4">
                        Journey Date
                    </InputLabel>

                    <TextField
                        type="email"
                        id="email"
                        name="email"
                        placeholder='Enter your Email'
                        {...register("email", { required: true })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                        defaultValue="date"
                    />
                    {errors.date && <span className='text-red-700'>This field is required</span>}
                </div>

                <Button className='w-full font-bold' variant="contained" disableElevation>
                    Confirm
                </Button>

            </div>
            <div>
            <img className='seat-icon' width="24" height="24" src="https://img.icons8.com/material-outlined/24/000000/living-room.png" alt="living-room"/>
            </div>
        </div>
    );
};

export default FixSeat;
