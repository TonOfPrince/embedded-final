import { observable } from 'mobx';

export const breakpoints = observable({
  mobile: '(max-width: 1224)',
  desktop: '(min-width: 1224)',
});
