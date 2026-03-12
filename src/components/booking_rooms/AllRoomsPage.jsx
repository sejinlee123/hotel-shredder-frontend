import React, {useState, useEffect} from "react";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";
import "./AllRoomsPage.css";

const AllRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(9);

  const handleSearchResult = (results) => {
    setRooms(results);
    setFilteredRooms(results);
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const resp = await ApiService.getAllRooms();
        const roomsData = Array.isArray(resp.rooms) ? resp.rooms : [];
        setRooms(roomsData);
        setFilteredRooms(roomsData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(Array.isArray(types) ? types : []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
    fetchRoomTypes();
  }, []);

  const handleRoomTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedRoomType(selectedType);
    filterRooms(selectedType);
  };

  const filterRooms = (type) => {
    const baseRooms = Array.isArray(rooms) ? rooms : [];
    if (type === "") {
      setFilteredRooms(baseRooms);
    } else {
      const filtered = baseRooms.filter((room) => room.type === type);
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  };

  const safeFilteredRooms = Array.isArray(filteredRooms) ? filteredRooms : [];
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = safeFilteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="all-rooms">
      <h2>All Rooms</h2>

      <div className="all-room-filter-div">
        <label>Filter By Room Type</label>
        <select value={selectedRoomType} onChange={handleRoomTypeChange}>
          <option value="">All</option>
          {roomTypes.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <RoomSearch handSearchResult={handleSearchResult} />
      <RoomResult roomSearchResults={currentRooms} />

      <Pagination
        roomPerPage={roomsPerPage}
        totalRooms={safeFilteredRooms.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default AllRoomsPage;
