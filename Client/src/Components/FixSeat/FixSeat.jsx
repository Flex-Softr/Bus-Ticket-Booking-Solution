import { Button, FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import './FixSeat.css'

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';



const FixSeat = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [seatingData, setSeatingData] = useState(null);

  useEffect(() => {
    // Fetch seating data or use the provided JSON directly
    // For example, you can fetch data from an API or use local data
    const fetchData = async () => {
      // Assuming the JSON is stored locally
      const response = await fetch('../../../public/seats.json');
      const data = await response.json();
      setSeatingData(data);
    };

    fetchData();
  }, []); // Empty dependency array means useEffect runs only once on mount


  const onSubmit = (data) => {
    console.log(data); // You can handle form submission logic here
  };
  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1">
     <form className='mt-16' onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400, height: 630, margin: 'auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <TextField
            fullWidth
            label="Journey Date"
            type="date"
            {...register("date", { required: true })}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.date && <span className="text-red-700">This field is required</span>}
        </Grid>

        <Grid item xs={12} >
          <TextField
            fullWidth
            label="Pickup Point"
            {...register("pickupPoint", { required: true })}
          />
          {errors.pickupPoint && <span className="text-red-700">This field is required</span>}
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Dropping Point"
            {...register("droppingPoint", { required: true })}
          />
          {errors.droppingPoint && <span className="text-red-700">This field is required</span>}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="SL Number"
            {...register("slNumber", { required: true })}
          />
          {errors.slNumber && <span className="text-red-700">This field is required</span>}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Passengers Name"
            {...register("passengersName", { required: true })}
          />
          {errors.passengersName && <span className="text-red-700">This field is required</span>}
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Passengers Number"
            {...register("passengersNumber", { required: true })}
          />
          {errors.passengersNumber && <span className="text-red-700">This field is required</span>}
        </Grid>

        <Grid item xs={12}>
          <RadioGroup row>
            <FormControlLabel
              control={<Radio {...register("gender", { required: true })} />}
              label="Male"
              value="Male"
            />
            <FormControlLabel
              control={<Radio {...register("gender", { required: true })} />}
              label="Female"
              value="Female"
            />
            <FormControlLabel
              control={<Radio {...register("gender", { required: true })} />}
              label="Others"
              value="Others"
            />
          </RadioGroup>
          {errors.gender && <span className="text-red-700">This field is required</span>}
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </form>


