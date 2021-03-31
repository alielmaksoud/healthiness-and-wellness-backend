/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";

const ProgramSubtitle = () => (
  <p css={styles}>
    Healthiness & Wellness are very important aspects of life.

  <br></br>
  Any healthy individual would be mindful of how they eat, and exercise on a daily basis. However, many individuals today struggle to maintain a healthy lifestyle, neglecting either their nutrition or exercise. With many suffering with the consequences of an unhealthy lifestyle, the need for proper information on how to take care of oneself is very helpful. There is so much information on the internet for proper exercise and nutrition, but it is very scattered and many people struggle to find information that is very simple and easy to consume.
Our team has a strong interest in exercise and would love to be able to easily track our goals virtually in order to help us learn more about our health. There are many sites that help with tracking health goals today including a calorie tracker, workouts, and weight. However, we felt that most of these sites are not user-friendly for users to accurately track their goals based on their own body and needs. There are many factors that go into fitness goals, and a web app that would allow users to easily input their information and see detailed, but well-designed information to get them on track would be great. Some people might also want to come up with workout routines that are specific to certain areas of the body, or with other specific goals. 
These are all issues that could be solved with a good web application.
  </p>
);

const styles = css`
  color: #7a7a7a;
  font-size: 15px;
  line-height: 1.7;
  margin-top: 20px;
  @media (max-width: 700px) {
    padding: 0 40px;
    br {
      display: none;
    }
  }
`;

export default ProgramSubtitle;
