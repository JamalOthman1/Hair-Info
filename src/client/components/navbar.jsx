import {Link} from 'react-router-dom'
import allItems from '../assets/toiletries.png'
import Account from '../assets/woman.png'

export default function NavBar() {
    return <div className='linkBar'><nav>
    <Link to='/'></Link>
    <Link to='/login/register'></Link>
    <div className='icons'>
        <div>
        <Link className='loginLink' to='/account'><img className='icon' src={Account}/></Link>
        </div>
        <div>
        <Link to='/items'><img className='icon' src={allItems} /></Link>
        </div>
    </div>
    
    
</nav></div>
    
}