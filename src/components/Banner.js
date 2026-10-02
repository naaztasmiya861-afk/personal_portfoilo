import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
 
export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Full Stack Developer", "Python Developer", "Web Developer" ];
  const period = 2000;
 
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
 
    return () => { clearInterval(ticker) };
  }, [text])
 
  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
 
    setText(updatedText);
 
    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }
 
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }
 
  const scrollToContact = () => {
    const el = document.getElementById("connect");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
 
  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I'm Tasmiya Naaz`} <span className="txt-rotate" data-period="1000" data-rotate='[ "Full Stack Developer", "Python Developer", "Web Developer" ]'><span className="wrap">{text}</span></span></h1>
                  <p>I'm a Python full stack developer and a 2026 Electronics and Communication Engineering graduate. I build responsive, user-friendly web applications and I'm looking for an opportunity to grow as a web developer.</p>
                  <button onClick={scrollToContact}>Let’s Connect <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Tasmiya Naaz - Web Developer"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}