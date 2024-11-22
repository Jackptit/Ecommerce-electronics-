import React from "react";
import { Card, Row, Col } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
const UserComment = ({ props }) => {
    const { avatar, userName, rating, comment } = props;
    console.log(`username là ${userName}`);
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
                            src={avatar}
                            alt="Avatar"
                            className="rounded-circle"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                    </Col>
                    <Col xs={10}>
                        <p className="mb-1">{userName}</p>
                        <div className="mb-2">{renderStars(rating)}</div>
                        <Card.Text>{comment}</Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};
export default UserComment;