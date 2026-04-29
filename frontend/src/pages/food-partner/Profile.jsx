import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Profile.css'
import axios from 'axios'

const Profile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [videos, setVideos] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/food-partner/${id}`, {withCredentials: true})
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
            })
            .catch(error => {
                console.error('Failed to fetch profile:', error)
            })
    }, [id]);
  return (
    <div className="profile-page">
      <section className="profile-header">
        <div className="profile-card">
          <div className="profile-avatar" aria-hidden="true">
                <img src="https://media.istockphoto.com/id/2162915589/photo/welcome-to-my-cafe.webp?a=1&b=1&s=612x612&w=0&k=20&c=7WMmeazdYoVhbRLvn7Q5UCDHxK0jfdbivVsDQRSNK18=" alt="" />
          </div>

          <div className="profile-info">
            <div className="profile-businessName">{profile?.name || 'unknown'}</div>
            <div className="profile-address">Address: {profile?.address || 'unknown'}</div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="profile-stat">
            <span className="stat-label">total meals</span>
            <span className="stat-value">{profile?.totalMeals || 'unknown'}</span>

          </div>
          <div className="profile-stat">
            <span className="stat-label">customer serve</span>
            <span className="stat-value">{profile?.customerServed || 'unknown'}</span>
          </div>
        </div>
      </section>

      <section className="profile-videos">
        {videos.length > 0 ? (
            videos.map((item) => (
          
         <div className="video-card-body">
              <video
              src={item.video}
               controls
             className="profile-video"
        />
      </div>
  ))
) : (
  <p>No videos uploaded yet</p>
)}
      </section>
    </div>
  )
}

export default Profile