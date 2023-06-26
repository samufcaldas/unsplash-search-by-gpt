import React, {useState} from 'react';
import axios from 'axios';
import {format} from 'date-fns';
import './App.css';

function App() {
    const [query, setQuery] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `https://api.unsplash.com/photos/random?client_id=0by61bfgkaLu9c4X0SjHiitiwKZzsAEksOB1kP5XNjw&query=${query}`
            );

            const image = response.data.urls.regular;
            setImageUrl(image);
            setAuthor(response.data.user.name);
            setDate(response.data.created_at);

            const createdAt = new Date(response.data.created_at);
            setDate(format(createdAt, 'dd/MM/yyyy'));

        } catch (error) {
            console.error(error);
        }
    };

    const [author, setAuthor] = useState('');

    return (
        <div className="container">
            <h1>Unsplash Image Search</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter a search term"
                />
                <button type="submit">Search</button>
            </form>
            {imageUrl && (
                <div className="image-wrapper">
                    <img src={imageUrl} alt="Unsplash"/>
                    {author && <p className="image-credits">Photo by {author}</p>}
                    {date && <p className="image-credits">Date: {date}</p>}
                    <button onClick={handleSubmit} className="download-button">
                        Download Image
                    </button>
                </div>
            )}
        </div>
    );

}

export default App;