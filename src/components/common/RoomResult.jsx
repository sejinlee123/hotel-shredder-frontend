import React from "react";
import ApiService from "../../service/ApiService";
import {useNavigate} from "react-router-dom";
import "./RoomResult.css";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || "";


const RoomResult = ({roomSearchResults}) => {
  const navigate = useNavigate();
  const isAdmin = ApiService.isAdmin();

  const roomsArray = Array.isArray(roomSearchResults)
    ? roomSearchResults
    : [];

  return (
    <section className="room-results">
      {roomsArray.length > 0 && (
        <div className="room-list">
          {roomsArray.map((room) => (
                    <div className="room-list-item" key={room.id}>
                        <img
                          className="room-list-item-image"
                          src={`${BACKEND_BASE_URL}${room.imageUrl}`}
                          alt={room.roomNumber}
                        />
                        <div className="room-details">
                            <h3>{room.type}</h3>
                            <p>Price: ${room.pricePerNight}/Night</p>
                            <p>Description: {room.description}</p>
                        </div>

                        <div className="book-now-div">
                            {isAdmin ? (
                                <button className="edit-room-button" 
                                onClick={() => navigate(`/admin/edit-room/${room.id}`)}>
                                        Edit Room
                                </button>
                            ): (
                                <button className="book-now-button" 
                                onClick={() => navigate(`/room-details/${room.id}`)}>
                                        View/Book Now
                                </button>

                            )}
                        </div>
                    </div>
                ))}
            </div>
            )}
        </section>
    );

}
export default RoomResult;