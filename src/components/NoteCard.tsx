import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { type RouterOutputs } from "../utils/api";

type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({
  note,
  onDelete,
  onUpdate,
}: {
  note: Note;
  onDelete: () => void;
  onUpdate: (updatedNote: Note) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedNote, setEditedNote] = useState<Note>({ ...note });

  const toggleExpanded = () => {
    if (!isEditing) {
      setIsExpanded((prevExpanded) => !prevExpanded);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(editedNote);
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <div className="card mt-20 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${isExpanded ? "collapse-open" : ""} collapse`}
          onClick={toggleExpanded}
        >
          {isEditing ? (
            <div>
             <input
              type="text"
              name="title"
              value={editedNote.title}
              onChange={handleInputChange}
              className="border rounded-md p-2 mb-3 w-full focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter a title..."
            />
            <textarea
              name="content"
              value={editedNote.content}
              onChange={handleInputChange}
              rows={5}
              className="border rounded-md p-2 w-full resize-none focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter content..."
            />
            </div>
          ) : ( 
            <div
            className={`collapse-arrow ${
              isExpanded ? "collapse-open" : ""
            } collapse`} 
          >
              <div className="collapse-title text-xl font-bold">
                {isExpanded ? editedNote.title : note.title}
              </div>
              {isExpanded && (
                <div className="collapse-content">
                  <article className="prose lg:prose-xl">
                    <ReactMarkdown>
                      {editedNote.content || note.content
                        ? editedNote.content || note.content
                        : "No content available"}
                    </ReactMarkdown>
                  </article>
                </div>
              )}
            </div> 
          )}
        </div>
        <div className="card-actions mx-2 flex justify-end">
          {!isEditing ? (
            <button className="btn-primary-content text-white btn-xs btn px-5" onClick={onDelete}>
              Delete
            </button>
          ) : (
            <button className="btn-success text-white btn-xs btn px-5" onClick={handleSaveClick}>
              Save
            </button>
          )}
          <button
            className="btn-primary-content text-white btn-xs btn px-5 ml-2"
            onClick={() => (isEditing ? setIsEditing(false) : handleEditClick())}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};
