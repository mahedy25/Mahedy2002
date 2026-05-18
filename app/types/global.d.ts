import React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'zapier-interfaces-chatbot-embed': {
        'is-popup'?: string;
        'chatbot-id'?: string;
        [key: string]: unknown;
      };
    }
  }
}