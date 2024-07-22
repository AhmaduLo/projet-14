import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee_list from "./pages/Employee_list";
import Employee_form from "./pages/Employee_form";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { EmployeeProvider } from './components/EmployeeContext';

function App() {
  return (
    <BrowserRouter>
     <EmployeeProvider>
      <div className="app-container">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Employee_form />} />
            <Route path="/employeeListe" element={<Employee_list />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </EmployeeProvider>
    </BrowserRouter>
  );
}

export default App;
