import React from "react";
import apiClient from "../../api/apiClient";

function Announcements() {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
      const res = await apiClient.get("/employee/announcements");
      console.log("Announcements Data:", res.data);
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiClient.post("/announcements/save", { message: message });
      console.log("Announcement submitted:", res.data);
      setMessage("");
      getMessages();
    } catch (error) {
      console.error("Error submitting announcement:", error);
    }
  };

  const updateMessage = async (id, oldMessage) => {
    const newMessage = prompt("Enter new message:", oldMessage);

    if (!newMessage || newMessage.trim() === "") {
      alert("Message cannot be empty!");
      return;
    }

    try {
      const res = await apiClient.put(`/announcements/update/${id}`, {
        message: newMessage,
      });

      console.log("Announcement updated:", res.data);
      getMessages();
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };
  const deleteMessage = async (id) => {
    if (!window.confirm("are you sure you want to delete this announcement?")) return;
    try {
      const res = await apiClient.delete(`/announcements/delete/${id}`);
      console.log("Announcement deleted:", res.data);
      getMessages();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <div>
      <h1>Announcements</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your announcement"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg) => (
            <li key={msg.announcementId} style={{ marginBottom: "10px" }}>
              {msg.message}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => updateMessage(msg.announcementId, msg.message)}
              >
                Update
              </button>
              <button
                style={{ marginLeft: "10px", color: "red" }}
                onClick={() => deleteMessage(msg.announcementId)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Announcements;
