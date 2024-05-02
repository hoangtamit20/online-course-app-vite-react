import { useState, useEffect } from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import { Bell, Heart } from 'react-bootstrap-icons';

const LikePoper = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationCount, setNotificationCount] = useState(1); // Số lượng thông báo mặc định
    const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 });
    const [listPosition, setListPosition] = useState({ top: 0, right: 0 });

    const toggleNotifications = (event) => {
        const rect = event.target.getBoundingClientRect();
        setClickedPosition({ x: rect.left, y: rect.bottom + 5 });
        setShowNotifications(!showNotifications);
        setNotificationCount(0); // Khi mở danh sách thông báo, đặt số lượng thông báo về 0
    };

    useEffect(() => {
        const updateListPosition = () => {
            const likeRect = document.getElementById('likeIcon').getBoundingClientRect();
            const rightSpace = window.innerWidth - likeRect.right;
            if (rightSpace < 400) {
                setListPosition({ top: likeRect.bottom + 5, right: 15 });
            } else {
                setListPosition({ top: clickedPosition.y, left: clickedPosition.x });
            }
        };

        if (showNotifications) {
            updateListPosition();
            window.addEventListener('resize', updateListPosition);
        }

        return () => {
            window.removeEventListener('resize', updateListPosition);
        };
    }, [showNotifications]);

    return (
        <div className="position-relative">
            <a className='btn btn-outline-secondary border border-0' >
                <Heart id="likeIcon" 
                    onClick={toggleNotifications} 
                    className="me-0 position-relative" style={{ cursor: 'pointer', fontSize: '1.5rem' }} />
            </a>
            <Badge bg="danger" className="position-absolute top-0 end-0 translate-middle-y">
                {notificationCount}
            </Badge>
            {showNotifications && (
                <div className="position-absolute" style={{ ...listPosition }}>
                    <div className="bg-light rounded p-2" style={{ maxWidth: '350px', maxHeight: '600px', overflowY: 'auto' }}>
                        <ListGroup>
                            <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                Some news <Badge bg="danger">New</Badge>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LikePoper;