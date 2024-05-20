import { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import CourseItem from './courseitem';

const ListCourse = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/course/get-alls`);
                setCourses(response.data.data.items);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <>
            {courses && <Carousel>
                {courses.slice(0, 4).map((course, index) => (
                    <Carousel.Item key={index}>
                        <CourseItem course={course} />
                    </Carousel.Item>
                ))}
            </Carousel>}
        </>
    );
};

export default ListCourse;