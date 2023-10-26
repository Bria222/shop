/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
const Error = ({ children, ...props }) => (
  <div
    style={{ color: '#f23838', textAlign: 'center', margin: '0.5rem 0' }}
    {...props}
  >
    {children}
  </div>
);

export default Error;
