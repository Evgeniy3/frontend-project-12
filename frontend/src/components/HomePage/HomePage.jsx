/* eslint-disable import/no-named-as-default-member */
import Channels from './Channels';
import Message from './Messages';

const HomePage = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <Channels />
      <Message />
    </div>
  </div>
);

export default HomePage;
