import React,{useEffect,useState} from "react";
import apiClient from "../../api/apiClient";
function EmployeeAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
   const getAnnouncements = async () => {
     try {
       const response = await apiClient.get("/employee/announcements");
       console.log("Announcements fetched:", response.data);
         setAnnouncements(response.data);
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };
    useEffect(() => {
        getAnnouncements();
    }
    , []);
    return (
        <div>
            <h2>Employee Announcements</h2>
            <ul>
                {announcements.map((announcement) => (
                    <li key={announcement.announcementId}>
                        <p>{announcement.message}</p>

                    </li>
                ))}

              
            </ul>
        </div>
    );
}
export default EmployeeAnnouncement;
