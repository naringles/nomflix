import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const ProfileContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  background-image: url(${(props) => props.bgUrl});
  background-size: ${(props) => (props.isCreator ? "cover" : "60px")};
  background-repeat: no-repeat;
  background-position: center center;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 10px;
`;

const ProfileTitle = styled.div`
  color: black;
  text-align: center;
  font-weight: 500;
  line-height: 80px;
  height: 80px;
  overflow: hidden;
`;

const Profile = ({ result, isCreator = false }) => (
  <>
    <Container>
      {result.map((p) => (
        <ProfileContainer
          key={`${p.id}_profile`}
          bgUrl={
            p.logo_path
              ? `https://image.tmdb.org/t/p/w200/${p.logo_path}`
              : `https://image.tmdb.org/t/p/w200/${p.profile_path}`
          }
          isCreator={isCreator}
        >
          <ProfileTitle key={`${p.id}_title`}>
            {p.logo_path === null && p.name}
            {p.profile_path === null && p.name}
          </ProfileTitle>
        </ProfileContainer>
      ))}
    </Container>
  </>
);

Profile.propTypes = {
  result: PropTypes.array.isRequired,
  isCreator: PropTypes.bool,
};

export default Profile;
