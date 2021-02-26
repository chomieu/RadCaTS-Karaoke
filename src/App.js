import React, { useEffect, useState } from "react";
import './App.css';
import API from "./utils/API"
import Header from "./components/Header";
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import Logout from "./components/Logout"
import Search from "./components/Search"
import FileDrop from "./components/FileDrop";
import Preloader from "./components/Preloader"
import AudioPlayer from "./components/AudioPlayer"


function App() {

  const [songData, setSongData] = useState([
    {
      name: 'baby shark - pink fong',
      id: '12234'
    },
    {
      name: 'baby - justin bieber',
      id: '123yugsdf'
    }
  ])
  const [userState, setUserState] = useState({
    id: "",
    token: "",
    username: "",
    isLoggedIn: false,
    profilePicture: ""
  })
  const [display, setDisplay] = useState({
    audioPlayer: false,
    fileDrop: false,
    loading: false,
    logout: false,
    search: false,
    signInBtns: false
  })

  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log(token)
    if (token) {
      API.checkWebToken(token)
        .then(res => {
          loginSuccess(res)
          // API.getAllSongs()
          //   .then(data => {
          //     const formatted = data.map(song => {

          //     })
          //   })
          //   .catch(err => { console.log(err) })
          const data = {}
          songData.map(song => {
            data[`"${song.name}"`] = song.id
          })

          setSongData(data)

        })
        .catch(err => {
          console.log('!!!!!!!!!!!!!!')
          logoutUser(err)
        })


    } else { userLoginPage() }

  }, [])

  const userLoginPage = () => {
    setDisplay({
      ...display,
      audioPlayer: false,
      signInBtns: true,
      loading: false,
      search: false,
      logout: false
    })
  }

  const loginSuccess = (res) => {
    console.log(res)
    localStorage.setItem("token", res.data.token)
    setDisplay({
      ...display,
      signInBtns: false,
      loading: false,
      search: true,
      logout: true
    })
    setUserState({
      isLoggedIn: true,
      id: res.data.user.id,
      token: res.data.token,
      username: res.data.user.username,
      profilePicture: res.data.user.profilePicture
    })


  }

  const logoutUser = (err) => {
    localStorage.removeItem("token");
    if (err) { console.log(err) };
    userLoginPage()
    setUserState({
      isLoggedIn: false,
      email: '',
      token: '',
      id: ''
    })
  }


  return (
    <div className="App center-align">
      <Header userState={userState} />

      {display.signInBtns
        ? <>
          <SignUp
            display={display}
            setDisplay={setDisplay}
            loginSuccess={loginSuccess}
            logoutUser={logoutUser}
          />
          <SignIn
            display={display}
            setDisplay={setDisplay}
            loginSuccess={loginSuccess}
            logoutUser={logoutUser}
          />
        </>
        : null}

      {display.loading ? <Preloader /> : null}

      {display.search
        ? <Search
          display={display}
          songData={songData}
          userState={userState}
          setDisplay={setDisplay}
          setSongData={setSongData}
        />
        : null
      }

      {display.audioPlayer ? <AudioPlayer songData={songData} /> : null}

      {display.logout
        ? <Logout
          display={display}
          userState={userState}
          setDisplay={setDisplay}
          logoutUser={logoutUser}
        />
        : null}

      {display.fileDrop ? <FileDrop /> : null}

    </div>
  );
}

export default App;