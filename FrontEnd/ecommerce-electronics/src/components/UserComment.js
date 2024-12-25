import React from "react";
import { Card, Row, Col } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
const UserComment = ({ props }) => {
    console.log("day la props",props);
    const {image, username} = props.user;
    console.log(`username là ${username}`);
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(i <= rating ? <FaStar key={i} className="text-warning" /> : <FaRegStar key={i} className="text-muted" />);
        }
        return stars;
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Row>
                    <Col xs={2} className="text-center">
                        <img
                            src={image}
                            alt="Avatar"
                            className="rounded-circle"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                    </Col>
                    <Col xs={10}>
                        <p className="mb-1">{username}</p>
                        <div className="mb-2">{renderStars(props.star)}</div>
                        <Card.Text>{props.description}</Card.Text>
                        <div className="reply"  style={{ display: 'flex', alignItems: 'center' }}>
                            <Row style={{width:'100%'}}>
                                <Col xs={2} className="text-center">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPPX1d6sn9wWE36oDc1sOz56DV7789e20PlQ&s"
                                        alt="Avatar"
                                        className="rounded-circle"
                                        style={{ width: '25px', height: '25px', objectFit: 'cover' }}
                                    />
                                    <p className="username mb-1" 
                                        style={{fontSize: '12px',
                                            fontWeight: 'bold',
                                            margin: '0', // Đảm bảo không có margin giữa các phần tử
                                            }}>EEShop
                                    </p>
                                </Col>
                                <Col xs={10}>
                                    
                                    <Card.Text className="comment-text mt-2 p-0">{props.reply}</Card.Text>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};
export default UserComment;