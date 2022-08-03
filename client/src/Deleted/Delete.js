import React , {useContext} from 'react';
import './style.css';
import { store } from '../Table/contact';
import axios from 'axios';

const Delete = (props) => {
    const [popup, setpopup]=useContext(store)
    
    const deleteHandler=()=>{
        
        const DelArr = props.value.map((element,i)=>{
            return {'_id': element};
        })
        console.log(DelArr)
        const authToken = localStorage.getItem('user')
        axios({
            method:"POST",
            url:"http://localhost:3003/user/delete",
            headers:{
                authorization:authToken
            },
            data:DelArr

        }).then(()=>{
            setpopup(4)
            document.getElementById("name").checked = false;
            let parent = document.getElementById("my_body")
            const inputelements = parent.getElementsByTagName("input")
            Array.from(inputelements).forEach((item) => {
                item.checked = false;
            })
        }).catch((err)=>{
            console.log(err)
        })
    }


    return (popup === 3)?(
        <div className='Delete-many'>
            <div>
                <p><i className='material-icons delete-icon'>delete</i></p>
                <h3>Delete Contacts</h3>
                <p className='content-delete'>Sure you want delete this Contacts ?</p>
                <p><span><button className='delete-many' onClick={()=>setpopup(0)}>Cancel</button></span>
                <span>
                    <button className='delete-many-ok' onClick={deleteHandler}>Ok</button>
                </span></p>
            </div>
        </div>
      ):""
}

export default Delete
