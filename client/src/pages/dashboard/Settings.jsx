import axios from "axios";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../../../global";

const Settings = () => {

  const navigate = useNavigate()
   const logout = async () => {
    try {
      const auth = await axios.get(`${backendurl}/auth/me`);
      if (!auth.data.ok) navigate('/signin')
        console.log(auth)
    } catch (err) {
      navigate("/signin")
      console.log(err)
      
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm mt-10 lg:mt-20">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Settings</h1>

      <div className="space-y-6">
        {/* Security */}
        <section className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <FaLock className="text-green-500 text-lg mr-2" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          <button className="cursor-pointer bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
          onClick={logout}
              >
            Log Out 
          </button>
        </section>
        <section className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <FaLock className="text-green-500 text-lg mr-2" />
            <h2 className="text-lg font-semibold">Subscription</h2>
          </div>
          <button className="cursor-pointer bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition"
          onClick={()=> {
            navigate('subscribtions')
          }}
              >
            Manage Subscription 
          </button>
        </section>
      </div>
    </div>
  );
};

export default Settings;
