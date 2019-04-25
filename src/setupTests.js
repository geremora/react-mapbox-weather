import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

/* Hack to avoid problem "TypeError: window.URL.createObjectURL is not a function" with mapbox */
jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    Map: () => ({})
}));

configure({adapter: new Adapter()});