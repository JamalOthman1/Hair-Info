import scroll1 from '../assets/red.jpg'
import scroll2 from '../assets/curly.webp'
import scroll3 from '../assets/1c8520cb5634bb92dc250fd1ee37f89d.png'
import scroll4 from '../assets/1000_F_116056127_HVwas5yIPJmO0AgL55B4VZUOPvAIfV5m.jpg'
import scroll5 from '../assets/stephylately.webp'
import scroll6 from '../assets/short.png'

export default function HomePage() {
    
    return <>
    <div class="banner-heading">
        <h3>Discover New Products and Community Engagement,
             All While Finding What Works For You</h3>
    </div>

    <div className='scroll'>
  <div className='flex-container_1'>
    <div className='container'>
      <div className='photobanner'>
        <img className='simg first' src={scroll1} alt="Image 1" />
        <img className='simg' src={scroll2} alt="Image 2" />
        <img className='simg' src={scroll3} alt="Image 3" />
        <img className='simg' src={scroll4} alt="Image 4" />
        <img className='simg' src={scroll5} alt="Image 5" />
        <img className='simg' src={scroll6} alt="Image 6" />
        <img className='simg' src={scroll1} alt="Image 1" />
        <img className='simg' src={scroll2} alt="Image 2" />
        <img className='simg' src={scroll3} alt="Image 3" />
        <img className='simg' src={scroll4} alt="Image 4" />
        <img className='simg' src={scroll5} alt="Image 5" />
        <img className='simg' src={scroll6} alt="Image 6" />
      </div>
    </div>
  </div>
</div>

    </>
}