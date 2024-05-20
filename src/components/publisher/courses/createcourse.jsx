import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const CreateCourse = () => {
    const [formData, setFormData] = useState({
        Name: '',
        ExpirationDay: 30,
        Price: 0,
        CourseDescription: '',
        CourseTopicId: '',
        SubtitleFileUploads: null,
        ThumbnailFileUpload: null,
        VideoFileUpload: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            const response = await axios.post('https://localhost:7209/api/v1/course/create-course', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Create Course Response:', response.data);
        } catch (error) {
            console.error('Create Course Error:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="Name" value={formData.Name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="ExpirationDay">
                <Form.Label>Expiration Day</Form.Label>
                <Form.Control type="number" name="ExpirationDay" value={formData.ExpirationDay} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="Price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="Price" value={formData.Price} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="CourseDescription">
                <Form.Label>Course Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="CourseDescription" value={formData.CourseDescription} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="CourseTopicId">
                <Form.Label>Course Topic ID</Form.Label>
                <Form.Control type="number" name="CourseTopicId" value={formData.CourseTopicId} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="SubtitleFileUploads">
                <Form.Label>Subtitle File Uploads</Form.Label>
                <Form.Control type="file" name="SubtitleFileUploads" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="ThumbnailFileUpload">
                <Form.Label>Thumbnail File Upload</Form.Label>
                <Form.Control type="file" name="ThumbnailFileUpload" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="VideoFileUpload">
                <Form.Label>Video File Upload</Form.Label>
                <Form.Control type="file" name="VideoFileUpload" onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Create Course
            </Button>
        </Form>
    );
};

export default CreateCourse;
