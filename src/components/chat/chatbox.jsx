import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';




const ChatBox = ({ data, userId, show, handleClose }) => {
    const [chatData, setChatData] = useState(data);
    const [chatboxOpen, setChatboxOpen] = useState(true);
    const [chatboxMinimized, setChatboxMinimized] = useState(false);
    const [displayEmojiTable, setDisplayEmojiTable] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [messages, setMessages] = useState([]);
    const [textValue, setTextValue] = useState('');
    const [filePreview, setFilePreview] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setChatData(data);
    }, [data]);

    // Function to handle sending message
    const sendMessage = () => {
        // Construct the message with file attachment if available
        let fullMessage = messages;
        if (file) {
            fullMessage += ` (File: ${file.name})`;
        }
        console.log('Message sent:', fullMessage);

        // Reset message and file input after sending
        setMessages('');
        setFile(null);
    };

    const handleCloseChatbox = () => {
        setChatboxOpen(false);
    };

    const handleMinimizeChatbox = () => {
        setChatboxMinimized(!chatboxMinimized);
    };

    // Function to handle selecting an emoji
    const handleEmojiSelect = (emoji) => {
        setSelectedEmoji(emoji.native); // Update state with selected emoji
        setTextValue(prevMessage => prevMessage + emoji.native); // Append selected emoji to message
        // setDisplayEmojiTable(false); // Close emoji picker
    };

    // Function to handle file upload
    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setFilePreview(URL.createObjectURL(uploadedFile)); // Display file preview
        // Uncomment the line below if you want to send the file immediately after selecting it
        // setFile(uploadedFile);
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (const item of items) {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                const reader = new FileReader();
                reader.onloadend = () => {
                    setMessages([...messages, { type: 'image', content: reader.result }]);
                };
                reader.readAsDataURL(file);
            } else if (item.kind === 'string' && item.type === 'text/plain') {
                item.getAsString((text) => {
                    setMessages([...messages, { type: 'text', content: text }]);
                });
            }
        }
    };

    const handleRemove = (index) => {
        setMessages(messages.filter((_, i) => i !== index));
    };

    const handleChange = (e) => {
        // Handle typing or deleting text in the textarea
        setTextValue(e.target.value); // Update textarea value state
    };

    return (
        <>
            {
                chatboxOpen && (
                    <div className="chatbox-container" style={{ maxWidth: "400px", maxHeight: "600px" }}>
                        <Card className='p-0'>
                            <Card.Header className="d-flex justify-content-between align-items-center p-1" style={{ borderTop: "4px solid #ffa900" }}>
                                <h5 className="mb-0">{console.log(chatData)}</h5>
                                <div className="d-flex flex-row align-items-center">
                                    <span className="badge bg-warning me-3">20</span>
                                    <button type="button" className="btn btn-outline-secondary me-3" onClick={handleMinimizeChatbox}>
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <button type="button" className="btn btn-outline-secondary me-3">
                                        <i className="fas fa-comments"></i>
                                    </button>
                                    <button type="button" className="btn btn-outline-danger me-3" onClick={() => handleClose(userId)}>
                                        <i className="fas fa-times"></i>
                                    </button>

                                </div>
                            </Card.Header>
                            {
                                !chatboxMinimized &&
                                (
                                    <>
                                        <Card.Body style={{ position: "relative", height: "400px", overflowY: "auto" }}>
                                            <div className="d-flex justify-content-between">
                                                <p className="small mb-1">Timona Siera</p>
                                                <p className="small mb-1 text-muted">23 Jan 2:00 pm</p>
                                            </div>
                                            <div className="d-flex flex-row justify-content-start">
                                                <img src="https://tamhoangblobstorage001.blob.core.windows.net/container-hoangtamit20/CourseId-6/Images/CourseId-6-image-thumbnail.png" alt="avatar 1" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                                                <div>
                                                    <p className="small p-2 ms-3 mb-3 rounded-3" style={{ backgroundColor: "#f5f6f7" }}>
                                                        For what reason would it be advisable for me to think about business content?
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between">
                                                <p className="small mb-1 text-muted">23 Jan 2:05 pm</p>
                                                <p className="small mb-1">Johny Bullock</p>
                                            </div>
                                            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                                                <div>
                                                    <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                                                        Thank you for your believe in our supports
                                                    </p>
                                                </div>
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp" alt="avatar 1" style={{ width: "45px", height: "100%" }} />
                                            </div>
                                        </Card.Body>
                                        <Card.Footer className="text-muted d-flex justify-content-start align-items-center p-1">
                                            <Image
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                                alt="avatar 3"
                                                style={{ width: "45px", height: "100%" }}
                                            />

                                            <div>
                                                <Form.Control
                                                    as="textarea"
                                                    className="form-control-lg ms-1"
                                                    id="exampleFormControlTextarea1"
                                                    placeholder="Type message"
                                                    value={textValue}
                                                    onChange={(e) => setTextValue(e.target.value)}
                                                    onPaste={handlePaste}
                                                />
                                                <hr className='p-0 m-1' />
                                                {messages.some(message => message.type === 'image') && (
                                                    <div className="chat-display" style={{ height: '80px', width: '205px', overflowY: 'auto', whiteSpace: 'nowrap' }}>
                                                        <Row axs={3} style={{ marginRight: '-5px', marginLeft: '-5px' }}>
                                                            {messages
                                                                .filter(message => message.type === 'image')
                                                                .map((message, index) => (
                                                                    <Col key={index} className={`message ${message.type}`} style={{ paddingRight: '5px', paddingLeft: '5px' }}>
                                                                        <div style={{ position: 'relative', width: '60px', height: '50px' }}>
                                                                            <Image
                                                                                src={message.content}
                                                                                alt="Pasted content"
                                                                                style={{ width: '100%', height: '100%', border: '1px solid var(--bs-secondary)' }}
                                                                                rounded
                                                                            />

                                                                            <Button
                                                                                variant="outline-danger"
                                                                                size="sm"
                                                                                className="remove-button"
                                                                                onClick={() => handleRemove(index)}
                                                                                style={{ position: 'absolute', top: 0, right: 0, fontSize: '0.4rem', padding: '0 5px' }}
                                                                            >
                                                                                X
                                                                            </Button>
                                                                        </div>
                                                                    </Col>
                                                                ))}
                                                        </Row>
                                                    </div>
                                                )}
                                            </div>

                                            <Form.Control
                                                type="file"
                                                className="form-control-lg ms-1"
                                                id="exampleFormControlFile1"
                                                onChange={handleFileUpload}
                                                style={{ display: 'none' }} // Hide the file input by default
                                                ref={fileInputRef} // Ref for file input element
                                            />
                                            <Button variant="link" className="text-muted ms-1" onClick={() => {
                                                // Trigger file input click when paperclip icon button is clicked
                                                fileInputRef.current.click();
                                            }}>
                                                <i className="fas fa-paperclip"></i>
                                            </Button>
                                            <div className='position-relative'>
                                                <Button variant="link" className="text-muted ms-1" onClick={() => {
                                                    setDisplayEmojiTable(!displayEmojiTable);
                                                }}>
                                                    {displayEmojiTable ? <i className="fa-solid fa-face-smile" style={{ color: "#FFC107" }}></i> :
                                                        <i className="fa-regular fa-face-smile"></i>}
                                                </Button>
                                                {
                                                    displayEmojiTable &&
                                                    <div className='position-absolute' style={{ bottom: '45px', right: '0', zIndex: '99' }}>
                                                        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                                                    </div>
                                                }
                                            </div>
                                            <Button variant="link" className="ms-1" onClick={sendMessage}>
                                                <i className="fas fa-paper-plane"></i>
                                            </Button>
                                        </Card.Footer>
                                    </>
                                )
                            }
                        </Card>
                    </div>
                )
            }
        </>
    );
};


export default ChatBox;