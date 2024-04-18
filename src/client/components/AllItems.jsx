
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllItemsComponent() {
    const {category} = useParams('');
    
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    
    
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/api/items', {
                    params: {
                        category: category,
                        search: search
                    }
                }); 
                console.log('items', response.data);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, [category, search]); 

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="search-bar">
            <h1>Product Gallery</h1>
            <input
                id='search'
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="What are you looking for..."
                list="search-suggestions"
                autoComplete="off"
            />
            <datalist id="search-suggestions">
                <option value="shampoo"></option>
                <option value="conditioner"></option>
            </datalist>
        
            <div className='search-button'>
                <button>Search</button>
            </div>

            <div className="items-container">
                {filteredItems.map((item) => (
                    <Link to= {`/items/${item.id}`} key={item.id}>
                    <div className="item-card" key={item.id}>
                        <img className="item-image" src={item.picture} alt={item.name} />
                        <div className="item-details">
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                            <p>Brand: {item.brand}</p>
                            <p>Category: {item.category}</p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );

}