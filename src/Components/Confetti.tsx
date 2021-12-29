import React from 'react';
import confetti101 from 'canvas-confetti';

export default function Confetti() {
    confetti101({
        particleCount: 150,
        spread: 60
      });
    return (<span className="won">You won</span>)
}