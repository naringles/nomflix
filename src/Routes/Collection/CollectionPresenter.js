import React from "react";
import { Link } from "react-router-dom";

import Helmet from "react-helmet";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loader from "Components/Loader";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgUrl});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${(props) => props.bgUrl});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  padding: 50px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 20px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 16px;
  opacity: 0.7;
  line-height: 1.5;
  margin-bottom: 30px;
`;

const Poster = styled.div`
  width: 120px;
  height: 180px;
  background-image: url(${(props) => props.bgUrl});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const SubContent = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  z-index: 1;
`;

const SubTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SubOverview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 100%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  margin: 20px 0;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const ItemDivider = styled.span`
  margin: 0px 10px;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Helmet>
        <title>{result.name} | Nomfilx</title>
      </Helmet>
      <Backdrop
        bgUrl={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgUrl={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.name} ({result.parts.length} Movies)
          </Title>
          <Overview>{result.overview}</Overview>
          <Divider />

          {result.parts &&
            result.parts.map((movie) => (
              <Link to={`/movie/${movie.id}`}>
                <SubContent key={`${movie.id}_content`}>
                  <Poster
                    key={`${movie.id}_poster`}
                    bgUrl={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/original${
                            movie.poster_path
                          }`
                        : require("../../assets/noPosterSmall.png")
                    }
                  />
                  <Data key={`${movie.id}_data`}>
                    <SubTitle key={`${movie.id}_title`}>
                      {movie.original_title}
                    </SubTitle>
                    <ItemContainer>
                      <Item>{movie.release_date}</Item>
                      <ItemDivider>•</ItemDivider>
                      <Item>{movie.original_language}</Item>
                      <ItemDivider>•</ItemDivider>
                      <Item>
                        {movie.genre_ids &&
                          movie.genre_ids.map(
                            (id, index) =>
                              index === movie.genre_ids.length - 1
                                ? id
                                : `${id} / `
                          )}
                      </Item>
                    </ItemContainer>
                    <SubOverview key={`${movie.id}_overview`}>
                      {movie.overview}
                    </SubOverview>
                  </Data>
                </SubContent>
                <Divider key={`${movie.id}_divider`} />
              </Link>
            ))}
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
