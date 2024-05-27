import DataTable from '../../components/DataTable/DataTable';
import Navbar from '../../components/navbar/Navbar';
import SideBar from '../../components/sidebar/SideBar';
import './List.scss';

const List = ({columns}) => {
  return (
    <div className='list'>
      <SideBar/>
      <div className="listContainer">
        <Navbar/>
        <DataTable columns={columns}/>
      </div>
    </div>
  );
}

export default List;
