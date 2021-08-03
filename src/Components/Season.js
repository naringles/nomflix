import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
  height: 180px;
  transition: opacity 0.2s linear;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const AirDate = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const Season = ({ id, posterPath, name, airDate }) => (
  <Container>
    <ImageContainer>
      <Image
        bgUrl={
          posterPath
            ? `https://image.tmdb.org/t/p/w300${posterPath}`
            : require("../assets/noPosterSmall.png")
        }
      />
    </ImageContainer>
    <Title>{name.length > 18 ? `${name.substring(0, 18)}...` : name}</Title>
    <AirDate>{airDate}</AirDate>
  </Container>
);

Season.propTypes = {
  id: PropTypes.number.isRequired,
  posterPath: PropTypes.string,
  name: PropTypes.string.isRequired,
  airDate: PropTypes.string,
};

export default Season;
