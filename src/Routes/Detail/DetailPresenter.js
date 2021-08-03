import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import styled from "styled-components";

import Loader from "Components/Loader";
import Profile from "Components/Profile";
import Season from "Components/Season";

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
`;

const Data = styled.div`
  width: 70%;
  margin-left: 20px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 20px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const ItemImage = styled.img`
  width: 40px;
  height: 20px;
  margin-bottom: -5px;
`;

const Item = styled.span``;

const ItemButton = ItemImage.withComponent("a");

const Divider = styled.span`
  margin: 0px 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 30px;
`;

const ColletionContainer = styled.div`
  margin-bottom: 30px;
`;

const ColletionImage = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
  width: 125px;
  height: 180px;
  transition: opacity 0.2s linear;
`;

const Seasons = styled.div`
  width: 95%;
  height: 260px;
  overflow: hidden;
  padding-left: 10px;
  margin-bottom: 30px;
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-image: linear-gradient(to right, #0a090e, #d758ac, #2b376d);
  }
  &:hover {
    overflow-y: scroll;
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const SeasonsGrid = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 25px;
`;

const MadeBy = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const VideoContainer = styled.div`
  width: 95%;
  overflow: hidden;
  height: 210px;
  display: flex;
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-image: linear-gradient(to right, #0a090e, #d758ac, #2b376d);
  }
  &:hover {
    overflow-x: scroll;
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const SubTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const VideoImage = styled.iframe`
  height: 200px;
  width: 350px;
  margin-right: 10px;
`;

const VideoLink = VideoImage.withComponent("a");

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomfilx
        </title>
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
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            {result.imdb_id && (
              <>
                <ItemButton
                  href={`https://www.imdb.com/title/${result.imdb_id}`}
                  target="_blank"
                >
                  <ItemImage
                    src={require("../../assets/imdb.png")}
                    alt="IMDB Link"
                  />
                </ItemButton>
                <Divider>•</Divider>
              </>
            )}
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map(
                  (genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.production_countries &&
                result.production_countries.map(
                  (p, i) =>
                    i === result.production_countries.length - 1
                      ? p.iso_3166_1
                      : `${p.iso_3166_1} / `
                )}
              {result.origin_country &&
                result.origin_country.map(
                  (c, i) =>
                    i === result.origin_country.length - 1 ? c : `${c} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          {result.belongs_to_collection && (
            <>
              <SubTitle>{result.belongs_to_collection.name}</SubTitle>
              <ColletionContainer>
                <Link to={`/collection/${result.belongs_to_collection.id}`}>
                  <ColletionImage
                    bgUrl={`https://image.tmdb.org/t/p/w300/${
                      result.belongs_to_collection.poster_path
                    }`}
                  />
                </Link>
              </ColletionContainer>
            </>
          )}
          {result.seasons &&
            result.seasons.length > 0 && (
              <>
                <SubTitle>Seasons</SubTitle>
                <Seasons>
                  <SeasonsGrid>
                    {result.seasons.map((season) => (
                      <Season
                        key={season.id}
                        id={season.id}
                        name={season.name}
                        posterPath={season.poster_path}
                        airDate={season.air_date}
                      />
                    ))}
                  </SeasonsGrid>
                </Seasons>
              </>
            )}
          <MadeBy>
            {/* production_companies */}
            {result.production_companies &&
              result.production_companies.length > 0 && (
                <>
                  <SubTitle>Production</SubTitle>
                  <Profile result={result.production_companies} />
                </>
              )}
            {/* created_by */}
            {result.created_by &&
              result.created_by.length > 0 && (
                <>
                  <SubTitle>Creator</SubTitle>
                  <Profile result={result.created_by} isCreator={true} />
                </>
              )}
          </MadeBy>

          {result.videos &&
            result.videos.results &&
            result.videos.results.length > 0 && (
              <>
                <SubTitle>Trailers</SubTitle>
                <VideoContainer>
                  {result.videos.results.map(
                    (v) =>
                      v.site === "YouTube" && (
                        <VideoLink
                          key={`${v.key}_link`}
                          href={`https://www.youtube.com/watch?v=${
                            v.key
                          }&feature=emb_title`}
                          target="_blank"
                        >
                          <VideoImage
                            key={`${v.key}_img`}
                            src={`https://www.youtube.com/embed/${v.key}`}
                          />
                        </VideoLink>
                      )
                  )}
                </VideoContainer>
              </>
            )}
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
