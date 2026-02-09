import React from "react";
import apiClient from "../../api/apiClient";
import "./announcements.css";

function Announcements() {

  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
      const res = await apiClient.get("/employee/announcements");
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await apiClient.post("/announcements/save", { message });
      setMessage("");
      getMessages();
    } catch (error) {
      console.error("Error submitting announcement:", error);
    }
  };

  const updateMessage = async (id, oldMessage) => {
    const newMessage = prompt("Update announcement:", oldMessage);
    if (!newMessage || !newMessage.trim()) return;

    try {
      await apiClient.put(`/announcements/update/${id}`, {
        message: newMessage,
      });
      getMessages();
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;

    try {
      await apiClient.delete(`/announcements/delete/${id}`);
      getMessages();
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <div className="announcement-card">
      <div className="announcement-header">
        Announcements
      </div>

      <div className="announcement-body">

        {/* Create announcement */}
        <form className="announcement-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your announcement..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn-submit">
            Post
          </button>
        </form>

        {/* List announcements */}
        {messages.length === 0 ? (
          <div className="empty-announcement">
            No announcements yet
          </div>
        ) : (
          <ul className="announcement-list">
            {messages.map(msg => (
              <li
                key={msg.announcementId}
                className="announcement-item"
              >
                <span>{msg.message}</span>

                <div>
                  <button
                    className="btn-update"
                    onClick={() =>
                      updateMessage(msg.announcementId, msg.message)
                    }
                  >
                    Update
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() =>
                      deleteMessage(msg.announcementId)
                    }
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}

export default Announcements;
