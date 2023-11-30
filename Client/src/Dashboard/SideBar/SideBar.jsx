import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import BusAlertIcon from '@mui/icons-material/BusAlert';
import { Link } from 'react-router-dom';

const SideBar = () => {


  return (
    
        <List className='flex justify-between flex-col pt-5 h-screen bg-blue-500 sticky top-0'>
          <div>
          <Tooltip title="Dashboard" placement="right">
              <ListItem button component={Link} to="/dashboard">
                <ListItemIcon style={{ color: 'white' }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText className='md:block hidden' primary="Dashboard" style={{ color: 'white' }} />
              </ListItem>
            </Tooltip>
        

        
            <Tooltip title="Add Bus" placement="right">
              <ListItem button component={Link} to="/dashboard/addbus">
                <ListItemIcon style={{ color: 'white' }}>
                  <BusAlertIcon />
                </ListItemIcon>
                <ListItemText primary="Add Bus" className='md:block hidden' style={{ color: 'white' }} />
              </ListItem>
            </Tooltip>
        

          </div>
        
            <Tooltip className="py-3" style={{ borderTop: "1px dashed white" }} title="Home" placement="right">
              <ListItem button component={Link} to="/">
                <ListItemIcon style={{ color: 'white' }}>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="home" className='md:block hidden' style={{ color: 'white' }} />
              </ListItem>
            </Tooltip>
        </List>
  );
};

export default SideBar;
