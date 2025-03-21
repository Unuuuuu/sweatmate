/* eslint-disable  */

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import media from "styled-media-query";
import debounce from "lodash/debounce";
import { useHistory } from "react-router-dom";
import { ImGoogle } from "react-icons/im";
import { SiKakao } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";

import {
  modalOffAction,
  signinAction,
  signinModalOnAction,
  signupModalOnAction,
} from "../store/actions";
import Btn from "./Btn";
import authApi from "../api/auth";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  margin: 4rem 2rem 0rem 2rem;
  * {
    width: 20rem;
    height: 3rem;
    margin: 0.5rem 0rem;
  }
  input {
    height: 2.3rem;
    border: 1px solid var(--color-gray);
    border-radius: 0.4rem;
    :first-of-type {
      margin-top: 1rem;
    }
    :last-of-type {
      margin-bottom: 1rem;
    }
  }

  button {
    color: var(--color-darkgray);
  }
`;

const Logo = styled.img`
  width: calc(5.36 * 2.5rem);
  height: 2.5rem;
`;

const InputContainer = styled.div`
  height: auto;
`;

const Input = styled.input`
  height: 2rem;
  padding: 0 0.5rem;
  font-size: 0.875rem;
  color: var(--color-black);
  ::placeholder {
    color: var(--color-gray);
  }
`;

const Button = styled(Btn)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  min-height: 3rem;
  font-size: 1rem;
  border: 1.5px solid var(--color-maingreen--100);
  * {
    font-size: 0.5rem;
  }
`;

const FlexGuideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-darkgray);

  * {
    display: flex;
    align-items: start;
    :first-child {
      flex: 1.75 0 0;
      justify-content: end;
      padding-right: 1rem;
    }
    :last-child {
      flex: 1 0 0;
      justify-content: start;
      padding-right: 1rem;
    }
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  div {
    width: 20rem;
  }
  .kakao {
    width: 10rem;
    height: 3rem;
    border: 1.5px solid #f4da48;
    margin-right: 0.5rem;
    * {
      width: 2.5rem;
      height: auto;
      :first-child {
        margin-right: 0.2rem;
      }
    }
  }

  .google {
    width: 10rem;
    height: 3rem;
    border: 1.5px solid #4384f3;
    * {
      width: 1rem;
      height: auto;
      :first-child {
        margin-right: 0.2rem;
      }
    }
  }
`;

const ErrorMessage = styled.div`
  color: var(--color-red);
  font-size: 0.8rem;
  padding: 0rem 1rem;
  height: 0.5rem;
`;

const VerificationNotice = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20rem;
    margin-top: 1rem;
    text-align: center;
  }
`;

const Signing = ({ type }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    retypedPassword: "",
    nickname: "",
  });
  const [validated, setValidated] = useState({
    email: true,
    password: true,
    retypedPassword: true,
    nickname: true,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isOnVerification, setIsOnVerification] = useState(false);

  const handleTypeChange = () => {
    if (type === "로그인") {
      dispatch(modalOffAction);
      dispatch(signupModalOnAction);
    } else {
      dispatch(modalOffAction);
      dispatch(signinModalOnAction);
    }
  };

  const handleInputChange = debounce(async (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    if (type === "로그인") {
      if (name === "email") {
        const emailVal =
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
            value
          );
        setValidated({ ...validated, [name]: emailVal });
      } else if (name === "password") {
        const passwordVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(value);
        setValidated({ ...validated, [name]: passwordVal });
      }
    } else {
      if (name === "email") {
        const emailVal =
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
            value
          );
        setValidated({ ...validated, [name]: emailVal });
        if (value === "") setErrorMsg("");
        else if (emailVal) {
          setErrorMsg("");
          try {
            const res = await authApi.checkEmail(value);
            res.status === 200 && setErrorMsg("");
          } catch (error) {
            setErrorMsg("이미 가입된 이메일입니다.");
          }
        } else {
          setErrorMsg("이메일 형식이 올바르지 않습니다.");
        }
      } else if (name === "password") {
        const passwordVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(value);
        /*  조건1. 6~20 영문 대소문자
        조건2. 최소 1개의 숫자 혹은 특수 문자를 포함해야 함  */
        setValidated({ ...validated, [name]: passwordVal });
        if (value === "") setErrorMsg("");
        else if (passwordVal) {
          setErrorMsg("");
        } else {
          setErrorMsg("6-20글자 숫자 혹은 특수 문자를 포함해야 합니다.");
        }
      } else if (name === "retypedPassword") {
        const passwordVal = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(value);
        const retypedPasswordVal = value === inputValue.password;
        if (value === "") setErrorMsg("");
        else if (passwordVal && retypedPasswordVal) {
          setErrorMsg("");
        } else {
          setErrorMsg("비밀번호가 일치하지 않습니다!");
        }
      } else if (name === "nickname") {
        try {
          const res = await authApi.checkNickname(value);
          res.status === 200 && setErrorMsg("");
        } catch (error) {
          setErrorMsg("사용할 수 없는 닉네임입니다.");
        }
      }
    }
  }, 200);

  const handleSign = async (e) => {
    e.preventDefault();
    if (type === "로그인") {
      const valResult = validated.email && validated.password;
      if (valResult) {
        const signInputValue = { ...inputValue };
        delete signInputValue.retypedPassword;
        delete signInputValue.nickname;
        try {
          const res = await authApi.signin(signInputValue);
          if (res.status === 200) {
            dispatch(signinAction(res.data));
            history.push("/home");
            dispatch(modalOffAction);
          }
        } catch (error) {
          setErrorMsg("이메일 인증 또는 입력 정보를 확인해주세요.");
        }
      }
    } else {
      const valResult = Object.values(validated).every((el) => el === true);
      if (valResult) {
        const signInputValue = { ...inputValue };
        delete signInputValue.retypedPassword;
        try {
          const res = await authApi.signup(signInputValue);
          res.status === 201 && setIsOnVerification(true);
        } catch (error) {
          setErrorMsg("정보를 확인해주세요.");
        }
      } else {
        setErrorMsg("정보를 다시 확인해주세요.");
      }
    }
  };

  const handleSignKakao = () => {
    window.location.assign(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&state=kakao`
    );
  };

  const handleSignGoogle = () => {
    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_REST_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&state=google`
    );
  };

  return isOnVerification ? (
    <>
      <VerificationNotice>
        <Logo src={`${process.env.PUBLIC_URL}/assets/long-logo.png`} />
        <div>
          {inputValue.nickname
            ? `${inputValue.nickname}님 인증 메일을 보내드렸어요.`
            : `인증 메일을 보내드렸어요.`}
        </div>
        <div> {`인증을 마치신 후 다시 로그인하시면 스웻메이트를 시작하실 수 있어요!`}</div>
        {inputValue.email && (
          <div>
            <HiOutlineMail fontSize="1.5rem" />
            {inputValue.email}
          </div>
        )}
      </VerificationNotice>
    </>
  ) : (
    <>
      <Form>
        <Logo src={`${process.env.PUBLIC_URL}/assets/long-logo.png`} />
        <InputContainer type={type}>
          <Input name="email" placeholder="이메일" onChange={handleInputChange}></Input>
          <Input
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={handleInputChange}
          ></Input>
          {type === "로그인" && <ErrorMessage>{errorMsg}</ErrorMessage>}
          {type === "회원가입" && (
            <>
              <Input
                name="retypedPassword"
                type="password"
                placeholder="비밀번호 재입력"
                onChange={handleInputChange}
              ></Input>
              <Input name="nickname" placeholder="닉네임" onChange={handleInputChange}></Input>
              <ErrorMessage>{errorMsg}</ErrorMessage>
            </>
          )}
        </InputContainer>
        <Button
          bgColor={"var(--color-white)"}
          color={"var(--color-maingreen--100) !important"}
          onClick={handleSign}
        >
          {type === "로그인" ? "로그인" : "회원가입"}
        </Button>
        {type === "로그인" && <button>비밀번호를 잊어버리셨나요?</button>}
        <FlexGuideContainer>
          <span>{type === "로그인" ? "계정이 없으신가요?" : "이미 가입하셨나요?"}</span>
          <button onClick={handleTypeChange}>{type === "로그인" ? "회원가입" : "로그인"}</button>
        </FlexGuideContainer>
      </Form>
      <FlexContainer>
        <Button
          className="kakao"
          bgColor={"var(--color-white)"}
          color={"#F7E600 !important"}
          onClick={handleSignKakao}
        >
          <SiKakao />
          로그인
        </Button>
        <Button
          className="google"
          bgColor={"var(--color-white)"}
          color={"#4384f3 !important"}
          onClick={handleSignGoogle}
        >
          <ImGoogle fontSize="0.5rem" />
          로그인
        </Button>
      </FlexContainer>
    </>
  );
};

export default Signing;

// Signing.propTypes = {
//   type: PropTypes.string.isRequired,
// };
/* eslint-enable */
