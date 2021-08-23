import React, { Fragment, useState, useEffect } from 'react';
import man from '../../assets/images/dashboard/profile.jpg'
import { toast } from 'react-toastify';
import axios from 'axios';
import { FileText, LogIn, Mail, User, Bell, Minimize, Search, X } from 'react-feather';
import { useHistory } from 'react-router-dom'
import Avatar from 'react-avatar';
import {Link} from 'react-router-dom'

import {
  setTranslations,
  setDefaultLanguage,
  setLanguageCookie,
  setLanguage,
  translate,
} from 'react-switch-lang';

import {English,Deutsch,Español,Français,Português,简体中文,Notification,DeliveryProcessing,OrderComplete,TicketsGenerated,DeliveryComplete,CheckAllNotification,ViewAll,MessageBox,EricaHughes,KoriThomas,Admin,Account,Inbox,Taskboard,LogOut,AinChavez,CheckOut,ShopingBag,OrderTotal,GoToShopingBag} from '../../constant'

import en from '../../assets/i18n/en.json';
import es from '../../assets/i18n/es.json';
import pt from '../../assets/i18n/pt.json';
import fr from '../../assets/i18n/fr.json';
import du from '../../assets/i18n/du.json';
import cn from '../../assets/i18n/cn.json';
import ae from '../../assets/i18n/ae.json';
import { InputGroup, InputGroupAddon, Button } from 'reactstrap';

setTranslations({ en, es, pt, fr, du, cn, ae });
setDefaultLanguage('en');
setLanguageCookie();



const api = axios.create({
  baseURL:`https://afya-kwanza-backend.herokuapp.com`
})


const Rightbar = (props) => {    

  
  const history = useHistory();
  const [profile, setProfile] = useState('');
  const [searchresponsive, setSearchresponsive] = useState(false)
  const [langdropdown, setLangdropdown] = useState(false)
  const [moonlight, setMoonlight] = useState(false)
  const [selected, setSelected] = useState("en")
  const [cartDropdown, setCartDropDown] = useState(false)
  const [notificationDropDown, setNotificationDropDown] = useState(false)
  const [token, setToken] = useState('')
  const [first_name, setFirstname] = useState('')
  const [last_name, setLastname] = useState('')
  const [role, setRole] = useState('')




  useEffect(() => {

    setFirstname(localStorage.first_name)
    setLastname(localStorage.last_name)

  }, [first_name, last_name])


  // useEffect(() => {
  //   setProfile(localStorage.getItem('profileURL') || man);
  //   setName(localStorage.getItem('Name'))
  //   if(localStorage.getItem("layout_version") === "dark-only"){
  //     setMoonlight(true)
  //   }
  // }, []);


  const UserMenuRedirect = (redirect) => {
    history.push(redirect)
  }

  //full screen function
  function goFull() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const SeacrhResposive = (searchresponsive) => {
    if (searchresponsive) {
      setSearchresponsive(!searchresponsive)
      document.querySelector(".search-full").classList.add("open");
      document.querySelector(".more_lang").classList.remove("active");
    } else {
      setSearchresponsive(!searchresponsive)
      document.querySelector(".search-full").classList.remove("open");
    }
  }

  const logout = ()=>{
      localStorage.removeItem('tokenated');
      // localStorage.removeItem('firstname')
      // localStorage.removeItem('firstname_update')
      // localStorage.removeItem('lastname')
      // localStorage.removeItem('lastname_update')
      // localStorage.removeItem('role')
      history.push('/login')
  }

  const MoonlightToggle = (light) => {
    if (light) {
      setMoonlight(!light)
      document.body.className = "light"
      localStorage.setItem('layout_version', 'light');
    } else {
      setMoonlight(!light)
      document.body.className = "dark-only"
      localStorage.setItem('layout_version', 'dark-only');
    }
  }

  return (
    <Fragment>
      <div className="nav-right col-8 pull-right right-header p-0">
        <ul className="nav-menus">
          {/* <li><span className="header-search"><Search onClick={() => SeacrhResposive(searchresponsive)} /></span></li>
          <li className="onhover-dropdown">
            <div className="notification-box" onClick={() => setNotificationDropDown(!notificationDropDown)}><Bell /><span className="badge badge-pill badge-secondary">2</span></div>
            <ul className={`notification-dropdown onhover-show-div ${notificationDropDown ? "active" : ""}`}>
              <li>
                <Bell />
                <h6 className="f-18 mb-0">{Notification}</h6>
              </li>
              <li>
                <p><i className="fa fa-circle-o mr-3 font-primary"> </i>{DeliveryProcessing} <span className="pull-right">{"10 min."}</span></p>
              </li>
              <li>
                <p><i className="fa fa-circle-o mr-3 font-success"></i>{OrderComplete}<span className="pull-right">{"1 hr"}</span></p>
              </li>
              <li>
                <p><i className="fa fa-circle-o mr-3 font-info"></i>{TicketsGenerated}<span className="pull-right">{"3 hr"}</span></p>
              </li>
              <li>
                <p><i className="fa fa-circle-o mr-3 font-danger"></i>{DeliveryComplete}<span className="pull-right">{"6 hr"}</span></p>
              </li>
              <li><button className="btn btn-primary" >{CheckAllNotification}</button>
              </li>
            </ul>
          </li> */}
          {/* <li>
            <div className="mode" onClick={() => MoonlightToggle(moonlight)}><i className={`fa ${moonlight ? 'fa-lightbulb-o' : 'fa-moon-o'}`}></i></div>
          </li> */}
          <li className="maximize"><a className="text-dark" href="#javascript" onClick={goFull}><Minimize /></a></li>
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
            <Avatar maxInitials={1} size={40} round={true} name={first_name}  color={'gray'}/> 
              {/* <img className="b-r-10" src={ profile} alt="" /> */}
              <div className="media-body"><span>{first_name} {last_name}</span>
                <p className="mb-0 font-roboto">Sacco Admin <i className="middle fa fa-angle-down"></i></p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              <li onClick={() => UserMenuRedirect(`/dashboard/sacco/profile`)}><User /><span>Profile </span></li>
              {/* <li onClick={() => UserMenuRedirect(`/app/email-app`)}><Mail /><span>{Inbox}</span></li>
              <li onClick={() => UserMenuRedirect(`/app/todo-app/todo`)}><FileText /><span>{Taskboard}</span></li> */}
              <li onClick={logout} ><LogIn /><span>Log Out</span></li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>

  );
}
export default translate(Rightbar);