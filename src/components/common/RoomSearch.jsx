import React, {useState, useEffect, useRef} from "react";
import ApiService from "../../service/ApiService";
import {DayPicker} from "react-day-picker";
import "./Search.css";

const RoomSearch = ({ handSearchResult, twoRowLayout = false, extraActions = null }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState("");

  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [isRoomTypeOpen, setRoomTypeOpen] = useState(false);

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const roomTypeRef = useRef(null);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(Array.isArray(types) ? types : []);
      } catch (error) {
        console.log("Error fetching RoomTypes" + error);
      }
    };
    fetchRoomTypes();
  }, []);

  const handleClickOutside = (event) => {
    if (startDateRef.current && !startDateRef.current.contains(event.target)) {
      setStartDatePickerVisible(false);
    }
    if (endDateRef.current && !endDateRef.current.contains(event.target)) {
      setEndDatePickerVisible(false);
    }
    if (roomTypeRef.current && !roomTypeRef.current.contains(event.target)) {
      setRoomTypeOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, timeout);
  };

  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !roomType) {
      showError("Please select fields");
      return false;
    }

    try {
      const formattedStartDate = startDate
        ? startDate.toLocaleDateString("en-CA")
        : null;
      const formattedEndDate = endDate
        ? endDate.toLocaleDateString("en-CA")
        : null;

      const resp = await ApiService.getAvailableRooms(
        formattedStartDate,
        formattedEndDate,
        roomType
      );

      if (resp.status === 200) {
        if (resp.rooms.length === 0) {
          showError("Room type not currently available for the selected dates");
          return;
        }
        handSearchResult(resp.rooms);
        setError("");
      }
    } catch (error) {
      showError(error?.response?.data?.message || error.message);
    }
  };
  const fields = (
    <>
        <div className="search-field" ref={startDateRef}>
          <label>Check-in Date</label>
          {isStartDatePickerVisible && (
            <div className="datepicker-container">
              <DayPicker
                selected={startDate}
                onDayClick={(date) => {
                  setStartDate(date);
                  setStartDatePickerVisible(false);
                }}
                month={startDate}
              />
            </div>
          )}
          <div
            className="search-field-trigger"
            onClick={() => setStartDatePickerVisible((o) => !o)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setStartDatePickerVisible((o) => !o);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isStartDatePickerVisible}
          >
            {startDate ? startDate.toLocaleDateString() : "Select Check-In Date"}
          </div>
        </div>

        <div className="search-field" ref={endDateRef}>
          <label>Check-Out Date</label>
          {isEndDatePickerVisible && (
            <div className="datepicker-container">
              <DayPicker
                selected={endDate}
                onDayClick={(date) => {
                  setEndDate(date);
                  setEndDatePickerVisible(false);
                }}
                month={startDate}
              />
            </div>
          )}
          <div
            className="search-field-trigger"
            onClick={() => setEndDatePickerVisible((o) => !o)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setEndDatePickerVisible((o) => !o);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isEndDatePickerVisible}
          >
            {endDate ? endDate.toLocaleDateString() : "Select Check-Out Date"}
          </div>
        </div>

        <div className="search-field" ref={roomTypeRef}>
          <label>Room Type</label>
          <div
            className="search-field-trigger"
            onClick={() => setRoomTypeOpen((o) => !o)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setRoomTypeOpen((o) => !o);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isRoomTypeOpen}
            aria-haspopup="listbox"
          >
            {roomType || "Select Room Type"}
          </div>
          {isRoomTypeOpen && (
            <div className="search-field-dropdown" role="listbox">
              <button
                type="button"
                className={`search-field-option ${!roomType ? "selected" : ""}`}
                onClick={() => {
                  setRoomType("");
                  setRoomTypeOpen(false);
                }}
              >
                Select Room Type
              </button>
              {roomTypes.map((type) => (
                <button
                  type="button"
                  key={type}
                  className={`search-field-option ${roomType === type ? "selected" : ""}`}
                  onClick={() => {
                    setRoomType(type);
                    setRoomTypeOpen(false);
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
    </>
  );

  const searchButton = (
    <button className="home-search-button" onClick={handleInternalSearch}>
      Search Rooms
    </button>
  );

  return (
    <section className={twoRowLayout ? "search-two-rows" : ""}>
      {twoRowLayout ? (
        <>
          <div className="search-fields-row">
            <div className="search-container">{fields}</div>
          </div>
          <div className="search-actions-row">
            {searchButton}
            {extraActions}
          </div>
        </>
      ) : (
        <div className="search-container">
          {fields}
          {searchButton}
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </section>
  );
};


export default RoomSearch;
