import React, { useState } from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";
import { motion } from "framer-motion";
import { AccountContext } from "./accountContext";
import { SignupForm } from "./signupForm";
import { ForgotPassword } from "./forgotPassword";
import { TaskSubmission } from "./taskSubmissionForm";
import { useSelector } from "react-redux";

const Container = styled.div`
  position: relative;
  width: 350px;
  height: 550px;
  border-radius: 20px;
  box-sizing: border-box;
  background: #ecf0f3;
  box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
`;

const BoxContainer = styled.div`
  width: 350px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background: #ecf0f3;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 350px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
  background: #ecf0f3;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 500px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -350px;
  left: -70px;
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    rgba(241, 196, 15, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8em;
  margin-top: 1.8em;
  background: #ecf0f3;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function AccountBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const switchToForgotPassword = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("forgotPassword");
    }, 400);
  };

  const switchToSubmission = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("submission");
    }, 400);
  };

  const contextValue = {
    switchToSignup,
    switchToSignin,
    switchToForgotPassword,
    switchToSubmission,
  };

  const user = useSelector((state) => state.currentUser);

  return (
    <AccountContext.Provider value={contextValue}>
      <Container>
        <BoxContainer>
          <TopContainer>
            <BackDrop
              initial={false}
              animate={isExpanded ? "expanded" : "collapsed"}
              variants={backdropVariants}
              transition={expandingTransition}
            />
            {user === null && active === "signin" && (
              <HeaderContainer>
                <HeaderText>Welcome</HeaderText>
                <HeaderText>Back</HeaderText>
                <SmallText>Please sign-in to continue!</SmallText>
              </HeaderContainer>
            )}
            {active === "signup" && (
              <HeaderContainer>
                <HeaderText>Create</HeaderText>
                <HeaderText>Account</HeaderText>
                <SmallText>Please sign-up to continue!</SmallText>
              </HeaderContainer>
            )}
            {active === "forgotPassword" && (
              <HeaderContainer>
                <HeaderText>Forgot</HeaderText>
                <HeaderText>Password</HeaderText>
                <SmallText>Please fill to continue!</SmallText>
              </HeaderContainer>
            )}
            {user !== null && (
              <HeaderContainer>
                <HeaderText>Submit</HeaderText>
                <HeaderText>Task</HeaderText>
                <SmallText>Press continue to Submit!</SmallText>
              </HeaderContainer>
            )}
          </TopContainer>
          <InnerContainer>
            {user === null && active === "signin" && <LoginForm />}
            {active === "signup" && <SignupForm />}
            {active === "forgotPassword" && <ForgotPassword />}
            {user !== null && <TaskSubmission />}
          </InnerContainer>
        </BoxContainer>
      </Container>
    </AccountContext.Provider>
  );
}
