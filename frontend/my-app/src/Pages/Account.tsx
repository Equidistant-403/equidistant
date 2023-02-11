import React, { useState } from 'react'
import './Account.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Account: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>(location.state.email)
  const [userLocation, setLocation] = useState<string>(location.state.location)
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')

  const handleDeleteAccount = (): void => {
    console.log('Delete Account dummy function')
  }

  const handleUploadImage = (): void => {
    console.log('Upload Image dummy function')
  }

  const handleBack = (): void => {
    console.log('Back dummy function')
    navigate(-1)
  }

  const handleUpdateEmail = (): void => {
    console.log('Update Email dummy function')
  }

  const handleUpdateLocation = (): void => {
    console.log('Update Location dummy function')
  }

  const handleUpdatePassword = (): void => {
    console.log('Update Password dummy function')
  }

  return (
        <div className="container">
        <div className="left-column">
            <button className="upload-image" onClick={handleUploadImage}>
                Upload Image
            </button>
            <button className="delete-account" onClick={handleDeleteAccount}>
                Delete Account
            </button>
            <button className="back" onClick={handleBack}>
                Back
            </button>
        </div>
        <div className="right-column">
            <div className="title">Username</div>
            <div className="email-address-title">Email Address</div>
            <input
                className="email-address"
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value) }}
                placeholder="Email"
            />
            <button className="update-email" onClick={handleUpdateEmail}>
            Update
            </button>
            <div className="location-title">Location</div>
            <input
                className="location"
                type="location"
                value={userLocation}
                onChange={e => { setLocation(e.target.value) }}
                placeholder="Location"
            />
            <button className="update-location" onClick={handleUpdateLocation}>
            Update
            </button>
            <div className="password-title">Update Password</div>
            <input
                type="password"
                className="password"
                value={password}
                onChange={e => { setPassword(e.target.value) }}
                placeholder="Password"
            />
            <input
                type="password"
                className="password-confirm"
                value={passwordConfirm}
                onChange={e => { setPasswordConfirm(e.target.value) }}
                placeholder="Confirm Password"
            />
            <button className="update-password" onClick={handleUpdatePassword}>
            Update
            </button>
        </div>
        </div>
  )
}

export default Account
