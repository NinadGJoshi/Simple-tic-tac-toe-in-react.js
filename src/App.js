import React, { useState } from "react";
import "./App.css";
import Icon from './components/icon.js';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const itemArray = new Array(9).fill("empty");
const cardColors = new Array(9).fill("warning");

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");


  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
    cardColors.fill("warning", 0, 9);
  };

  const setCardColors = (...colors) => {
    colors.forEach((colorIndex) => cardColors[colorIndex] = 'secondary-color');
  }

  const checkIsWinner = () => {
    if (itemArray[0] === itemArray[1] &&
      itemArray[1] === itemArray[2] &&
      itemArray[0] !== 'empty') {
      setWinMessage(`${itemArray[0]} won`);
      setCardColors(0, 1, 2);
    } else if (itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5] &&
      itemArray[3] !== 'empty') {
      setWinMessage(`${itemArray[3]} won`);
      setCardColors(3, 4, 5);
    } else if (itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8] &&
      itemArray[6] !== 'empty') {
      setWinMessage(`${itemArray[3]} won`);
      setCardColors(6, 7, 8);
    } else if (itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6] &&
      itemArray[0] !== 'empty') {
      setWinMessage(`${itemArray[0]} won`);
      setCardColors(0, 3, 6);
    } else if (itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7] &&
      itemArray[1] !== 'empty') {
      setWinMessage(`${itemArray[1]} won`);
      setCardColors(1, 4, 7);
    } else if (itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8] &&
      itemArray[2] !== 'empty') {
      setWinMessage(`${itemArray[2]} won`);
      setCardColors(2, 5, 8);
    } else if (itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8] &&
      itemArray[0] !== 'empty') {
      setWinMessage(`${itemArray[0]} won`);
      setCardColors(0, 4, 8);
    } else if (itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6] &&
      itemArray[2] !== 'empty') {
      setWinMessage(`${itemArray[2]} won`);
      setCardColors(2, 4, 6);
    } else if (itemArray.findIndex((value) => value === 'empty') === -1) {
      setWinMessage("Match Drawn!!");
    }
  };

  const changeItem = itemNumber => {
    if (winMessage !== '') {
      return toast(winMessage, { type: "success" })
    }

    if (itemArray[itemNumber] === 'empty') {
      itemArray[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return toast("already filled", { type: 'error' })
    }

    checkIsWinner();
  };

  return (
    <Container className="p-5">
      <Row>
        <Col md={6} className="offset-md-4">
          <h1 className="page-heading">Tic-Tac-Toe</h1>
        </Col>
      </Row>
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {winMessage ? (
            <div className="mb-2 mt-2">
              <h1 className="text-success text-uppercase text-center">
                {winMessage}
              </h1>
              <Button
                color="success"
                onClick={reloadGame}
                className="reload-btn"
              >
                Reload the Game
              </Button>
            </div>
          ) : (
            <h1 className="text-center text-warning">
              {isCross ? "Cross" : "Circle"} turns
            </h1>
          )}
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card color={cardColors[index]} onClick={() => changeItem(index)}>
                <CardBody className="box">
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
