import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
export const configure = () => {enzyme.configure({ adapter: new Adapter() });}