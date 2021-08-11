export const createNoteService = async (instance, title, content) => {
  const { data } = await instance.post("notes", {
    title,
    content,
  });
  return data;
};

export const fetchAllNotesService = (instance) => {
  const fetcher = async () => {
    const response = await instance.get("notes/all");
    if (response) return response;
  };

  return fetcher;
};

export const fetchNoteService = (instance, id) => {
  const fetcher = async () => {
    const { data } = await instance.get(`notes/${id}`);
    if (data) return data;
  };

  return fetcher;
};

export const updateNoteService = async (instance, id, title, content) => {
  const { data } = await instance.put(`notes/${id}`, {
    title,
    content,
  });
  return data;
};

export const deleteNoteService = async (instance, id) => {
  const { data } = await instance.delete(`notes/${id}`);
  return data;
};
