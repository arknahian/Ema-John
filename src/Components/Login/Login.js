import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "./Firebase.config";
initializeApp(firebaseConfig);

const Login = () => {

    const [user, setUser] = useState({
        isSignedIn: false,
        name : '',
        email : '',
        password : '',
        photo : '',
        error : false,
    });

    const [newUser, setNewUser] = useState(false);

    const [newUserReg, setNewUserReg] = useState({
        isSignedIn : false,
        name : '',
        email : '',
        password : '',
        error : false,
    });

    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    // sign in with google 
    const handleWithPopup = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const {displayName, email, photoURL} = user;
                setUser({
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                });
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                setUser({
                    error : credential,
                })
            });

    }


    // sign Out
    const handleSignOut = () => {
        signOut(auth).then(() => {
            setUser({
                isSignedIn: false,
            })
          }).catch((error) => {

          });
    }

    // create new user by email and password
    const validationCheck = (event) => {
        let isValid = false;
        if (event.target.name === "name") {
            isValid = true;
        }
        if (event.target.name === "email") {
            const regX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value);
            isValid = regX;
        }
        if (event.target.name === "password") {
            const regXP = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(event.target.value);
            isValid= regXP;
            
        }
        if (isValid) {
            const signingUser = {...newUserReg};
            signingUser[event.target.name] = event.target.value;
            signingUser.isSignedIn = true;
            setNewUserReg(signingUser)
            console.log(newUserReg)
        }
        if (isValid === false) {
            const signingUser = {...newUserReg};
            signingUser[event.target.name] = `Invalid ${event.target.name}` ;
            signingUser.isSignedIn = true;
            signingUser.error = true;
            setNewUserReg(signingUser)
            console.log(newUserReg)
        }
    }

    const handleSignUp = (event) => {
        const {isSignedIn, name, email, password, error} = newUserReg;
        setUser({
            isSignedIn : isSignedIn,
            name : name,
            email : email,
            password: password,
            error : error,
        })
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
        event.preventDefault()
    }
    const {name, email, photo} = user;


    return (
        <div style={{ textAlign: 'center' }}>

            {
                user.isSignedIn && user.error === false && <div className="welcome-section">
                <h1>Welcome {name}</h1>
                <img src={photo} alt="" />
                <h2>Email {email}</h2>
                <button onClick={handleSignOut}>Sign Out</button>
                </div>
            }

            {
                user.error && <div style={{color: "red"}}>
                    <h1>Sorry Something went wrong</h1>
                    <h1>{email}</h1>
                    <a href="">Go Back!</a>
                </div>
            }

            {
                user.isSignedIn === false && <div>
                    <button onClick={handleWithPopup}>Log In with Google</button>
                    <button>Log In With Facebook</button>



                <h1>Own Auth</h1>
        <form action="">
            <input onChange={() => setNewUser(!newUser)} type="checkbox" name="checkbox" id="" />
                <label htmlFor="">New User</label>
                <br />
            {
                newUser && <input onBlur={validationCheck} type="text" name="name" id="name" placeholder="Your Name" />
            }
                <br />
            <input onBlur={validationCheck} type="email" placeholder="Type your Email" name="email"/>
                <br />
            <input type="password" name="password" id="" placeholder="Enter your password" />
                <br />
            {
                newUser ? <input onClick={handleSignUp} type="submit" value="Sign Up" />
                : <input type="submit" value="Log In" />
            }
        </form>
                </div>
            }

            
            
        </div>
    );
};

export default Login;