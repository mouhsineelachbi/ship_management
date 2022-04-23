import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getUser} from "../../feature/user/user.slice";
import ShipItems from '../ship.items.component/ship.items.component';

export default function Home() {

  const dispatch = useDispatch();
  const {userLoading, user, error} = useSelector(state => state.user);

    useEffect(()=>{
      dispatch(getUser())
      .then(
        ()=>{},
        ()=>{
          
        }
      )
    }, [])
  return (
    <div>
      { user && <ShipItems />}
    </div>
  )
}
