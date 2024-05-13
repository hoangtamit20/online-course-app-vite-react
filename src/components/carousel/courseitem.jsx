import { Card, Button } from 'react-bootstrap';

const CourseItem = ({ course }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={course.thumbnail} />
            <Card.Body>
                <Card.Title>{course.courseName}</Card.Title>
                <Card.Text>
                    Price: {course.isFree ? 'Free' : `$${course.price}`}
                    <br />
                    Weekly Views: {course.weeklyViews}
                    <br />
                    Monthly Views: {course.monthlyViews}
                    <br />
                    Creator: {course.creatorName}
                </Card.Text>
                <Button variant="primary">Go to Course</Button>
            </Card.Body>
        </Card>
    );
};

export default CourseItem;
