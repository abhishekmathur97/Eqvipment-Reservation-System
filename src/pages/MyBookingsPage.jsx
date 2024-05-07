import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/search-bar/SearchBar';
import List from '../components/list/List';
import { bookingActions } from '../store/bookingSlice';

const dummyBookings = [{
    id: 1,
    bookedBy: 'galinaleespb@gmail.com',
    bookingDates: null,  
    equipmentId: 1,
    status: 'pending',
}];

const MyBookingsPage = () => {
    const bookings = useSelector(state => state.bookings.bookingList);
    const [ filteredList, setFilteredList ] = useState([]);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClick = (e, id) => {
        e.preventDefault();
        navigate(`/my-bookings/${id}`);
    }

    useEffect(() => {
        setFilteredList(bookings);
    }, [bookings])

    useEffect(() => {
        try {
          // with backend
        //   getUsers(localStorage.getItem('token')).then(res => {
        //     dispatch(userActions.setUsers(res));
        //   });
          // for testing without backend
          dispatch(bookingActions.setBookings(dummyBookings));
        } catch (error) {
          console.log(error);
        }
    }, []);

    return (
        <section>
            <SearchBar initialList={bookings}
                       filteredList={filteredList} 
                       setFilteredList={setFilteredList}/>
            <List items={filteredList} type='bookings' onClick={onClick}/>
        </section>
    )
}

export default MyBookingsPage;