import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {getUser} from "../../feature/user/user.slice";
import ShipItems from '../ship.items.component/ship.items.component';

export default function Home() {

  const dispatch = useDispatch();
  const {userLoading, user, error} = useSelector(state => state.user);
  const navigate = useNavigate()

    useEffect(()=>{
      dispatch(getUser())
      .unwrap()
      .then(
        ()=>{},
        ()=>{
          navigate("/login");
        }
      )
    }, [])
  return (
    <div>
      { user && <ShipItems />}
    </div>
  )
}
