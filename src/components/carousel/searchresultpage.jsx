// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// function SearchResultsPage() {
//     const [searchResults, setSearchResults] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const location = useLocation();

//     useEffect(() => {
//         setSearchQuery(new URLSearchParams(location.search).get("q"));
//     }, [location.search]);

//     useEffect(() => {
//         if (searchQuery) {
//             axios
//                 .get(`https://localhost:7209/api/v1/course/get-alls`, {
//                     params: {
//                         query: searchQuery
//                     }
//                 })
//                 .then((response) => {
//                     setSearchResults(response.data.data.items);
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching search results:", error);
//                 });
//         }
//     }, [searchQuery]);

//     return (
//         <div>
//             <h1>Search Results</h1>
//             {searchResults.map((result) => (
//                 <div key={result.id}>
//                     <h2>{result.courseName}</h2>
//                     <p>Price: {result.price}</p>
//                     <p>Creator: {result.creatorName}</p>
//                     <img src={result.thumbnail} alt="Course thumbnail" />
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default SearchResultsPage;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Form, Button, ListGroup } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";

function SearchResultsPage() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [topics, setTopics] = useState([]);
    const [isFree, setIsFree] = useState(null);
    const location = useLocation();
    const [price, setPriceValue] = useState(0); 

    useEffect(() => {
        setSearchQuery(new URLSearchParams(location.search).get("q"));
    }, [location.search]);

    useEffect(() => {
        if (searchQuery) {
            axios
                .get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/course/get-alls`, {
                    params: {
                        query: searchQuery
                    }
                })
                .then((response) => {
                    setSearchResults(response.data.data.items);
                })
                .catch((error) => {
                    console.error("Error fetching search results:", error);
                });
        }
    }, [searchQuery]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/coursetopic/getalls`)
            .then((response) => {
                setTopics(response.data.data.items);
            })
            .catch((error) => {
                console.error("Error fetching topics:", error);
            });
    }, []);

    const handleTopicChange = (e) => {
        // Xử lý thay đổi giá trị khi chọn topic
    };

    const handleIsFreeChange = (e) => {
        // Xử lý thay đổi giá trị khi chọn isFree
    };

    // const handlePriceChange = (e) => {
    //     setPrice(e.target.value);
    //     // Xử lý thay đổi giá trị khi di chuyển thanh trượt Price
    // };

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: "0 0 30%", marginRight: "20px" }}>
                <h2>Filter</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Topics</Form.Label>
                        <ListGroup>
                            {topics.map((topic) => (
                                <ListGroup.Item key={topic.id}>
                                    <Form.Check
                                        type="checkbox"
                                        id={topic.id}
                                        label={topic.name}
                                        onChange={handleTopicChange}
                                    />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Is Free</Form.Label>
                        <Form.Check
                            type="radio"
                            name="isFree"
                            id="free"
                            label="Free"
                            onChange={handleIsFreeChange}
                        />
                        <Form.Check
                            type="radio"
                            name="isFree"
                            id="notFree"
                            label="Not Free"
                            onChange={handleIsFreeChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <RangeSlider
                            value={price}
                            onChange={changeEvent => {
                                setPriceValue(changeEvent.target.value);
                                console.log(price)
                            }}
                            min={0}
                            max={10000}
                            step={100}
                            tooltip='auto'
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Apply Filter
                    </Button>
                </Form>

            </div>
            <div style={{ flex: "1" }}>
                <h1>Search Results</h1>
                {searchResults.map((result) => (
                    <div key={result.id}>
                        <h2>{result.courseName}</h2>
                        <p>Price: {result.price}</p>
                        <p>Creator: {result.creatorName}</p>
                        <img src={result.thumbnail} alt="Course thumbnail" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResultsPage;
