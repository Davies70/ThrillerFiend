import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/NoteCard.css";

// MUI Icons & Components
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button } from "@mui/material";

const NoteCard = ({ noteText, created, deleteNote, updateNote, noteId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(noteText);

  // Format the date securely
  const formattedDate = created
    ? new Date(created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Just now";

  const handleSave = () => {
    if (editedText.trim() !== "" && editedText !== noteText) {
      updateNote(editedText, noteId);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(noteText);
    setIsEditing(false);
  };

  return (
    <div className="note-card">
      <div className="note-header">
        <span className="note-date">{formattedDate}</span>

        {!isEditing && (
          <div className="note-actions">
            <button
              className="note-action-btn edit"
              onClick={() => setIsEditing(true)}
              title="Edit Note"
              aria-label="Edit Note"
            >
              <EditOutlinedIcon fontSize="small" />
            </button>
            <button
              className="note-action-btn delete"
              onClick={deleteNote}
              title="Delete Note"
              aria-label="Delete Note"
            >
              <DeleteOutlineIcon fontSize="small" />
            </button>
          </div>
        )}
      </div>

      <div className="note-body">
        {isEditing ? (
          <>
            <textarea
              className="note-edit-textarea"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              autoFocus
            />
            <div className="note-edit-actions">
              <Button
                onClick={handleCancel}
                variant="text"
                size="small"
                sx={{ color: "var(--text-secondary)" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                variant="contained"
                size="small"
                disabled={!editedText.trim()}
                sx={{
                  backgroundColor: "var(--accent-blue)",
                  color: "var(--bg-primary)",
                  "&:hover": { backgroundColor: "var(--hover-blue)" },
                }}
              >
                Save Changes
              </Button>
            </div>
          </>
        ) : (
          <p className="note-text">{noteText}</p>
        )}
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  noteText: PropTypes.string.isRequired,
  created: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deleteNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  noteId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default NoteCard;
