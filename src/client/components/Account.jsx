import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'


function Account({token}) {
  const [selectedOption, setSelectedOption] = useState({
  hairtype: '',
  hairtexture: '',
  haircolor: '',
  hairlength: '',
  hairgoals: '',
});

const [reviews, setReviews] = useState([]);
const [comments, setComments] = useState([]);

useEffect (() => {
  if (token)
    fetchReviewsAndComments()
},[token]);

const fetchReviewsAndComments = async () => {
  try {
   // const token = localStorage.getItem('token');
   console.log('token', token) 
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const responseReviews = await axios.get(`/api/users/reviews`, config);
    console.log('Response reviews:', responseReviews.data);
    setReviews(responseReviews.data);

    const responseComments = await axios.get('/api/users/comments', config);
    console.log('Response comments:', responseComments.data);
    setComments(responseComments.data);
  } catch (error) {
    console.error('Error fetching reviews and comments:', error);
  }
};

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users/account', selectedOption)
      console.log('Submitted data:', response.data);
    } catch(error) {
      console.error('Error submitting hair profile:', error)
    }
  
    // You can send this data to an API or perform other actions.
  };
  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedOption((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return <>
  <h1>Hair Profile</h1>
  <form onSubmit={handleSubmit}>
      <input
      type='text'
      name='hairtype' 
      placeholder='Hair Type'
      list='hairType'
      value={selectedOption.hairtype}
      onChange={handleInputChange}>
      </input>
      <datalist id='hairType'>
          <option value='Straight'/>
          <option value='Wavy'/>
          <option value='Curly'/>
          <option value='Coiled'/>
      </datalist>
      <input 
      type='text'
      name='hairtexture'
      placeholder='Hair Texture'
      list='hairTexture'
      value={selectedOption.hairtexture}
      onChange={handleInputChange}>
      </input>
      <datalist id='hairTexture'>
          <option value='Fine'/>
          <option value='Medium'/>
          <option value='Thick'/>
      </datalist>
      <input 
      type='text'
      name='haircolor'
      placeholder='Hair Color'
      list='hairColor'
      value={selectedOption.haircolor}
      onChange={handleInputChange}>
      </input>
      <datalist id='hairColor'>
      <option value='Black'/> 
      <option value='Brown'/> 
      <option value='Red'/>
      <option value='Blonde'/>
      <option value='Grey'/> 
      <option value='Dyed'/> 
      </datalist>
      <input 
      type='text'
      name='hairlength'
      placeholder='hairLength'
      list='hairLength'
      value={selectedOption.hairlength}
      onChange={handleInputChange}>
      </input>
      <datalist id='hairLength'>
      <option value='Short'/> 
      <option value='Ear Length'/> 
      <option value='Shoulder Length'/>
      <option value='Down Your Back'/>
      </datalist>
      <input 
      type='text'
      name='hairgoals'
      placeholder='Hair Goals'
      value={selectedOption.hairgoals}
      onChange={handleInputChange}>
      </input>
      <button className='accButton' type='submit'>Submit</button>
  </form>
  <div className="reviews-comments-container">
  <h2>Your Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id} className='review-item'>
            <p>Rating: {review.rating}</p>
            <p>{review.reviewtext}</p>
          </li>
        ))}
      </ul>
      <h2>Your Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className='comment-item'>
            <p>{comment.commenttext}</p>
          </li>
        ))}
      </ul>
      </div>
  <a href='/login'><button>Login</button></a>
  </>
}
export default Account;
