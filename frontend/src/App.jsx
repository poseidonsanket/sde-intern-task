import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "../components/Header";
import Table from "../components/Table";
import CreateContact from '../components/CreateContact';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={
            <div className='mx-10'>
              <Table />
            </div>
          } />
          <Route path="/create-contact" element={<CreateContact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;