{/* bus seat======================================> */}
      <div>
      <div className="plane ps-8 pe-3 py-3 mt-20 ">
    <div className="select">
    
    </div>
  
  <ol >
  <li>
      <ol className="seats ">
        <li className="frontSiteofBus" >
          <h3 className='font-extrabold'>Door</h3>
        </li>
        <li className="frontSiteofBus" >
          <img className='steering-wheel ' src="https://i.ibb.co/wQHXVnv/wheel.png" alt="" />
        </li>
        
      </ol>
    </li>
    {/* <li>
      <ol className="seats gap-2">
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
      <ol className="seats gap-2">
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
      <ol className="seats gap-2">
        <li className="seat" id="C1">
          <img src="https://i.ibb.co/RgfBGhT/C1.png" alt="" />
          
        </li>
        <li className="seat" id="C2">
          <img src="https://i.ibb.co/y8cmrDx/C2.png" alt="" />
          
        </li>
        <li className="seat" id="C3">
          <img src="https://i.ibb.co/CtmrNK8/C3.png" alt="" />
         
        </li>
        <li className="seat" id="C4">
          <img src="https://i.ibb.co/bL4Hq3C/C4.png" alt="" />
        </li>
        
      </ol>
    </li>
    <li>
      <ol className="seats gap-2">
        <li className="seat" id="D1">
          <img src="https://i.ibb.co/kyZ6W0K/D1.png" alt="" />
          
        </li>
        <li className="seat" id="D2">
          <img src="https://i.ibb.co/xF7twF7/D2.png" alt="" />
       
        </li>
        <li className="seat" id="D3">
          <img src="https://i.ibb.co/DV9xm9j/D3.png" alt="" />
        
        </li>
        <li className="seat" id="D4">
          <img src="https://i.ibb.co/fGRghYw/D4.png" alt="" />
          
        </li>
       
      </ol>
    </li>
    <li>
      <ol className="seats gap-2">
        <li className="seat" id="E1">
          <img src="https://i.ibb.co/Jvd5kP6/E1.png" alt="" />
          
        </li>
        <li className="seat" id="E2">
          <img src="https://i.ibb.co/sj0Z1WR/E2.png" alt="" />
          
        </li>
        <li className="seat" id="E3">
          <img src="https://i.ibb.co/02Bk31w/E3.png" alt="" />
          
        </li>
        <li className="seat" id="E4">
          <img src="https://i.ibb.co/JpZ4BWB/E4.png" alt="" />
          
        </li>
       
      </ol>
    </li>
    <li>
      <ol className="seats gap-2">
        <li className="seat" id="F1">
          <img src="https://i.ibb.co/JCNXtHj/F1.png" alt="" />
        
        </li>
        <li className="seat" id="F2">
          <img src="https://i.ibb.co/8shdJzL/F2.png" alt="" />
          
        </li>
        <li className="seat" id="F3">
          <img src="https://i.ibb.co/1vQHJSz/F3.png" alt="" />
       
        </li>
        <li className="seat" id="F4">
          <img src="https://i.ibb.co/ZhBmF8B/F4.png" alt="" />
          
        </li>
      
      </ol>
    </li>
    <li>
      <ol className="seats gap-2" >
        <li className="seat" id="G1">
          <img src="https://i.ibb.co/bWtrmXb/G1.png" alt="" />
          
        </li>
        <li className="seat" id="G2">
          <img src="https://i.ibb.co/R3tS16D/G2.png" alt="" />
          
        </li>
        <li className="seat" id="G3">
          <img src="https://i.ibb.co/17qTtS5/G3.png" alt="" />
         
        </li>
        <li className="seat" id="G4">
          <img src="https://i.ibb.co/q0GHmBG/G4.png" alt="" />
          
        </li>
      
      </ol>
    </li>
    <li>
      <ol className="seats gap-2">
        <li className="seat" id="H1">
          <img src="https://i.ibb.co/XsK7Fj5/H1.png" alt="" />
         
        </li>
        <li className="seat" id="H2">
          <img src="https://i.ibb.co/Q8Jgzx3/H2.png" alt="" />
        
        </li>
        <li className="seat" id="H3">
          <img src="https://i.ibb.co/864S97K/H3.png" alt="" />
         
        </li>
        <li className="seat" id="H4">
          <img src="https://i.ibb.co/1QBL7LM/H4.png" alt="" />
         
        </li>
       
      </ol>
    </li>
    <li>
      <ol className="seats gap-2">
        <li className="seat" id="I1">
          <img src="https://i.ibb.co/CVpm1dC/I1.png" alt="" />
          
        </li>
        <li className="seat"id="I2">
          <img src="https://i.ibb.co/bWn2rrB/I2.png" alt="" />
        
        </li>
        <li className="seat" id="I3">
          <img src="https://i.ibb.co/t3KNBrx/I3.png" alt="" />
       
        </li>
        <li className="seat" id="I4">
          <img src="https://i.ibb.co/2vnV9bb/I4.png" alt="" />
          
        </li>
       
      </ol>
    </li>
    <li>
      <ol className="seats gap-2">
        <li className="seat" id="J1">
          <img src="https://i.ibb.co/j49fTLq/J1.png" alt="" />
          
        </li>
        <li className="seat" id="J2">
          <img src="https://i.ibb.co/PQkCKJY/J2.png" alt="" />
          
        </li>
        <li className="seat" id="J3">
          <img src="https://i.ibb.co/VH7FyV7/J3.png" alt="" />
         
        </li>
        <li className="seat" id="J4">
          <img src="https://i.ibb.co/9hsmzCm/J4.png" alt="" />
          
        </li>
       
      </ol>
    </li>
    <li>
      <ol className="seats gap-3 ms-8 mt-1">
        <li className="lastseat" id="K1">
          <img src="https://i.ibb.co/bNKq3rJ/K1.png" alt="" />
          
        </li>
        <li className="lastseat" id="K2">
          <img src="https://i.ibb.co/YPfcGWK/K2.png" alt="" />
          
        </li>
        <li className="lastseat" id="K3">
          <img src="https://i.ibb.co/Vx9PD5g/K3.png" alt="" />
         
        </li>
        <li className="lastseat" id="K4">
          <img src="https://i.ibb.co/d0B4zXm/K4.png" alt="" />
          
        </li>
        <li className="lastseat" id="K5">
          <img  src="https://i.ibb.co/6YfpBgd/K5.png" alt="" />
          
        </li>
       
      </ol>
    </li> */}


<div>
      {seatingData ? (
        <ul>
          {seatingData.seatingArrangement.map((row) => (
            <li key={row.row}>
              {/* <p>{`Row ${row.row}`}</p> */}
              <ol className="seats gap-2">
                {row.seats.map((seat) => (
                  <li key={seat.id} className="seat">
                    <img src={seat.imageSrc} alt="" />
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading seating data...</p>
      )}
    </div>

    
  </ol>
  
</div>
      </div>
    </div>
  );
};

export default FixSeat;