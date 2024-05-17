import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserLoginDetails, setSignOutState } from "../features/user/userSlice";
import allData from "../All.json";

const Header = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { name: userName, photo } = useSelector((state) => state.user);
  const [textInput, setTextInput] = useState(""); // Состояние текстового поля


  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSearch = () => {
    const filteredResults = allData.filter((item) =>
      typeof item.name === 'string' && item.name.toLowerCase().includes(textInput.toLowerCase())
    );
    history('/results', {state: {results: filteredResults}});
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Nav>
      <Logo href="/">
        <img src="https://singleton-website.ru/default/images/icon1-next.png" alt="HOME" />
      </Logo>
{/*       <NavMenu>
        <NavItem href="/movies">
          <img src="https://singleton-website.ru/default/images/movie-icon.svg" alt="MOVIES" />
          <span>MOVIES</span>
        </NavItem>
        <NavItem href="/series">
          <img src="https://singleton-website.ru/default/images/series-icon.svg" alt="SERIES" />
          <span>SERIES</span>
        </NavItem>
      </NavMenu> */}
      <SearchContainer>
        <TextInput
          type="text"
          placeholder="Поиск..."
          value={textInput}
          onChange={handleTextChange}
          onKeyPress={handleKeyPress} 
        />
        <SearchButton onClick={handleSearch} />
      </SearchContainer>
      {/* <Login onClick={handleAuth}>{userName ? "Logout" : "Login"}</Login> */}
      <RightLogo href="https://majestic-network.org">
        <img src="https://singleton-website.ru/default/images/network.png" alt="SECOND LOGO" />
      </RightLogo>
    </Nav>
  );
};



const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: -45px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;
const RightLogo = styled.a`
  padding: 0;
  width: 80px;

  max-height: 70px;
  font-size: 0;
  display: inline-block;
  margin-left: auto;

  img {
    display: block;
    width: 60%;
  }
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 480px) {
    padding: 0 10px;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;


const NavItem = styled.a`
  display: flex;
  align-items: center;
  padding: 0 12px;

  img {
    height: 20px;
    min-width: 20px;
    width: 20px;
    z-index: auto;
  }

  span {
    color: rgb(249, 249, 249);
    font-size: 13px;
    letter-spacing: 1.42px;
    line-height: 1.08;
    padding: 2px 0px;
    white-space: nowrap;
    position: relative;

    &:before {
      background-color: rgb(249, 249, 249);
      border-radius: 0px 0px 4px 4px;
      bottom: -6px;
      content: "";
      height: 2px;
      left: 0px;
      opacity: 0;
      position: absolute;
      right: 0px;
      transform-origin: left center;
      transform: scaleX(0);
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      visibility: hidden;
      width: auto;
    }
  }

  &:hover {
    span:before {
      transform: scaleX(1);
      visibility: visible;
      opacity: 1 !important;
    }
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 50%;
  margin: 0 auto;
  background-color: transparent;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  color: white; /* Изменен цвет текста на белый */
  background-color: transparent;
`;


const SearchButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background-image: url('https://singleton-website.ru/default/images/search.png');
  background-size: cover;
  width: 20px;
  height: 20px;
`;

export default Header;
