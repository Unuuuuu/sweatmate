import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import DataListInput from "react-plain-datalist-input";
// import media from "styled-media-query";
// import { FaUserCircle } from "react-icons/fa";
// import { GrMail } from "react-icons/gr";
// import { IoLocationSharp } from "react-icons/io5";
// import { ImManWoman } from "react-icons/im";
// import { RiLeafLine } from "react-icons/ri";

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1rem;
  width: 19rem;
  font-size: 1.2rem;
`;

const InfoEdit = styled.input`
  width: 100%;
  height: 2.2rem;
  border: 2px solid var(--color-lightgray);
  border-radius: 0.5rem;
  padding: 0.25rem;
`;

const SelectContainer = styled(InfoContainer)`
  .datalist-input {
    padding-top: 0.3rem;
    padding-left: 0.3rem;
    width: 100%;
    height: 2.2rem;
    border: 2px solid var(--color-lightgray);
    border-radius: 0.5rem;
  }
  .datalist-items {
    width: 17rem;
    margin-top: 1rem;
    position: absolute;
    max-height: 11rem;
    overflow: scroll;
    border: 2px solid var(--color-lightgray);
    border-radius: 0.5rem;
    background-color: var(--color-darkwhite);
    margin-left: -0.5rem;
    div.datalist-active-item.datalist-active-item-default {
      padding-left: 0.3rem;
      background-color: var(--color-darkwhite);
      width: 17rem;
      height: 2.2rem;
      :hover {
        background-color: var(--color-maingreen--25);
      }
    }
    div {
      padding-left: 0.3rem;
      display: flex;
      align-items: center;
      width: 17rem;
      background-color: var(--color-darkwhite);
      height: 2.2rem;
      :hover {
        background-color: var(--color-maingreen--25);
      }
    }
  }
`;
const InfoSelect = styled(DataListInput)``;

const ProfileEdit = ({ type, email, values, setUserInfo }) => {
  const onSelect = useCallback((selectedItem) => {
    console.log("selectedItem", selectedItem);
    if (selectedItem.label.includes("구")) {
      setUserInfo((prevState) => ({ ...prevState, area: selectedItem.label }));
    } else if (selectedItem.label === "남" || selectedItem.label === "여") {
      setUserInfo((prevState) => ({ ...prevState, gender: selectedItem.label }));
    } else {
      setUserInfo((prevState) => ({ ...prevState, age: selectedItem.label }));
    }
  }, []);
  // const onInput = useCallback((selectedItem) => {}, []);

  const items = useMemo(
    () =>
      values.map((oneItem) => ({
        // required: what to show to the user
        label: oneItem.name,
        // required: key to identify the item within the array
        key: oneItem.id,
        // feel free to add your own app logic to access those properties in the onSelect function
        someAdditionalValue: oneItem.someAdditionalValue,
        // or just keep everything
        ...oneItem,
      })),
    [values]
  );

  const handleInputChange = (e) => {
    setUserInfo((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const func = (type) => {
    switch (type) {
      case "email":
        if (type !== "email") break;
        return (
          <>
            {/* <GrMail style={{ display: "inline" }} /> */}
            ✉️
            <InfoEdit
              name={type}
              value={email}
              placeholder="이메일"
              onChange={handleInputChange}
              disabled
            />
          </>
        );
      case "nickname":
        if (type !== "nickname") break;
        return (
          <>
            {/* <FaUserCircle style={{ display: "inline" }} /> */}
            👤
            <InfoEdit name={type} placeholder="닉네임" onChange={handleInputChange} />
          </>
        );
      case "area":
        if (type !== "area") break;
        return (
          <SelectContainer>
            {/* <IoLocationSharp style={{ display: "inline" }} /> */}
            📍
            <InfoSelect
              id="area"
              placeholder="지역"
              items={items}
              onSelect={onSelect}
              suppressReselect={true}
            />
          </SelectContainer>
        );
      case "gender":
        if (type !== "gender") break;
        return (
          <SelectContainer>
            {/* <ImManWoman style={{ display: "inline" }} /> */}
            👫🏻
            <InfoSelect
              placeholder="성별"
              items={items}
              onSelect={onSelect}
              suppressReselect={true}
            />
          </SelectContainer>
        );
      case "age":
        if (type !== "age") break;
        return (
          <SelectContainer>
            {/* <RiLeafLine style={{ display: "inline" }} /> */}
            ⏰
            <InfoSelect
              placeholder="나이"
              items={items}
              onSelect={onSelect}
              suppressReselect={true}
            />
          </SelectContainer>
        );
      default:
        break;
    }
  };
  return <InfoContainer>{func(type)}</InfoContainer>;
};

export default ProfileEdit;

ProfileEdit.propTypes = {
  type: PropTypes.string.isRequired,
  email: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.any),
  setUserInfo: PropTypes.func,
};
