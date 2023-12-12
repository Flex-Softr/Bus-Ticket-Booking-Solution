import './FixSeat.css'
import TextField from "@mui/material/TextField";
import {
  Button,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const FixSeat = () => {
  const { register, formState: { errors } } = useForm();

  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1">
       <div className="max-w-xs md:max-w-md mx-auto my-20 p-4 md:p-8 bg-white rounded-md shadow-md">
      <div className="mb-6">
        <InputLabel
          htmlFor="date"
          className="block text-gray-400 font-semibold mb-2"
        >
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
        {errors.date && (
          <span className="text-red-700">This field is required</span>
        )}
      </div>

      <div className="mb-6">
        <InputLabel
          htmlFor="pickupPoint"
          className="block text-gray-400 font-semibold mb-2"
        >
          Pickup Point
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="pickupPoint"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
          autoWidth
          {...register("pickupPoint", { required: true })}
          defaultValue={10}
        >
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
        {errors.pickupPoint && (
          <span className="text-red-700">This field is required</span>
        )}
      </div>

      <div className="mb-6">
        <InputLabel
          htmlFor="gender"
          className="block text-gray-400 font-semibold mb-2"
        >
          Select Gender
        </InputLabel>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Male", "Female", "Others"].map((option) => (
            <div key={option} className="flex items-center">
              <Checkbox {...label} />
              <p>{option}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <InputLabel
          htmlFor="email"
          className="block text-gray-400 font-semibold mb-2"
        >
          Email
        </InputLabel>
        <TextField
          type="email"
          id="email"
          name="email"
          placeholder="Enter your Email"
          {...register("email", { required: true })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
          defaultValue=""
        />
        {errors.email && (
          <span className="text-red-700">This field is required</span>
        )}
      </div>

      <Button className="w-full font-bold" variant="contained" disableElevation>
        Confirm
      </Button>
    </div>


      <div>
      <div className="plane">
    <div className="select">
    
    </div>
  
  <ol>
    <li>
      <ol className="seats">
        <li className="seat" id="A1">
          <img src="https://i.ibb.co/gdJgK50/A1.png" alt="" />
          
        </li>
        <li className="seat" id="A2">
          <img src="https://i.ibb.co/4WLTmGs/A2.png" alt="" />
          
        </li>
        <li className="seat" id="A3">
          <img src="https://i.ibb.co/TWTfMts/A3.png" alt="" />
          
        </li>
        <li className="seat" id="A4">
          <img src="https://i.ibb.co/vhXJCcL/A4.png" alt="" />
          
        </li>
        
      </ol>
    </li>
    <li>
      <ol className="seats">
        <li className="seat" id="B1">
          <img src="https://i.ibb.co/bNC357G/B1.png" alt="" />
          
        </li>
        <li className="seat" id="B2">
          <img src="https://i.ibb.co/HgQVr1J/B2.png" alt="" />
          
        </li>
        <li className="seat" id="B3">
          <img src="https://i.ibb.co/bNNyBcV/B3.png" alt="" />
         
        </li>
        <li className="seat" id="B4">
          <img src="https://i.ibb.co/2KLtLvd/B4.png" alt="" />
    
        </li>
        
      </ol>
    </li>
    <li>
      <ol className="seats">
        <li className="seat" id="3A">
          <img src="" alt="" />
          <label >3A</label>
        </li>
        <li className="seat" id="3B">
          <img src="" alt="" />
          <label >3B</label>
        </li>
        <li className="seat" id="3C">
          <img src="" alt="" />
          <label >3C</label>
        </li>
        <li className="seat" id="3D">
          <img src="" alt="" />
          <label >3D</label>
        </li>
        
      </ol>
    </li>
    <li>
      <ol className="seats">
        <li className="seat" id="4A">
          <img src="" alt="" />
          <label >4A</label>
        </li>
        <li className="seat" id="4B">
          <img src="" alt="" />
          <label >4B</label>
        </li>
        <li className="seat" id="4C">
          <img src="" alt="" />
          <label >4C</label>
        </li>
        <li className="seat" id="4D">
          <img src="" alt="" />
          <label >4D</label>
        </li>
       
      </ol>
    </li>
    <li>
      <ol className="seats">
        <li className="seat" id="5A">
          <img src="" alt="" />
          <label >5A</label>
        </li>
        <li className="seat" id="5B">
          <img src="" alt="" />
          <label >5B</label>
        </li>
        <li className="seat" id="5C">
          <img src="" alt="" />
          <label >5C</label>
        </li>
        <li className="seat" id="5D">
          <img src="" alt="" />
          <label >5D</label>
        </li>
       
      </ol>
    </li>
    <li>
      <ol className="seats">
        <li className="seat" id="6A">
          <img src="" alt="" />
          <label >6A</label>
        </li>
        <li className="seat" id="6B">
          <img src="" alt="" />
          <label >6B</label>
        </li>
        <li className="seat" id="6C">
          <img src="" alt="" />
          <label >6C</label>
        </li>
        <li className="seat" id="6D">
          <img src="" alt="" />
          <label >6D</label>
        </li>
      
      </ol>
    </li>
    <li>
      <ol className="seats" id="7A">
        <li className="seat">
          <img src="" alt="" />
          <label >7A</label>
        </li>
        <li className="seat" id="7B">
          <img src="" alt="" />
          <label >7B</label>
        </li>
        <li className="seat" id="7C">
          <img src="" alt="" />
          <label >7C</label>
        </li>
        <li className="seat" id="7D">
          <img src="" alt="" />
          <label >7D</label>
        </li>
      
      </ol>
    </li>
    <li>
      <ol className="seats">
        <li className="seat" id="8A">
          <img src="" alt="" />
          <label >8A</label>
        </li>
        <li className="seat" id="8B">
          <img src="" alt="" />
          <label >8B</label>
        </li>
        <li className="seat" id="8C">
          <img src="" alt="" />
          <label >8C</label>
        </li>
        <li className="seat" id="8D">
          <img src="" alt="" />
          <label >8D</label>
        </li>
       
      </ol>
    </li>
    <li>
      <ol className="seats">
        <li className="seat" id="9A">
          <img src="" alt="" />
          <label >9A</label>
        </li>
        <li className="seat"id="9B">
          <img src="" alt="" />
          <label >9B</label>
        </li>
        <li className="seat"  id="9C">
          <input type="checkbox" />
          <label >9C</label>
        </li>
        <li className="seat" id="9D">
          <img src="" alt="" />
          <label >9D</label>
        </li>
       
      </ol>
    </li>
    <li>
      <ol className="seats">
        <li className="seat" id="10A">
          <img src="" alt="" />
          <label >10A</label>
        </li>
        <li className="seat" id="10B">
          <img src="" alt="" />
          <label >10B</label>
        </li>
        <li className="seat" id="10C">
          <img src="" alt="" />
          <label >10C</label>
        </li>
        <li className="seat" id="10D">
          <img src="" alt="" />
          <label>10D</label>
        </li>
       
      </ol>
    </li>
  </ol>
  
</div>
      </div>
    </div>
  );
};

export default FixSeat;
