import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { modalOffAction } from "../store/actions";
import { useDispatch } from "react-redux";
import GathSearch from "./GathSearch";
import GathCard from "./GathCard";
import media from "styled-media-query";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const GathCreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Info = styled.div`
  width: 50rem;
  * {
    margin: 1.2rem 0rem;
  }
  ${media.between("medium", "large")`
    /* screen width is between 768px (medium) and 1170px (large) */
    width: 35rem;
  `}
  ${media.lessThan("medium")`
    /* screen width is between 768px (medium) and 1170px (large) */
    width: 20rem;
  `}
`;

const MovePageButtons = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 50rem;
  height: 5rem;
  bottom: 1rem;
  ${media.between("medium", "large")`
    /* screen width is between 768px (medium) and 1170px (large) */
    width: 35rem;
  `}
  ${media.lessThan("medium")`
    /* screen width is between 768px (medium) and 1170px (large) */
    width: 20rem;
  `}
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  div {
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50rem;
  ${media.between("medium", "large")`
    /* screen width is between 768px (medium) and 1170px (large) */
    width: 35rem;
    `}
  ${media.lessThan("medium")`
    /* screen width is between 768px (medium) and 1170px (large) */
    width: 20rem;
  `}
`;

const GathCreate = () => {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState("어떤 운동 하세요?");
  const [isOnSearch, setOnSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dispatch = useDispatch();

  const [gathering, setGathering] = useState({
    gatheringId: 12,
    title: "농구 함 때려볼 용산러들~!",
    description: "용산에서 즐기면서 농구하는 사람들 한 판 같이 합시다~",
    creator: {
      id: "uuid",
      nickname: "농구에 미친 사람",
      image: "",
    },
    areaName: "용산구",
    placeName: "이촌한강공원 농구대",
    latitude: 33.450701,
    longitude: 126.570667,
    date: "2021-10-27",
    time: "evening",
    timeDescription: "19시",
    totalNum: 4,
    currentNum: 2,
    sportName: "농구",
    sportEmoji: "🏀",
    done: false,
    users: [
      {
        id: "uuid",
        nickname: "농구킹",
        image: "imageUrl",
      },
    ],
  });

  useEffect(() => {
    switch (step) {
      case 1:
        setQuestion("어떤 운동 하세요?");
        break;
      case 2:
        setQuestion("어디서 하세요?");
        break;
      case 3:
        setQuestion("몇일에 하시나요?");
        break;
      case 4:
        setQuestion("언제 하시나요?");
        break;
      case 5:
        setQuestion("정확한 시간을 적어주세요");
        break;
      case 6:
        setQuestion("몇 명이서 하시나요?");
        break;
      case 7:
        setQuestion("모임 이름을 적어주세요!");
        break;
      case 8:
        setQuestion("모임 설명을 간단히 적어주세요!");
        break;
      default:
        break;
    }
    if (step === 6) {
      setInputValue(2);
    }
    setGathering({
      gatheringId: 12,
      title: selectedOptions[6]
        ? selectedOptions[6]
        : selectedOptions[0] && `${selectedOptions[0].split(" ")[0]} 함께 즐겨요!`,
      description: selectedOptions[7] || "용산에서 즐기면서 농구하는 사람들 한 판 같이 합시다~",
      creator: {
        id: "uuid",
        nickname: selectedOptions[0]
          ? `${selectedOptions[0].split(" ")[0]}에 미친 사람`
          : "운동에 미친 사람",
        image: "",
      },
      areaName: (selectedOptions[1] && selectedOptions[1].address_name.split(" ")[1]) || "OO구",
      placeName: (selectedOptions[1] && selectedOptions[1].place_name) || "이촌한강공원 농구대",
      latitude: 33.450701,
      longitude: 126.570667,
      date: selectedOptions[2] || "2021-00-00",
      time: selectedOptions[3] || "evening",
      timeDescription: selectedOptions[4] || "19시",
      totalNum: selectedOptions[5] || 0,
      currentNum: selectedOptions[5] - 1 || 0,
      sportName: selectedOptions[0] ? selectedOptions[0].split(" ")[0] : "농구",
      sportEmoji: selectedOptions[0] ? selectedOptions[0].split(" ")[1] : "❓",
      done: false,
      users: [
        {
          id: "uuid",
          nickname: "농구킹",
          image: "imageUrl",
        },
      ],
    });
  }, [step, selectedOptions]);

  const handlePrevClick = () => {
    setOnSearch(false);
    setInputValue("");
    setList([]);
    setIsSelected(false);
    setSelectedOptions(selectedOptions.slice(0, selectedOptions.length - 1));
    setStep(step - 1);
  };

  const handleNextClick = async () => {
    if (step >= 5 && step <= 8) {
      setSelectedOptions([...selectedOptions, inputValue]);
      setOnSearch(false);
      setInputValue("");
      setList([]);
      setIsSelected(false);
      setStep(step + 1);
    } else {
      if (selectedOptions.length === step) {
        setOnSearch(false);
        setInputValue("");
        setList([]);
        setIsSelected(false);
        setStep(step + 1);
      }
    }
  };

  const handleSave = () => {
    dispatch(modalOffAction);
  };

  return (
    <GathCreateContainer>
      <Info>
        <div>{step}단계</div>
        <div style={{ width: "auto", height: "1rem", color: "green" }}>
          {step === 2 && selectedOptions[0] && `${selectedOptions[0]} 모임`}
          {step === 3 &&
            selectedOptions[1].length !== 0 &&
            `${selectedOptions[1].place_name}에서 
             ${selectedOptions[0]} 모임`}
          {(step === 4 || step === 5 || step === 6) &&
            selectedOptions[2] &&
            `${selectedOptions[2].split("-")[1]}월 ${selectedOptions[2].split("-")[2]}일 
            '${selectedOptions[1].place_name}'에서 
             ${selectedOptions[0]} 모임`}
          {(step === 7 || step === 8) &&
            selectedOptions[2] &&
            `${selectedOptions[2].split("-")[1]}월 ${selectedOptions[2].split("-")[2]}일 
            '${selectedOptions[1].place_name}'에서 
             ${selectedOptions[5]}인 ${selectedOptions[0]} 모임`}
        </div>
        <h2>{question}</h2>
      </Info>
      <Container>
        <GathSearch
          step={step}
          isOnSearch={isOnSearch}
          setOnSearch={setOnSearch}
          inputValue={inputValue}
          setInputValue={setInputValue}
          list={list}
          setList={setList}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <GathCard gathering={gathering} />
      </Container>
      <MovePageButtons>
        <Button name="prev" onClick={handlePrevClick}>
          {step > 1 && (
            <>
              <MdOutlineKeyboardArrowLeft fontSize="1.5rem" />
              <div>이전</div>
            </>
          )}
        </Button>
        <Button name="next" onClick={handleNextClick}>
          {step < 8 ? (
            <>
              <div>다음</div>
              <MdOutlineKeyboardArrowRight fontSize="1.5rem" />
            </>
          ) : (
            <>
              <div onClick={handleSave}>등록하기</div>
            </>
          )}
        </Button>
      </MovePageButtons>
    </GathCreateContainer>
  );
};

export default GathCreate;
