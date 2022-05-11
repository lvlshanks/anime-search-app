import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

configure({ asyncUtilTimeout: 5000 });
