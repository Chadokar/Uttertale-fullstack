import React from 'react'
import { Button, Font } from '../../../styling/Styles'
import './NotificationPop.css'

function NotificationPop(props) {
    const isRequested = true;
  return (
    <div className='notificationpop' >
      <div className="flex items-center py-2 px-4 hedingnot">
        <p className={`${Font.font} ${Font.body2} ${Font.medium}`} >Notifications</p>
      </div>
      { isRequested &&
        <div className="noti-content">
            <div className="notleft">
                <img src="" alt="" style={{width:40,height:40,borderRadius:'50%'}} />
                <div className="notdetailbox">
                    <p className={`${Font.font} ${Font.body2} ${Font.medium}`} >Connection Request</p>
                    <p className={`${Font.font} ${Font.body2} ${Font.regular}`} >Nitin Sharma</p>
                </div>
            </div>
            <div className="notfright">
                <div className={`${Button.button} ${Button.secondary} ${Button.medium}`}>
                    <p className={`${Font.font} ${Font.body2} ${Font.medium}`} >View Profile</p>
                </div>
                <div className= {`${Button.button} ${Button.primary} ${Button.medium}`} >
                    <p className={`${Font.font} ${Font.body2} ${Font.medium}`} onClick={()=>props.setNotifPop(false)} >Accept</p>
                </div>
            </div>
        </div>
      }

      { dataNot.map((item,i)=>
        <>
        <div className="noti-content">
            <div className="notleft">
                <img src={item.imgLink} alt="" style={{width:40,height:40,borderRadius:'50%'}} />
                <div className="notdetailbox">
                    <p className={`${Font.font} ${Font.body2} ${Font.medium}`} >{item['notType']}</p>
                    <p className={`${Font.font} ${Font.body2} ${Font.regular}`} >{item['group']}</p>
                </div>
            </div>
            <div className={`${Button.button} ${Button.secondary} ${Button.medium}`}>
                <p className={`${Font.font} ${Font.body2} ${Font.medium}`} >View</p>
            </div>
        </div>
        </>
      )}

    </div>
  )
}


const dataNot = [
    {
        'imgLink':'',
        'notType':'Nitin Sharma has mentioned you',
        'group':'Group name',
    },
    {
        'imgLink':'',
        'notType':'Nitin Sharma has replied to your post',
        'group':'Group name',
    },
    {
        'imgLink':'',
        'notType':'Nitin Sharma has liked to your post',
        'group':'Group name',
    },
]

export default NotificationPop
