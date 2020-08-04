import React from 'react';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';

import * as successAnimation from '../../assets/27572-success-animation.json';
import './loading.scss';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: successAnimation.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Loading = (props) => {
  return (
    <div className="loading__component">
      <FadeIn>
        <h1>{props.text}</h1>
        <Lottie options={defaultOptions} height={120} width={120} />
      </FadeIn>
    </div>
  );
};

export default Loading;
