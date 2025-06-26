import Note from "../models/Note.js"

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in getAllNotes controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (error) {
        console.log("Error in getNoteById controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const postNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({
            title,
            content,
            user: req.user.id
        });
        const saved_note = await note.save();
        res.status(201).json(saved_note);
    } catch (error) {
        console.log("Error in postNote controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { title, content },
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log("Error in updateNote controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!deletedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.log("Error in deleteNote controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};